"use strict";

const request = require("postman-request");

//core modules
const path = require("path");

//npm modules
const express = require("express");
console.log(__dirname);
const app = express();

//needed for partials
const hbs = require("hbs");

// own files
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//serve static files
//u don't need routes for those html files,
//all html files in that dir will be available in the browser
const publicDirectoryPath = path.join(__dirname, "../public");

//point to the directory u want to use for templating
//go up a dir from curDir and go in templates dir
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//set up view engine (hbs = handlebars for expr.)
// exp expects all views to live in a dir in root called 'views'
app.set("view engine", "hbs");
//point to the custom template directory:
app.set("views", viewsPath);

hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

//the second param will manipulate the first (here the cur dir path)
//  .. will go up a dir,
//  ../.. will go up 2 dirs
// console.log(path.join(__dirname, ""));

// ==HOMEPAGE============

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "someone",
  });
});

//visit this link in the browser
// http://127.0.0.1:3000/products?search=ceva&rating=5&altceva

// ========== HELP =====
function help(req, res) {
  res.render("help", {
    emergencyNumber: 3334444,
    title: "help page title",
    name: "help page name",
  });
}
app.get("/help", help);

// ========== ABOUT ==========
function about(req, res) {
  res.render("about", {
    title: "About me",
    name: "some robot",
  });
}
app.get("/about", about);

//use render instead of send for templates
//will look in root dir of project
//for a views dir
//and the name of that file, without .hbs
// to provide a value that is accessible in the template
// u must provide a second param to render
// function home(req, res) {
//   res.render("index", {
//     title: "Weather app",
//     name: "Ana Maria",
//   });
// }
//in template use like so:
// <h1>{{title}}</h1>
// app.get("/", home);

// express auto stringifies the JSON when sees an obj being sent
// function about(req, res) {
//   res.send({
//     name: "ana",
//     age: "18",
//   });
// }
// app.get("/about", about);

// ========== WEATHER  ======
function weather(req, res) {
  if (!req.query.address) {
    return res.send({ error: "must suply address" });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
}
app.get("/weather", weather);

//will catch 404 for help/anything
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
  });
});

//match all that are not matched with `*`
//must come LAST of all the routes
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("serv up on 3k");
});
