import mongoose from "mongoose";
const agencySchema = mongoose.Schema({
    name: { type: String, reqired: true },
    businessOffered:{type:String,required:true},
    agencyDetails:{type:String,required:true},
    email: { type: String, required: true, unique: true },
location:{type: String, required: true},
    phoneNumber:{type:String,reqired:true},
    
    image:{type:String,reqired:true}
    
  });
  export default mongoose.model("Agency",agencySchema);
  