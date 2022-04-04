const request=require('request')


const WeatherData=(Latitude,Longitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=5cadaa24f03f7948cbb34e37a383609a&query="+Latitude+","+Longitude
    request({url,json:true},(error,{body})=>{
             if(error)
             {
                 callback("Unable to connect to the servers",undefined)
             }
             else if(body.error)
             {
                 callback("Unable to retrieve the data of the given location",undefined)
             }

             else
             {
                 callback(undefined,"Its a "+body.current.weather_descriptions[0]+" day."+" Temperature: "+body.current.temperature+". Feelslike: "+body.current.feelslike)
             }
    })
}

module.exports=WeatherData