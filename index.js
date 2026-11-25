const express=require('express')
const mongoose=require('mongoose')
const path=require('path')

const app=new express()
const User=require('./models/user')

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/KumarDb';

app.set('view engine','ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))

app.listen(PORT,()=>{
    console.log(`Connected Successfuly..on port number :${PORT}`);
    
});

//connection with MongoDB
mongoose.connect(MONGO_URL)
.then(()=>console.log("MogoDb connected..."))
.catch(err=>console.log("connected Error",err))

//Routing
app.get('/register',(req,res)=>{
    res.render('register')
});

app.post('/register',async(req,res)=>{
try{
    const {fname,lname,uname,email}=req.body
    const user=new User({fname,lname,uname,email})
    await user.save();
    res.send("Data hv been stored in MongoDB... ")
}
catch (err){
    console.log("Save Error:", err);
    res.status(500).send("server Error..");
    
}


})