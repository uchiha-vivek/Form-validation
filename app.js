const express= require('express')
const bodyParser= require('body-parser')
const {check, validationResult} = require('express-validator')


const app = express()

const PORT = 5000

app.set("view engine","ejs")

const urlencodedParser=  bodyParser.urlencoded({extended:false})

app.get("",(req,res)=>{
    res.render('index')
})

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',urlencodedParser,[
    check('username','this user must contain minimum 3+ characters')
    .exists()
    .isLength({min:3}),

    check('email','email is not valid')
    .isEmail()
    .normalizeEmail()
],(req,res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).jsonp(errors.array())

        // const alert=errors.array()
        // res.render('register',{
        //     alert
        // })
    }
})
     

app.listen(PORT, ()=> console.info(`App listening on port : ${PORT}`))