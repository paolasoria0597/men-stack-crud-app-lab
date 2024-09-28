
const mongoose = require("mongoose");
 
const dogSchema= new mongoose.Schema({
    name: String,
    breed: String, 
    color: String,
    isAPuppy: Boolean,
});

const Dog = mongoose.model("Dog", dogSchema); // create a model

module.exports= Dog; // export the Dog model so that all my files can have access to it 
