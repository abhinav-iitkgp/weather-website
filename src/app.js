const express=require('express')
const path= require('path')
const hbs=require('hbs')
const geocode=require('./utills/geocode')
const forecast=require('./utills/forecast')

const app=express()

const port=process.env.PORT || 3000

//setting path
const publicDirectorypath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setting up handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)//default path is view instead of templates
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectorypath))
// for static page this path will be used



app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Abhinav'
    })
})


// app.get('',(req,res)=>{
//     res.send('Hello to home page')
// })

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Abhinav',
        location:'Noida'
    })
})
// app.get('/help',(req,res)=>{
//     res.send('Hello to help page')
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About</h1>')
// })

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Abhinav'
    })
})

// app.get('/*/help',(req,res)=>{
//     res.send('*/help 404 error')
// })



app.get('/weather',(req,res)=>{
    const place=req.query.address
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide a location',
            address:place
        })
    }
    
    geocode(place,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error,
                
                address:place
            })
        }
        forecast(latitude,longitude,(error,display)=>{
            if(error){
                return res.send({
                    error,
                    address:place
                })
            }
            res.send({
                forecast:display,
                address:place,
                location
            })
        })

    })
    
})


app.get('/help/*',(req,res)=>{
    res.render('404page',{
        error:'Help page not found',
        title:'404',
        name:'Abhinav'
    })
})

app.get('*',(req,res)=>{

    res.render('404page',{
        error:'Page Not Found',
        title:'404',
        name:'Abhinav'
    })

})

app.listen(port,()=>{
    console.log('Listening at port ', port)
})