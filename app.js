const express = require('express');
const flash   = require('connect-flash');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');
const app = express();

require('dotenv').config()

// App Config
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(flash());
app.use(require("express-session")({
    secret: "Secret Sentence",
    resave: false,
    saveUninitialized: false
}));

// Routes
app.get("/", (req, res) => {
    res.render("home",{message: req.flash('success')});
})
app.get("/about", (req, res) => {
    res.render("about");
})
app.get("/contact", (req, res) => {
    res.render("contact",{message: req.flash('error')});
})
app.get("/work", (req, res) => {
    res.render("work");
})

// Send Mail
app.post("/send", (req, res) => {
    var from = req.body.email;
    var subject = req.body.name + " / " + req.body.email;
    var html = req.body.msg;

    let transporter = nodeMailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    });
    var mailOptions = {
        from: from,
        to: process.env.EMAIL,
        subject: subject,
        text: html
    }
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            req.flash('error','Something went wrong :( Try Again or DM me at ubaidmohd.786@gmail.com')
            res.redirect("/contact")
        } else {
            req.flash('success','Message Sent!');
            res.redirect("/")
        }
    })
})


app.listen(PORT, () => {
    console.log('Server is listening at ' +PORT);
})