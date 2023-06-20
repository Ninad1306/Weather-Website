const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ninad Parikh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ninad Parikh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Ninad Parikh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You have to provide an address."
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, label } = {}) => {
        if (error) res.send({ error });
        else {
            forecast(latitude, longitude, (error, { temperature, feelslike, precip, wind_speed, wind_dir, humidity,localtime,weather_descriptions,weather_icons }) => {
                if (error) res.send({ error });
                else {
                    res.send({
                        temperature,
                        feelslike,
                        precip,
                        wind_speed,
                        wind_dir,
                        humidity,
                        localtime,
                        location: label,
                        address: req.query.address,
                        weather_descriptions,
                        weather_icons,
                    })
                }
            })
        }
    })

    // res.send({
    //     forecast: 'It is raining',
    //     location: 'Vadodara',
    //     address: req.query.address,
    // })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ninad Parikh',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ninad Parikh',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})