const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId; 

const userSchema = new Schema({
email : { type : String , required : true, unique : true},
password : { type : String , required : true},
firstname : { type : String , required : true},
lastname : { type : String , required : true}

});

const userModel = mongoose.model('user', userSchema);

module.exports ={
  userModel,
 
}