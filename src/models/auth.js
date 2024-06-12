import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: { type: String, reqired: true },
    phoneNumber:{type:String,reqired:true},
    email: { type: String, required: true, unique: true },
    password: { type: String,reqired: true },
    userType:{type:String,reqired:true}
    
  });
  export default mongoose.model("User", userSchema);
  