const express=require('express')
const chalk=require('chalk')
const path=require('path')
const hbs=require('hbs')
const GeoCode=require('./Utils/GeoCode')
const WeatherData=require('./Utils/WeatherData')
const port= process.env.PORT || 3000

//Setting Up the app
const app=express()

//Setting Up the paths
const pathDirectory=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,"../template/views")
const setPartialsPath=path.join(__dirname,"../template/partials")

//Setting Up handlerbars engine and views..
app.set('view engine', 'hbs');
app.set('views',viewPath)
hbs.registerPartials(setPartialsPath)


//Setting up the static folder
app.use(express.static(pathDirectory))  //the '' statement is not going to be used..

// app.get('',(request,response)=>{
//     // response.send("<h1>Hello Express!</h1>")
//     response.send([{
//         name:"Yash Rohera",
//         age:19
//     }])

// })

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Yash Rohera"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page"
    })
})

app.get('/product',(req,res)=>{
    if(!req.query.search)
    {
        return res.send({error:"You must provide a search term"})
    }
    res.send({products:[]})
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:"You must provide the address"
        })
    }

    GeoCode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error)
        {
           return res.send({error:error})
        }
        WeatherData(Latitude,Longitude,(error,Forecast)=>{
             if(error)
             {
                 return res.send({error:error})
             }

             res.send({
                 forecast:Forecast,
                 Location:Location,
             })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('help_er')
})

//To get a 404 page for a wronng URL 
app.get('*',(req,res)=>{    
    res.render('404')
})

app.listen(port,(error)=>{
    if(error)
    {
        return console.log(chalk.red("There is some problem in setting up the server!!"))
    }
    console.log(chalk.green("The Server is up on port "+port))
})