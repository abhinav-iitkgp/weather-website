

console.log('Client side js is running')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })
// fetch('http://localhost:3000/weather?address=noida').then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })


const weatherForm=document.querySelector('form')//same name as in css 
const inputLocation =document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')
// const loca=document.querySelector('#loca')

let currentInputValue=''
// navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude,accuracy}})=>{
//     loca.textContent=latitude+" "+longitude+" "+accuracy
// })
//now putting an event listner on form for submit

weatherForm.addEventListener('submit',(e)=>{//e for event
    //by default the page reloades after sybmit..we have to stop that
    
    e.preventDefault()

    currentInputValue=inputLocation.value//for corner cases if 

    console.log('Testing',currentInputValue)
    messageOne.textContent='Loading'
    messageTwo.textContent=''
    fetch('/weather?address='+currentInputValue).then((response)=>{//or 'http://localhost:3000/weather?address=' in local host this will also work for local host
    response.json().then((data)=>{
        if(data.address===currentInputValue){//checking with latest submitted value---
            //even if sent query to server but till it reaches back to the client if the submitted 
            //location is changed then we have to print the currentSubmit value only 
        if(data.error){
            messageOne.textContent=data.error
            messageTwo.textContent=''
        }else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
            console.log(data)
        }
    }
    })
})
})