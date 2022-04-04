console.log("Working in the client side")

const weatherForm=document.querySelector('form')
const input=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()   //To prevent the deafult nature of the browsers to refresh the content again and again
    message1.textContent='Loading....'
    message2.textContent=''
    fetch("/weather?address="+encodeURIComponent(input.value)).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            message1.textContent=data.error
            message2.textContent=''
        }
        else
        {
            message1.textContent=data.Location
            message2.textContent=data.forecast
        }
        
    })
})
})