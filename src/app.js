const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
// console.log(__filename);
console.log(path.join(__dirname, '../public'));

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs'); // to init hbs
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Created by Saksham Sachdeva',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'HBS About section',
    name: 'Created by Saksham Sachdeva',
  });
});
app.get('/help', (req, res) => {
  res.render('help', {
    msg: 'This is help page from HBS',
    title: 'Help page',
    name: 'Created by Saksham Sachdeva',
  });
});
/*
app.get('', (req, res) => {
  res.send('Hello Saksham');
});

app.get('/help', (req, res) => {
  // res.send('Hello Help Page');
  res.send({
    name: 'Saksham',
    age: 21,
  });
});

app.get('/about', (req, res) => {
  res.send('<h1>Hello About Page</h1>');
});
*/

app.get('/weather', (req, res) => {
  // res.send('Hello Weather Page');
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: 'Please enter address',
    });
  }
  geocode(req.query.address, (error, { lat, log, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    // console.log('Data', data);
    // console.log(data.lat, data.log);
    forecast(log, lat, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      res.send({
        data: location,
        forecastData: forecastData,
        address: req.query.address,
      });
      // console.log('1.Data', location);
      // console.log('2.Data', forecastData);
    });
  });
  // res.send({
  //   forecast: 'rain',
  //   location: 'India',
  //   address: req.query.address,
  // });
  // res.send([
  //   {
  // forecast: 'rain',
  // location: 'Gwalior',
  //   },
  //   {
  //     forecast: 'sunny',
  //     location: 'Jaipur',
  //   },
  // ]);
});

app.get('/products', (req, res) => {
  console.log(req.query);
  if (!req.query.search) {
    return res.send({
      error: 'Some error occur',
    });
  }
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    msg: 'Help Article not found',
  });
  // res.send('Help page is under maintenance');
});

//* match anything that has not match so far
app.get('*', (req, res) => {
  res.render('error', {
    msg: 'Page not found',
    title: 404,
  });
  // res.send('404 Page');
});

app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
