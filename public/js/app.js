
console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const searchText = document.querySelector('input')
const msg1 = document.getElementById('msg-1')
const msg2 = document.getElementById('msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchText.value
    msg1.innerText = 'Loading...'

    fetch('http://localhost:3000/weather?address='+location).then(response => {
        response.json().then(data => {
            if(data.error){
                msg1.innerText = data.error;
            }
            else{
                // console.log(data.temperature)
                // console.log(data.feelslike)
                // console.log(data.Location)
                // console.log(data.address)

                msg1.innerText = 'The temperature of ' + data.Location + ' is ' + data.temperature + ' C'
                msg2.innerText = 'The temperature feels like ' + data.feelslike + ' C in ' + data.address
            }
        })
    })
})
