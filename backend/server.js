const express = require("express");
const bodyParser = require("body-Parser");
const db = require("./config/conn");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const User = require("./models/User");
const Post = require("./models/Post");
const cors = require('cors');
const jwt = require("jsonwebtoken")

// const secrets = require('./config/config1.js')
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
app.use(cors());
app.use(bodyParser.json())
// const JWT_SECRET = "somethingisfishy3524521";


// const postRouter = require("./postRouter");
// // mongoose
// //   .connect(
// //     "mongodb+srv://saivikas:Vikas%402003@mongodb-demo.21lkg2i.mongodb.net/User1db?retryWrites=true&w=majority"
// //   )
// //   .then(() => console.log("Db connected"))
// //   .catch((err) => console.log(err.message));

db();
app.use(bodyParser.urlencoded({ extended: true}));

// });

// //mongodb data

// const data = mongoose.model("User",UserSchema); //new collection which follows the above userschema structure

// /*const user1 = new User({
//     name: 'Adithya',
//     username: 'adithya-vardhan',
//     password: '12345678',
//     phone: 9000710046,
//     dob: 06-03-2003
// });

// const user2 = new User({
//     name: 'Vikas',
//     username: 'sai-vikas',
//     password : '87654321',
//     phone: 9094537639,
//     dob : "07-05-2002"
// });

// const user3 = new User({
//     name: "Anirudh",
//     username: "anirudh",
//     password : '1234578',
//     phone: 8989731230,
//     dob: "09-08-2002"
// });

// User.insertMany([user1,user2,user3],function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("successfully saved all users to user1 collection");
//     }
// })*/

// // bcrypt
// app.get("/Blogs",async(req,res)=>{
//   try{
//     //res.render("posts");
//     const blogs = await Post.find();
//     console.log(blogs);
//     res.send({status:"ok",data:blogs});
//   }
//   catch(err){
//     console.log(err);
//   }
// })

app.get("/Blogs",(req,res)=>{
  Post.find({}).then((items)=>{res.json(items) ;console.log(items)}).catch((err)=>console.log(err));
});

app.post("/login", async (req, res) => {
  const loginData = req.body;
  try {

    const user = await User.findOne({ username: loginData.username });
    //console.log(user);
    if (!user) {
      res.status(404).send("<h2>User not found</h2>");
      res.end();
    } 
    else {
      const isValid = await bcrypt.compare(loginData.password, user.password);

      if (isValid) {
        // res.status(200).send("You have logged in successfully!");
        //return res.json({status:"ok",data:"successful login"});
      
        // jwt token
        // console.log(secret)
       const secrets = process.env.JWT_KEY
      //  console.log(secrets)
       const token = jwt.sign({
          userId: user._id,
          username: user.username
        },secrets,{expiresIn : "30d"}) //check
        return res.json({status:"ok",user:token})
       
      } 
      else {
        res.json({status:"error",error:"Wrong Password!"});
      }
    }
    // console.log(req.body.password);
  } catch (err) {
    console.log(err);
  }
});

// app.get("/userprofile", async function (req, res) {
//   // await res.sendFile(__dirname+"/userprofile.hbs");
//   // res.setHeader('Content-Type', 'application/javascript');
//   res.render("userprofile");
// });

// app.post("/userprofile",async function (req,res){
//   try{
//     const savedPost = await Post.create({
//         title: req.body.title,
//         description: req.body.description,
//         author: req.body.author,
//     });
//     //find user and save post in user.posts 
//     const usrFound = await User.findOne({username: req.body.author});
//     if(!usrFound){
//         return res.json({msg: "User not found"});
//     }
//     usrFound.posts.push(savedPost._id);
//     usrFound.noOfPosts = usrFound.noOfPosts+1;
//     const nPosts = usrFound.noOfPosts;
//     await usrFound.save();
    
//     res.status(200).send("Successfully saved "+ "No of posts from user : "+nPosts);

//     // res.redirect("/posts");
//     // res.json(savedPost); //check this
    
//   }
//   catch(err){
//     res.json({message: err})
//   }

// });

// //This get function is for rendering loading the javascript file after cliking the post button
// app.get("/postblog.js", function (req, res) {
//    res.setHeader("Content-Type", "application/javascript");
//   res.sendFile(__dirname + "/postblog.js");
// });

// app.get("/uservalidation.js", function (req, res) {
//   res.setHeader("Content-Type", "application/javascript");
//   res.sendFile(__dirname + "/uservalidation.js");
// });
// // app.use(express.static('public'));
// // app.post("/userprofile")


app.post("/signup", async function (req, res) {
  
  const formdata = req.body;
  const userexist = await User.findOne({username:formdata.uname});
  console.log(userexist)
  if(userexist){
    res.send("Username already exists");
    return
  }
  console.log(formdata);

  
  // console.log(req.body)
  try{
  const user1 = await User({
    name: formdata.name,
    //dob: dob1,
    username: formdata.uname,
    password: formdata.pswd,
    cpassword: formdata.cpswd,
    phone: formdata.phonenumber,
    email: formdata.email,
  });
  await user1.save();
  
  res.status(200).send("ok");
}
catch(err){
  res.send("User not stored in db");
}
  //console.log(req.body.password);
});




// //checl /userProfile

app.listen(5000, function () {
  console.log("I am lis at port 5000");
});

