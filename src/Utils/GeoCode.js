const request=require('request')
const GeoCode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoieWFzaHJvaGVyYSIsImEiOiJja2ptbzRvYWMwazRrMnJ0ZmFqOGRuaG02In0.jRfQjgNCLpNTPm2sj20dgQ"       
    request({url,json:true},(error,{body})=>{
        if(error)
        {
           callback("Unable to connect to the servers",undefined)
        }
        else if(body.features.length===0)
        {
            callback("Unable to search the location. Try another Location",undefined)
        }

        else{
            const Longitude=body.features[0].center[0]
            const Latitude=body.features[0].center[1]
            const data={
                Longitude:Longitude,
                Latitude:Latitude,
                Location:body.features[0].place_name
            }
            callback(undefined,data)
        }
    })
}




module.exports=GeoCode