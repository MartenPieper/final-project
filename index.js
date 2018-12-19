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



app.post("/getSearchUpdate", (req, res) => {
    // console.log("req.body.places[0]", req.body.places[0].value)
     console.log("req.body", req.body)




// Perfect query: const q = `
    // SELECT *
    // FROM events
    // WHERE name ILIKE $1
    // OR type ILIKE $1 OR organizer ILIKE $1 OR description ILIKE $1 OR place ILIKE $1 OR other ILIKE $1
    // `


// create one of these per table option 
// create
    let q = "SELECT * FROM events "
    let counter = 1
    let params = []


    if (req.body.study.length > 0) {
        for (let i = 0; i < req.body.study.length; i++) {
            q += `OR name ILIKE ${ counter }`
            params.push(req.body.study[i])
            counter++
        }
    }

    db.query(q, params).then(resp => {

    })



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

console.log(req.body.selections.includes('Events/ Veranstaltungen'))
if (req.body.selections.includes('Events/ Veranstaltungen')) {
    var baseUrl = `https://api.meetup.com/2/open_events?key=2c6569527c17491e136741596d14249&status=upcoming&sign=true&photo-host=public&country=de&page=20`
    if (req.body.terms) {

        // might have to do a for in loop to access all req.body.terms baseUrl += "&terms=" req.body.terms[elem]
        console.log("req.body", req.body)
        baseUrl += `&topic=${req.body.terms[0].topic}`
    }

    if (req.body.places && req.body.places[0].state) {

        baseUrl += `&state=${req.body.places.state}`
    }

    if ( req.body.places && req.body.places[0].value) {

        baseUrl += `&city=${req.body.places[0].value}`
    }

    if (req.body.study) {
        baseUrl += `&topic=${req.body.terms[0].topic}`
    }

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

             res.json(parsedResults)


            // console.log("parsed Results after sanitization", parsedResults)
        })
        .catch(function (error) {
               console.log('error:', error); // Print the error if one occurred
        });

console.log(baseUrl)
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
})

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

app.get("/user", (req,res) => {
    // console.log("GET / user hit")
    // console.log("req.body in app.get /User", req.body)
    db.getUserPic(req.session.userId).then(results => {
        console.log("results in app.get /user", results)
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
    console.log("req.session in /loginStatus", req.session)

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
