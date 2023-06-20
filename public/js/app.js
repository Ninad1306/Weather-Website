console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const place = document.getElementById('place')
const loc = document.getElementById('location')
const date = document.getElementById('date')
const temperature = document.getElementById('temperature')
const stat = document.getElementById('status')
const prep = document.getElementById('prep')
const wind = document.getElementById('wind')
const humidity = document.getElementById('humidity')
const feelslike = document.getElementById('feelslike')
const weatherimage = document.getElementById('weatherImage')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchText.value
    document.getElementById('loading').innerText = 'Loading...'

    fetch('http://localhost:3000/weather?address='+location).then(response => {
        response.json().then(data => {
            if(data.error){
                document.getElementById('loading').innerText = data.error
            }
            else{
                document.getElementById('loading').innerText = ''
                document.getElementById('data-container').style.display = "inline";
                searchText.value = ''
               
                
                place.innerText = location
                loc.innerHTML = data.location
                date.innerHTML = data.localtime
                temperature.firstChild.innerHTML = data.temperature
                // temperature.lastChild.innerHTML = data.temperature
                stat.innerHTML = data.weather_descriptions
                prep.innerHTML = data.precip
                wind.innerHTML = data.wind_speed
                humidity.innerHTML = data.humidity
                feelslike.innerHTML = data.feelslike
                weatherimage.src = data.weather_icons
            }
        })
    })
})
