import { Router } from "express";
import Agency from "../models/agency.js";



export const router = Router();
router.post("/add", async (req, res) => {
    const {name, businessOffered,agencyDetails,email,location,phoneNumber,img} = req.body;
    try {
      const agency = await Agency.findOne({ email });
      if (agency) {
        return res.status(400).json({ message: "Agency already exists" });
      }
      
      const newAgency = new Agency({
        name, 
        businessOffered,
        agencyDetails,
        email,
        location,
        phoneNumber,
        img
      });
      const savedAgency = await newAgency.save();
      res.status(201).json(savedAgency);
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  });
    
    
  
  // get

router.get("/", async (req, res) => {
  try {
  const agency= await Agency.find();

    return res.status(200).json(agency);
  } catch (error) {
   return res.status(500).json({message:error });
  }
});
  
 