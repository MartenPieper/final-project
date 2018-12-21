const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./db");
var bcrypt = require("./bcrypt");
const cookieSession = require('cookie-session');
const meetup = require("meetup-api");
const request = require('request');
var rp = require('request-promise');
var sanitizeHtml = require('sanitize-html');
const s3 = require("./s3");
const cheerio = require('cheerio')
var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");
var moment = require('moment');
const spicedPg = require("spiced-pg");

const database = spicedPg(
  process.env.DATABASE_URL ||
    "postgres:postgres:postgres@localhost:5432/studentsite"
);




app.use(bodyParser.json());

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            // uidSafe takes the image name and makes it into a 24 character unique name.
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152 // Files you upload cannot be greater than 2MB
    }
});

app.use(compression());

app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: false
  })
);

app.use(
  cookieSession({
    secret: process.env.SESSION_SECRET || require("./secrets").secret, // process.env.SESSION_SECRET || require("./passwords").sessionSecret // Old secret "nobody knows this secret but me"
    maxAge: 1000 * 60 * 60 * 24 * 7 * 6
  })
);


app.use(csurf());

app.use((req, res, next) => {
    res.cookie('mytoken', req.csrfToken());
    next();
});

// app.use(function(req, res, next) {
//   res.locals.csrfToken = req.csrfToken();
//   next();
// });

app.use(express.static("./public"));

