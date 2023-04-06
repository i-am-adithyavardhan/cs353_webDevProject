const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt")

router.get("/",(req,res)=>{
    res.send("from user route!")
})

//GET USER
router.get("/:id",async(req,res)=>{
    try{
        // const user = await User.findOne({username: req.body.username})
        const user = await User.findById(req.params.id);
        //send only needed info
        const {password,updatedAt,...userDetails} = user._doc
        res.status(200).json(userDetails);
    }
    catch(err){
        return res.status(500).json(err);
    }
})


//UPDATE USER
router.put("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id){ 
        if(req.body.password){ //if user wants to update password -> then we have to encrypt new password and save!
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password,salt);
                // console.log(req.body.password)
            }
            catch(err){
                return res.status(500).json(err);
            }
        }

        //for updating fields in dB
        try{
            const updatedUser = await User.findByIdAndUpdate(req.body.userId,{$set:req.body});  //find user by userId and update details ,can also use { $set : {<field1>:<value1>,...}}
            // console.log(updatedUser);
            res.status(200).json("User details updated successfully!");
            
        }
        catch(err){
            return res.status(500).json("updating user details errrr");
        }
    }
    else{ //a user can update his details but not other user's details unless he is admin
        res.status(403).json("Only user can update details!") //403 - client is forbidden from accessing a valid URL
    }
})


//DELETE USER
router.delete("/:id",async(req,res)=>{
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const delUser = await User.findOneAndDelete({_id: req.body.userId});
            res.status(200).json("Deleted user successfully!");
        }
        catch(err){
            return res.status(500).json(err);
        }
    }
    else{
        res.status(403).json("Only user can delete the account!");
    }
})

module.exports=router;
