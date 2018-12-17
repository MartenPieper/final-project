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
        console.log("req.body.terms", req.body.terms)
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



console.log(baseUrl)
    request(baseUrl, function (error, response, body) {
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
      var parsedResults = JSON.parse(body)
      res.json(parsedResults)
    });

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

app.get("/logout", (req, res) => {
    // console.log("logout Route runnning")
    req.session = null;
    console.log("logged out worked")
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
