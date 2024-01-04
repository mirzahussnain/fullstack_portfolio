const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    select: false,
    required: [true, "Password is required"],
  },
  isAdmin:{
    type:Boolean,
  },
  timeline: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  skills: [
    {
        name:{
            type:String,
            required: [true, "Name is required"],
        },
        category:{
          type:String,
          required:[true]
        },
      image: {
        public_id: String,
        url: String,
      },
    },
  ],
  projects: [
    {
      title:{
        type:String,
        
      },
      demo_url: {
        type: String,
        default: null,
      },
      github_url: {
        type: String,
        default: null,
      },
      image: {
        public_id: String,
        url: String,
      },
      description: {
        type: String,
        default: null,
      },
      category:{
        type:String,
      },
      fromDate:{
        type:Date
      },
      toDate:{
        type:Date
      },
      techStack: [],
    },
  ],
  educations: [
    {
      institution: {
        type: String,
        required: [true, "University is required"],
      },
      image:{
        public_id:String,
        url:String,
      },
      field:{
        type:String,
      },
      degree: {
        type: String,
        required: [true, "Degree is required"],
      },
      fromDate: {
        type: Date,
      },
      toDate: {
        type: Date,
      },
      description: {
        type: String,
        default: null,
      },
      grade:{
        type:String
      }
    },
  ],
  about: {
    name: {
      type: String,
    },
    title: { type: String },
    subtitle: { type: String },
    description: { type: String },
    quote: { type: String },
    avatar: {
      public_id: String,
      url: String,
    },
  },
  experiences:[
    {
      company: {
        type: String,
        required: [true, "Company is required"],
      },
      position: {
        type: String,
        required: [true, "Position is required"],
      },
      fromDate: {
        type: Date,
      },
      toDate:{
        type:Date,
      },
      description: {
        type: String,
        default: null,
      },
      skills:[],
      image:{
        public_id:String,
        url:String,
      }
    },
  ],
  token:{
    type:String,
  }
});

const User = mongoose.model("User", userSchema);


module.exports = {User};
