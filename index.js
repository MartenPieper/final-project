const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./db");
var bcrypt = require("./bcrypt");
const cookieSession = require('cookie-session');

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
