const request=require('request')


const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=a7178025fb8f1cfc661103af5bae8221&query='+lat+','+long
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Cannot connect',undefined)
        }else if('error' in body){
            callback('Unable to find location',undefined)
        }else{
            callback(undefined,'It is '+body.current.temperature+' degrees outside and the weather is '+body.current.weather_descriptions[0])
        }

    })
}

module.exports=forecast