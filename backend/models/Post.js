const express = require("express");
const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Title is required"],
    },
    description:{
        type:String,
        required:[true,"Description is required"],
    },
    author:{
        type:String, //while searching userId mongoose will automatically cache it as userId
        ref: "User",
        required:[true,"Author Id is required"]
    },
    noOfViews:{
        type: Number,
        default:0
    },
    likes:{
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("Post", PostSchema);