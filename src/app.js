const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express(); // we are storing the complete express application in "app"

// Define paths for express config
const publicDir = path.join(__dirname, "..", "/public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

app.get("/", (req, res) => {
  // render is used for rendering views
  res.render("index", {
    title: "Weather App",
    name: "Hrishabh Jain",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Hrishabh Jain",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message:
      "I’m currently a CSE undergrad who loves to explore different fields. Artificial Intelligence is something which fascinates me a lot but since I had just started coding few months ago for the first time, I decided to learn the basics first with Java. At present, I’m learning Java and JS and now I know quite a bit in terms of basic concepts.",
    name: "Hrishabh Jain",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    return res.send({
      error: "You must provide the location!",
    });
  }

  geocode(
    req.query.location,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          location: location,
          forecast: forecastData,
        });
      });
    }
  );

  // res.send({
  //   location: req.query.location,
  //   forecast: "Clear!",
  // });
});

// app.get("/products", (req, res) => {
//   if (!req.query.product) {
//     return res.send({
//       error: "You must provide a product name",
//     });
//   }
//   console.log(req.query);
//   res.send({
//     products: [],
//   });
// });

// app.get("/help/*", (req, res) => {
//   res.send("Help page not found!");
// });

// app.get("*", (req, res) => {
//   res.send("My 404 page");
// });

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hrishabh Jain",
    message: "Help page not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Hrishabh Jain",
    message: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000!");
});