if (process.env.NODE_ENV != 'production') {
    app.use(
        '/bundle.js',
        require('http-proxy-middleware')({
            target: 'http://localhost:8081/'
        })
    );
} else {
    app.use('/bundle.js', (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

// variable for all results
// to add to this object globalResults[ yourKey ] = yourValue;
var globalResults = [];
const promises = [];
var testResults = [];

app.post("/getSearchUpdate", (req, res) => {
    // console.log("req.body.places[0]", req.body.places[0].value)
    //  console.log("req.body", req.body)



    // let q = `SELECT name, type
    // FROM events
    // WHERE name ILIKE $1 OR type ILIKE $1`

    // const params = [name + '%' || null, type + '%' || null ];`

    //
    //  args.forEach(function(arg, i) {
    //      q += `OR field ilike $${i+1}`
    //      params.push(field[i])
    //  })
    //  db.query(q, params)
    //
    //  study: [ { value: 'management', label: 'Management' } ],
    //  places:
    //  [ { value: 'berlin', label: 'Berlin', state: 'Berlin' },
    // { value: 'hamburg', label: 'Hamburg', state: 'Hamburg' } ],
    // terms: [ { value: 'drama', label: 'Drama', topic: 'drama' } ]



    // db.getSearchResults(req.body).then(results => {
    //
    //     console.log("results", results)
    //
    // }).catch( err => {
    //     console.log("error in app.get /getSearchUpdate")
    // })

    // let q = `SELECT * FROM places FULL (?)JOIN universities FULL JOIN studies WHERE`
    //
    // if (data.places) {
    //     q+= `places = $1`
    //     params.push(data.places)
    // }


    //
    // meetup.getStreamOpenEvents("berlin", function(err, resp) {
    // 	console.log("resp in meetup API call", resp);
    //     console.log("error in meetup API call", err)
    // });

//////////// DB Query functions //////////

var dbQueryNoInput = (table) => {

    fullQuery = `SELECT DISTINCT * FROM ${table}`
    return database.query(fullQuery).then(resp => {
        // console.log("resp.rows in db.query in dbQueryNoInput", resp.rows)
        globalResults.push(resp.rows);
        // console.log("globalResults in database.query", globalResults)
        // results are in resp.rows[0]
    }).catch(err => {
    console.log("error in study db.query", err)})


}


var dbQueryStudyInput = (table, row) => {
    let q = `SELECT DISTINCT * FROM ${table}`
    let qEnd = ` LIMIT 100`
    let qWhere = ""
    let qIlike = ""
    let counter = 1
    let params = []

        for (let i = 0; i < req.body.study.length; i++) {
            params.push("%" + req.body.study[i].value + "%")
            if (i === 0) {
            qWhere = ` WHERE ${row} ILIKE $${params.length}`
        } else {
            qIlike += ` OR ${row} ILIKE $${params.length}`
            }
            counter++
        }

        var fullQuery = q + qWhere + qIlike + qEnd

        console.log("fullQuery in event db.query", fullQuery);
        // console.log("q in event db.query", q);
        // console.log("params in event db.query", params);

        return database.query(fullQuery, params).then(resp => {
        //     console.log("resp.rows in db.query in dbQueryStudyInput", resp.rows)
            globalResults.push(resp.rows);
            // console.log("globalResults in database.query", globalResults)
            // results are in resp.rows[0]
        }).catch(err => {
        console.log("error in study db.query", err)})

    }

var dbQueryUniInput = (table, row) => {

        let q = `SELECT DISTINCT * FROM ${table}`
        let qEnd = ` LIMIT 100`
        let qWhere = ""
        let qIlike = ""
        let counter = 1
        let params = []



        for (let i = 0; i < req.body.unis.length; i++) {
            params.push("%" + req.body.unis[i].value + "%")
            if (i === 0) {
            qWhere = ` WHERE ${row} ILIKE $${params.length}`
        } else {
            qIlike += ` OR ${row} ILIKE $${params.length}`
            }
            counter++
        }

        var fullQuery = q + qWhere + qIlike + qEnd

        console.log("fullQuery in event db.query", fullQuery);
        // console.log("q in event db.query", q);
        // console.log("params in event db.query", params)
        return database.query(fullQuery, params).then(resp => {
            console.log("resp.rows in db.query in dbQueryUniInput", resp.rows)
            globalResults.push(resp.rows);
            // console.log("globalResults in database.query", globalResults)
            // results are in resp.rows[0]
        }).catch(err => {
        console.log("error in study db.query", err)})
    }

var dbQueryPlaceInput = (table, row) => {
        let q = `SELECT DISTINCT * FROM ${table}`
        let qEnd = ` LIMIT 100`
        let qWhere = ""
        let qIlike = ""
        let counter = 1
        let params = []

            for (let i = 0; i < req.body.places.length; i++) {
                params.push("%" + req.body.places[i].value + "%")
                if (i === 0) {
                qWhere = ` WHERE ${row} ILIKE $${params.length}`
            } else {
                qIlike += ` OR ${row} ILIKE $${params.length}`
                }
                counter++
            }

            var fullQuery = q + qWhere + qIlike + qEnd

            console.log("fullQuery in event db.query", fullQuery);
            // console.log("q in event db.query", q);
            // console.log("params in event db.query", params);

            return database.query(fullQuery, params).then(resp => {
            //     console.log("resp.rows in db.query in dbQueryPlaceInput", resp.rows)
                globalResults.push(resp.rows);
                // console.log("globalResults in database.query", globalResults)
                // results are in resp.rows[0]
            }).catch(err => {
            console.log("error in study db.query", err)})
    }


var dbQueryTermsInput = (table, row) => {
    let q = `SELECT DISTINCT * FROM ${table}`
    let qEnd = ` LIMIT 100`
    let qWhere = ""
    let qIlike = ""
    let counter = 1
    let params = []

        for (let i = 0; i < req.body.terms.length; i++) {
            params.push("%" + req.body.terms[i].value + "%")
            if (i === 0) {
            qWhere = ` WHERE ${row} ILIKE $${params.length}`
        } else {
            qIlike += ` OR ${row} ILIKE $${params.length}`
            }
            counter++
        }

        var fullQuery = q + qWhere + qIlike + qEnd

        console.log("fullQuery in event db.query", fullQuery);
    //     console.log("q in event db.query", q);
        // console.log("params in event db.query", params);

        return database.query(fullQuery, params).then(resp => {
        //     console.log("resp.rows in db.query for dbQueryTermsInput", resp.rows)
            globalResults.push(resp.rows);
            // console.log("globalResults in database.query", globalResults)
            // results are in resp.rows[0]
        }).catch(err => {
        console.log("error in study db.query", err)})
}


///////////// DB Query END ///////////////////

console.log(req.body.selections.includes('Events/ Veranstaltungen'))
if (req.body.selections.includes('Events/ Veranstaltungen')) {
    var baseUrl = `https://api.meetup.com/2/open_events?key=2c6569527c17491e136741596d14249&status=upcoming&sign=true&photo-host=public&country=de&page=20`
    if (req.body.terms) {

        // might have to do a for in loop to access all req.body.terms baseUrl += "&terms=" req.body.terms[elem]
    //     console.log("req.body", req.body)
        baseUrl += `&topic=${req.body.terms[0].topic}`

        apiCall(baseUrl)
    }

    if (req.body.places && req.body.places[0].state) {

        baseUrl += `&state=${req.body.places.state}`
        apiCall(baseUrl)
    }

    if ( req.body.places && req.body.places[0].value) {

        baseUrl += `&city=${req.body.places[0].value}`
        apiCall(baseUrl)
    }

    // if (req.body.study) {
    //     baseUrl += `&topic=${req.body.terms[0].topic}`
    // }

    // console.log("baseUrl", baseUrl)

    function apiCall(baseUrl) {
    rp(baseUrl).then(function (results) {
            // console.log('results:', results); // Print the HTML for the Google homepage.
             var parsedResults = JSON.parse(results);
            //  for (var i = 0; i < parsedResults.results.length; i++) {
            //    console.log("i in parsedResults loop", i)
            // }

             for (var i in parsedResults.results) {
                //  cleanedResults += sanitizeHtml(parsedResults.results.description);
              parsedResults.results[i].description = sanitizeHtml(parsedResults.results[i].description, {allowedTags: [],
                  allowedAttributes: {}})
             // parsedResults.results[i].description = cheerio.load(parsedResults.results[i].description);
             parsedResults.results[i].created = moment.unix(parsedResults.results[i].created / 1000).fromNow();

              parsedResults.results[i].time = moment.unix(parsedResults.results[i].time / 1000).format("DD.MM.YYYY");
             // .format("DD-MM-YYYY HH:mm")
             // fromNow();
             }

             let tempArray = []
             for (let data in parsedResults) {
                 tempArray.push({
        place: data['venue.city'],
        link: data['event_url'],
        event_data: data['time'],
        creation_date: data['created']
    })


    // console.log("globalResults in API call", globalResults)
}

    globalResults.push(tempArray)
        //      arr = []
        //      arr.push(parsedResults)
        //     // res.json(parsedResults)
        //
        //  testResults = [...globalResults, ...arr.map(result => {
        //       return {
        //            result['place'] = result['venue.city'];
        //            result['link'] = result['event_url'];
        //            result['event_date'] = result['time'];
        //            result['creation_date'] = result['created'];
        // // Assign key Value pairs
        //    }
        // })]

// testResults = parsedResults.forEach( function(data) {
//   data['place'] = data['venue.city'];
//   delete data['venue.city'];
//   data['link'] = data['event_url'];
//   delete data['event_url'];
//   data['event_date'] = data['time'];
//   delete data['time'];
//   data['creation_date'] = data['created'];
//    delete data['created'];
// });

// for (let data in parsedResults) {
//   data['place'] = data['venue.city'];
//   data['link'] = data['event_url'];
//   data['event_date'] = data['time'];
//   data['creation_date'] = data['created'];
// }

// testResults.push(parsedResults);
//             console.log("parsedResults in API call: ", parsedResults);
//             console.log("testResults in API call: ", testResults);


}).catch(function (error) {
               console.log('error:', error); // Print the error if one occurred
        })

}

        // Perfect query: const q = `
            // SELECT *
            // FROM events
            // WHERE name ILIKE $1
            // OR type ILIKE $1 OR organizer ILIKE $1 OR description ILIKE $1 OR place ILIKE $1 OR other ILIKE $1
            // `


            // create one of these per table option (e.g. events.sql, jobs.sql, scholarships.sql, financing.sql, freetime.sql, others.sql) -> 6 tables
            // create one per table row option (e.g. name, organizer, description, place, other, link) -> 6



    if (req.body.study) {
// promises.push(dbQueryStudyInput("", ""))
promises.push(dbQueryStudyInput("events", "name"));
promises.push(dbQueryStudyInput("events", "organizer"));
promises.push(dbQueryStudyInput("events", "description"));
promises.push(dbQueryStudyInput("events", "place"));
promises.push(dbQueryStudyInput("events", "other"));
promises.push(dbQueryStudyInput("events", "link"));

            }

    if (req.body.unis) {

promises.push(dbQueryUniInput("events", "name"));
promises.push(dbQueryUniInput("events", "organizer"));
promises.push(dbQueryUniInput("events", "description"));
promises.push(dbQueryUniInput("events", "place"));
promises.push(dbQueryUniInput("events", "other"));
promises.push(dbQueryUniInput("events", "link"));

    }

    if (req.body.places) {

promises.push(dbQueryPlaceInput("events", "name"));
promises.push(dbQueryPlaceInput("events", "organizer"));
promises.push(dbQueryPlaceInput("events", "description"));
promises.push(dbQueryPlaceInput("events", "place"));
promises.push(dbQueryPlaceInput("events", "other"));
promises.push(dbQueryPlaceInput("events", "link"));
        }

    if (req.body.terms) {

promises.push(dbQueryTermsInput("events", "name"));
promises.push(dbQueryTermsInput("events", "organizer"));
promises.push(dbQueryTermsInput("events", "description"));
promises.push(dbQueryTermsInput("events", "place"));
promises.push(dbQueryTermsInput("events", "other"));
promises.push(dbQueryTermsInput("events", "link"));
            }





//     request(baseUrl, function (error, response, body) {
//       console.log('error:', error); // Print the error if one occurred
//       // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//       // console.log('body:', body); // Print the HTML for the Google homepage.
//
//       var parsedResults = JSON.parse(body);
//        console.log("parsedResults", parsedResults)
//
//        var cleanedResults;
//
//        for (var i = 0; i < parsedResults.results.length; i++) {
//     console.log("i in parsedResults loop", i)
//
// }
//
//       // for (var desc in parsedResults) {
//       //     cleanedResults += sanitizeHtml(parsedResults.results.description);
// //    parsedResults.results[i].description = sanitizeHtml(parsedResults.results[i].description)
// // Later res.json sanitzied parsedResults
//
//       // }
//       // console.log("cleanedResults", cleanedResults)
//
//       res.json(parsedResults)
//     });

    // works for "city" in console: https://api.meetup.com/2/open_events?status=upcoming&sign=true&photo-host=public&country=de&city=berlin&page=20&&sign=true

    // works for topic in console: /2/open_events?status=upcoming&sign=true&photo-host=public&country=de&topic=3d-artists&page=20
    // https://www.meetup.com/cities/de/berlin/
    }
// console.log("Query includes Jobs", req.body.selections.includes('Jobs'))
    if (req.body.selections.includes('Jobs')) {
console.log("Jobs If Block running")

if(!req.body.study && !req.body.unis && !req.body.places && !req.body.terms ) {
console.log("Stipendien with no Input running")
promises.push(dbQueryNoInput("jobs"));
promises.push(dbQueryNoInput("jobs"));
promises.push(dbQueryNoInput("jobs", "description"));
promises.push(dbQueryNoInput("jobs", "place"));
promises.push(dbQueryNoInput("jobs", "other"));
promises.push(dbQueryNoInput("scholarships", "link"));
}

        if (req.body.study) {

    promises.push(dbQueryStudyInput("jobs", "name"));
    promises.push(dbQueryStudyInput("jobs", "organizer"));
    promises.push(dbQueryStudyInput("jobs", "description"));
    promises.push(dbQueryStudyInput("jobs", "place"));
    promises.push(dbQueryStudyInput("jobs", "other"));
    promises.push(dbQueryStudyInput("jobs", "link"));

                }

        if (req.body.unis) {

    promises.push(dbQueryUniInput("jobs", "name"));
    promises.push(dbQueryUniInput("jobs", "organizer"));
    promises.push(dbQueryUniInput("jobs", "description"));
    promises.push(dbQueryUniInput("jobs", "place"));
    promises.push(dbQueryUniInput("jobs", "other"));
    promises.push(dbQueryUniInput("jobs", "link"));

        }

        if (req.body.places) {

    promises.push(dbQueryPlaceInput("jobs", "name"));
    promises.push(dbQueryPlaceInput("jobs", "organizer"));
    promises.push(dbQueryPlaceInput("jobs", "description"));
    promises.push(dbQueryPlaceInput("jobs", "place"));
    promises.push(dbQueryPlaceInput("jobs", "other"));
    promises.push(dbQueryPlaceInput("jobs", "link"));
            }

        if (req.body.terms) {

    promises.push(dbQueryTermsInput("jobs", "name"));
    promises.push(dbQueryTermsInput("jobs", "organizer"));
    promises.push(dbQueryTermsInput("jobs", "description"));
    promises.push(dbQueryTermsInput("jobs", "place"));
    promises.push(dbQueryTermsInput("jobs", "other"));
    promises.push(dbQueryTermsInput("jobs", "link"));
                }



    }

console.log("Query includes Stipendien", req.body.selections.includes('Stipendien'))
    if (req.body.selections.includes('Stipendien')) {

        console.log("Stipendien If Block running")


            if(!req.body.study && !req.body.unis && !req.body.places && !req.body.terms ) {

        console.log("Stipendien with no Input running")

        promises.push(dbQueryNoInput("scholarships", "name"));
        promises.push(dbQueryNoInput("scholarships", "organizer"));
        promises.push(dbQueryNoInput("scholarships", "description"));
        promises.push(dbQueryNoInput("scholarships", "place"));
        promises.push(dbQueryNoInput("scholarships", "other"));
        promises.push(dbQueryNoInput("scholarships", "link"));
}
        if (req.body.study) {

    promises.push(dbQueryStudyInput("scholarships", "name"));
    promises.push(dbQueryStudyInput("scholarships", "organizer"));
    promises.push(dbQueryStudyInput("scholarships", "description"));
    promises.push(dbQueryStudyInput("scholarships", "place"));
    promises.push(dbQueryStudyInput("scholarships", "other"));
    promises.push(dbQueryStudyInput("scholarships", "link"));

                }

        if (req.body.unis) {

    promises.push(dbQueryUniInput("scholarships", "name"));
    promises.push(dbQueryUniInput("scholarships", "organizer"));
    promises.push(dbQueryUniInput("scholarships", "description"));
    promises.push(dbQueryUniInput("scholarships", "place"));
    promises.push(dbQueryUniInput("scholarships", "other"));
    promises.push(dbQueryUniInput("scholarships", "link"));

        }

        if (req.body.places) {

    promises.push(dbQueryPlaceInput("scholarships", "name"));
    promises.push(dbQueryPlaceInput("scholarships", "organizer"));
    promises.push(dbQueryPlaceInput("scholarships", "description"));
    promises.push(dbQueryPlaceInput("scholarships", "place"));
    promises.push(dbQueryPlaceInput("scholarships", "other"));
    promises.push(dbQueryPlaceInput("scholarships", "link"));
            }

        if (req.body.terms) {

    promises.push(dbQueryTermsInput("scholarships", "name"));
    promises.push(dbQueryTermsInput("scholarships", "organizer"));
    promises.push(dbQueryTermsInput("scholarships", "description"));
    promises.push(dbQueryTermsInput("scholarships", "place"));
    promises.push(dbQueryTermsInput("scholarships", "other"));
    promises.push(dbQueryTermsInput("scholarships", "link"));
                }



    }


console.log("Query includes Kurse", req.body.selections.includes('Kurse/ MOOCs'))

if (req.body.selections.includes('Kurse/ MOOCs')) {

    console.log("Kurse If Block running")


        if(!req.body.study && !req.body.unis && !req.body.places && !req.body.terms ) {

    console.log("Kurse with no Input running")

    promises.push(dbQueryNoInput("courses", "name"));
    promises.push(dbQueryNoInput("courses", "organizer"));
    promises.push(dbQueryNoInput("courses", "description"));
    promises.push(dbQueryNoInput("courses", "place"));
    promises.push(dbQueryNoInput("courses", "other"));
    promises.push(dbQueryNoInput("courses", "link"));
}
    if (req.body.study) {

promises.push(dbQueryStudyInput("courses", "name"));
promises.push(dbQueryStudyInput("courses", "organizer"));
promises.push(dbQueryStudyInput("courses", "description"));
promises.push(dbQueryStudyInput("courses", "place"));
promises.push(dbQueryStudyInput("courses", "other"));
promises.push(dbQueryStudyInput("courses", "link"));

            }

    if (req.body.unis) {

promises.push(dbQueryUniInput("courses", "name"));
promises.push(dbQueryUniInput("courses", "organizer"));
promises.push(dbQueryUniInput("courses", "description"));
promises.push(dbQueryUniInput("courses", "place"));
promises.push(dbQueryUniInput("courses", "other"));
promises.push(dbQueryUniInput("courses", "link"));

    }

    if (req.body.places) {

promises.push(dbQueryPlaceInput("courses", "name"));
promises.push(dbQueryPlaceInput("courses", "organizer"));
promises.push(dbQueryPlaceInput("courses", "description"));
promises.push(dbQueryPlaceInput("courses", "place"));
promises.push(dbQueryPlaceInput("courses", "other"));
promises.push(dbQueryPlaceInput("courses", "link"));
        }

    if (req.body.terms) {

promises.push(dbQueryTermsInput("courses", "name"));
promises.push(dbQueryTermsInput("courses", "organizer"));
promises.push(dbQueryTermsInput("courses", "description"));
promises.push(dbQueryTermsInput("courses", "place"));
promises.push(dbQueryTermsInput("courses", "other"));
promises.push(dbQueryTermsInput("courses", "link"));
            }



}


console.log("Query includes Kurse", req.body.selections.includes('Deals'))

if (req.body.selections.includes('Deals')) {

    console.log("Deals If Block running")


        if(!req.body.study && !req.body.unis && !req.body.places && !req.body.terms ) {

    console.log("Deals with no Input running")

    promises.push(dbQueryNoInput("deals", "name"));
    promises.push(dbQueryNoInput("deals", "organizer"));
    promises.push(dbQueryNoInput("deals", "description"));
    promises.push(dbQueryNoInput("deals", "place"));
    promises.push(dbQueryNoInput("deals", "other"));
    promises.push(dbQueryNoInput("deals", "link"));
}
    if (req.body.study) {

promises.push(dbQueryStudyInput("deals", "name"));
promises.push(dbQueryStudyInput("deals", "organizer"));
promises.push(dbQueryStudyInput("deals", "description"));
promises.push(dbQueryStudyInput("deals", "place"));
promises.push(dbQueryStudyInput("deals", "other"));
promises.push(dbQueryStudyInput("deals", "link"));

            }

    if (req.body.unis) {

promises.push(dbQueryUniInput("deals", "name"));
promises.push(dbQueryUniInput("deals", "organizer"));
promises.push(dbQueryUniInput("deals", "description"));
promises.push(dbQueryUniInput("deals", "place"));
promises.push(dbQueryUniInput("deals", "other"));
promises.push(dbQueryUniInput("deals", "link"));

    }

    if (req.body.places) {

promises.push(dbQueryPlaceInput("deals", "name"));
promises.push(dbQueryPlaceInput("deals", "organizer"));
promises.push(dbQueryPlaceInput("deals", "description"));
promises.push(dbQueryPlaceInput("deals", "place"));
promises.push(dbQueryPlaceInput("deals", "other"));
promises.push(dbQueryPlaceInput("deals", "link"));
        }

    if (req.body.terms) {

promises.push(dbQueryTermsInput("deals", "name"));
promises.push(dbQueryTermsInput("deals", "organizer"));
promises.push(dbQueryTermsInput("deals", "description"));
promises.push(dbQueryTermsInput("deals", "place"));
promises.push(dbQueryTermsInput("deals", "other"));
promises.push(dbQueryTermsInput("deals", "link"));
            }



}

console.log("Query includes Kurse", req.body.selections.includes('Andere'))

if (req.body.selections.includes('Andere')) {

    console.log("Deals If Block running")


        if(!req.body.study && !req.body.unis && !req.body.places && !req.body.terms ) {

    console.log("Deals with no Input running")

    promises.push(dbQueryNoInput("other", "name"));
    promises.push(dbQueryNoInput("other", "organizer"));
    promises.push(dbQueryNoInput("other", "description"));
    promises.push(dbQueryNoInput("other", "place"));
    promises.push(dbQueryNoInput("other", "other"));
    promises.push(dbQueryNoInput("other", "link"));
}
    if (req.body.study) {

promises.push(dbQueryStudyInput("other", "name"));
promises.push(dbQueryStudyInput("other", "organizer"));
promises.push(dbQueryStudyInput("other", "description"));
promises.push(dbQueryStudyInput("other", "place"));
promises.push(dbQueryStudyInput("other", "other"));
promises.push(dbQueryStudyInput("other", "link"));

            }

    if (req.body.unis) {

promises.push(dbQueryUniInput("other", "name"));
promises.push(dbQueryUniInput("other", "organizer"));
promises.push(dbQueryUniInput("other", "description"));
promises.push(dbQueryUniInput("other", "place"));
promises.push(dbQueryUniInput("other", "other"));
promises.push(dbQueryUniInput("other", "link"));

    }

    if (req.body.places) {

promises.push(dbQueryPlaceInput("other", "name"));
promises.push(dbQueryPlaceInput("other", "organizer"));
promises.push(dbQueryPlaceInput("other", "description"));
promises.push(dbQueryPlaceInput("other", "place"));
promises.push(dbQueryPlaceInput("other", "other"));
promises.push(dbQueryPlaceInput("other", "link"));
        }

    if (req.body.terms) {

promises.push(dbQueryTermsInput("other", "name"));
promises.push(dbQueryTermsInput("other", "organizer"));
promises.push(dbQueryTermsInput("other", "description"));
promises.push(dbQueryTermsInput("other", "place"));
promises.push(dbQueryTermsInput("other", "other"));
promises.push(dbQueryTermsInput("other", "link"));
            }



}


Promise.all(promises).then(values => {
console.log("globalResults in Promise.all", globalResults)

globalResults.forEach(array => {
    array.forEach(item => {
        item.ts_event = moment(item.ts_event).fromNow();
    })
})

    // for (var i in globalResults.results) {
    //
    // // parsedResults.results[i].description = cheerio.load(parsedResults.results[i].description);
    // globalResults.results[i].ts_event = moment(globalResults.results[i].ts_event / 1000).fromNow();
    //
    // // parsedResults.results[i].time = moment.unix(parsedResults.results[i].time / 1000).format("DD.MM.YYYY");
    // // .format("DD-MM-YYYY HH:mm")
    // // fromNow();
    // }

    res.json(globalResults.filter(item => item.length))
})

// END if app.get below
// a = [].concat.apply([], a);
})




// console.log("globalResults in global Scope", globalResults)

app.post("/login", (req, res) => {
    // Pass Email to db query -> If error, redirct to login page
    db.getUser(req.body.email)
        .then(results => {
             console.log("results in login", results.rows[0])
            var userId = results.rows[0].id
            return bcrypt
                .compare(req.body.password, results.rows[0].password)
                .then((matches) => {
                    console.log("req.session.userId in registration", req.session.userId);
                    if (matches == true) {
                        req.session.userId = userId
                        res.json({
                          success: true
                        });
                    } else {
                        throw new Error();

                    }
                });
        }).catch(err => {
            console.log("Error in POST /login", err);

            res.json({
              success: false
            });

        });
});

app.post("/registration", (req, res) => {
  bcrypt
    .hash(req.body.password)
    .then((hash) => {
      return db.createLogin(
        req.body.first,
        req.body.last,
        req.body.email,
        hash
      );
    })
    .then((results) => {
      // console.log("results in app.post /registration", results);
      req.session.userId = results.rows[0].id;
      console.log("req.session.userId in registration", req.session.userId);
      res.json({
        success: true
      });
    })
    .catch((err) => {
      console.log("error: ", err);
      res.json(
        err.column
      );
    });
 //  console.log("req.body in /registration", req.body);

});

app.get("/reset", (req,res) => {
    globalResults = [];
    // console.log("globalResults after reset", globalResults)
    res.json(globalResults);
})

// this.props.dispatch(insertIntoRedux())
// function insertIntoRedux(arr) {
//}

app.get("/user", (req,res) => {
    // console.log("GET / user hit")
    // console.log("req.body in app.get /User", req.body)
    db.getUserPic(req.session.userId).then(results => {
        // console.log("results in app.get /user", results)
        res.json({
            first: results.rows[0].first,
            last: results.rows[0].last,
            id: results.rows[0].id,
            email: results.rows[0].email,
            bio: results.rows[0].bio,
            profilePicUrl:results.rows[0].profilepic
            })
    })
    // db-query to get logged in user's first, last, profilePicUrl, etc.
    // once you have the info, send it back to axios as response.

})

app.get("/loginStatus", (req, res) => {
    // console.log("req.session in /loginStatus", req.session)

    if (req.session.userId)
    res.json({loginStatus: true})
})

app.post("/upload", uploader.single("file"), s3.upload, (req,res) => {
    // console.log("req.file in app.post", req.file)
    const configLink = "https://s3.amazonaws.com/pieper-catnip-socialnetwork/";
    let s3Url = configLink + req.file.filename

    // console.log("s3Url", s3Url)
    // console.log("req.session.userId", req.session.userId)


    if(req.file) {
        db.uploadProfilePic(req.session.userId, s3Url).then(results => {
            // console.log("results in uploadProfilePic", results)
            res.json({
                id:  results.rows[0].id,
                imgurl: results.rows[0].profilepic})
        }).catch(err => {
            console.log("error in app.post", err)
        });
    } else {
        res.json({
            success: false
        });
    }
})

app.post("/bio", (req,res) => {
    // console.log("req.body of app.post /bio", req.body)
    db.uploadBio(req.session.userId, req.body.bio).then(results => {
        // console.log("results in uploadBio", results)
        res.json({
            id:  results.rows[0].id,
            bio: results.rows[0].bio})
    }).catch(err => {
        console.log("error in app.post", err)
    });
})

app.get("/logout", (req, res) => {
    // console.log("logout Route runnning")
    req.session = null;
    console.log("logged out worked")
    res.redirect("/")
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
