import foodModel from "../models/foodModel.js";
import fs from "fs";


// add food items

const addFood = async (req, res) => {
    //  store in the database
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


// all food lists

const listFood = async(req,res)=>{
     try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
     } catch (error) {
        console.log(error);
        res.json({success:false,message:error});
     }
}


// remove food item

const removeFood = async(req,res) => {
    try {
        // find the data by id
        const food = await foodModel.findById(req.body.id);
       //delete the image in the uploads folder wherre we delete a data from the database
        fs.unlink(`uploads/${food.image}`,()=>{})
        // find the id and delete data from the database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food removed"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}



export { addFood,listFood,removeFood }