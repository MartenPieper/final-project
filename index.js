const express = require('express');
const app = express();
const compression = require('compression');
const bodyParser = require("body-parser");
const csurf = require("csurf");
const db = require("./db");

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

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
