const request=require('request')
const geocode=(place,callback)=>{

    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(place)+'.json?access_token=pk.eyJ1IjoiYWJoaW5hdjIwMjkiLCJhIjoiY2tqcHJzMXBzMGJkMTJ6anh5eTl4YmNxeiJ9.MbpK-XbFZJx5sKBUuE8Mhg&limit=1'
    
    request({url:url,json:true},(error,{body}={})=>{
        // console.log(response.body)

        if(error){
            callback('Unable to connect',{})
        }else if(('message' in body)||!(body.features.length)){
            callback('Location not found')
        }else{

            const data={
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name

            }

            callback(undefined,data)
        }
    })

}
module.exports=geocode