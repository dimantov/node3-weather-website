const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const request = require('request');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

//define paths to express config

const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//setup static directory to server
app.use(express.static(publicDirectory));

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Dmitri Antonov'
    });    
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: 'About me',
        name: 'Dmitri Antonov'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        message:'This is a help page'
    })
})


app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide search term'
        }) 
    }

    geocode(req.query.address, (error,{latitude,longtitude, location}={}) => {
        if(error){
            return res.send({
                error: 'error' 
            })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
        if(error){
            return res.send({
                error: 'error'
            })
        }
        res.send({
            forecast: forecastData,
            coordinates: {latitude, longtitude},
            location,
            address: req.query.address
        })
        
        })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        errorMessage: 'Help article not found',
        name: 'Dmitri Antonov',
        title: '404'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        errorMessage: 'Page not found',
        name: 'Dmitri Antonov',
        title: '404'
    });
})

app.listen(port ,()=> {
    console.log('Server is up on port ' + port);
})

