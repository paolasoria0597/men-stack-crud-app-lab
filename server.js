const dotenv= require ("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const methodOverride= require("method-override");// middlewear
const morgan= require ("morgan");
const app = express();

mongoose.connect(process.env.MONGODB_URI);
// log connection status to terminal on start
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Dog = require ("./models/dog.js"); // I can use the Dog model in the request handling functions defined in my express routes. This setup will allow  created and this allows me to perform database operations like creating, deleting, aand updating dog documents in mongo DB
app.use(express.urlencoded({extended: false}));
app.use (methodOverride("_method"));
app.use (morgan("dev"));

app.get ("/", async (req,res) => {
    res.render("index.ejs");
});

app.get ("/dogs", async (req,res)=> {
  const allDogs= await Dog.find();
  
  res.render("dogs/index.ejs", {dogs:allDogs});
});


app. get ("/dogs/new", (req,res) => {
  res.render ("dogs/new.ejs");
});

app.get("/dogs/:dogId", async (req, res) => {
  const foundDog = await Dog.findById(req.params.dogId);
  res.render("dogs/show.ejs", { dog: foundDog });
});


app.post ("/dogs", async(req,res) => {
if(req.body.isAPuppy==="on"){
  req.body.isAPuppy=true; 
} else{
    req.body.isAPuppy = false;
}
await Dog.create(req.body);
res.redirect("/dogs/new");
});

app.delete("/dogs/:dogId", async (req, res) => {
  console.log("DELETE request received for dog ID:", req.params.dogId);
  await Dog.findByIdAndDelete(req.params.dogId);
  res.redirect("/dogs");
});

app.get("/dogs/:dogId/edit", async (req,res) => {
  const foundDog= await Dog.findById(req.params.dogId)
  res.render("dogs/edit.ejs", { dog: foundDog, });
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});


