 const User = require("../models/User.js").User;
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const {sendMail}=require("../middlewares/sendMail.js")

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email,password }).select("-password -email");
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ _id: user?._id }, process.env.JWT_SECRET,{expiresIn:60*60});
    req.session.authorization={token,email}
    return res
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    req.session.destroy(err => {
      if (err) {
        throw new Error('Unable to log out')
      } else {
        return res.status(200).json({
          success: true,
          message: "Logged out successfully",
      })
    }
  })
  
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");
    

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSkills=async(req,res)=>{
  try {
    const user=await User.findOne().select("skills")
    return res.status(200).json({
      success:true,
      skills:user.skills
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}

const getProjects=async(req,res)=>{
try {
  const user=await User.findOne().select("projects")
  return res.status(200).json({
    success:true,
    projects:user.projects
  }
    
  )
  
} catch (error) {
  return res.status(500).json({
    success:false,
    message:error.message
  })
  
}
}


const getEducation=async(req,res)=>{
  try {
    const user=await User.findOne().select("educations")
    return res.status(200).json({
      success:true,
      educations:user.educations
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}

const getExperiences=async(req,res)=>{
  try {
    const user=await User.findOne().select("experiences")
    return res.status(200).json({
      success:true,
      experiences:user.experiences
    })
    
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
    
  }
}

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req?.user?._id);

    const { name, email, password, about } = req.body;

    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (about) {
      user.about.name = about.name;
      user.about.title = about.title;
      user.about.subtitle = about.subtitle;
      user.about.description = about.description;
      user.about.quote = about.quote;

      if (about.avatar) {
        await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
          folder: "portfolio",
        });

        user.about.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    }
    await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const updateProject=async(req,res)=>{
  
  const {title,demo_url,github_url,image,techStack,description,category,fromDate,toDate}=req.body
  const projectId=req.params['id']
  try{
    const user=await User.findOne().select("-email -password")
    
    const projectIndex = user?.projects?.findIndex(project => project?._id.toString() === projectId);
    
    if (projectIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }
    const project = user.projects[projectIndex];
    
    // Update project properties
    if (title) {
      user.projects[projectIndex].title = title;
  }
  if (demo_url) {
    user.projects[projectIndex].demo_url = demo_url;
  }
  if (github_url) {
    user.projects[projectIndex].github_url = github_url;
  }
  if (description) {
    user.projects[projectIndex].description = description;
  }
  if (techStack) {
    user.projects[projectIndex].techStack = techStack;
  }
  if(category){
    user.projects[projectIndex].category=category;
  }
  if(fromDate){
    user.projects[projectIndex].fromDate=fromDate;
  }
  if(toDate){
    user.projects[projectIndex].toDate=toDate;
  }
  if (image) {
    // Delete the old image on Cloudinary
    if(typeof image==='string' && project?.image?.public_id!==null)
     {
      await cloudinary.v2.uploader.destroy(project.image.public_id); 
       // Upload the new image to Cloudinary
       const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: 'portfolio/projects',
      });
  
      // Update project image
      user.projects[projectIndex].image = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    } 
  }

  // Save the changes to the user document
  await user.save();

    res.status(200).json({
      success: true,
      message: "Project updated successfully",
    });
  }catch(err){
    return res.status(400).json({
      success:false,
      message:err.message
    })
  }
 
}
const updateSkill=async(req,res)=>{
  const {image,name,category}=req.body
  const {id}=req.params
  try {
    const user=await User.findOne().select("-password -email")
    const skillIndex=user?.skills?.findIndex((skill)=>skill?._id.toString()===id)
    if (skillIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found',
      });
    }

    const skill=user.skills[skillIndex]
    if(skill.name!==name){
      user.skills[skillIndex].name=name
    }
    if(skill.category!==category){
      user.skills[skillsIndex].category=category
    }

    if (image) {
      // Delete the old image on Cloudinary
      if(typeof image==='string')
     {
      if(skill?.image?.public_id!==null){
        await cloudinary.v2.uploader.destroy(skill.image.public_id); 
      }
       // Upload the new image to Cloudinary
       const myCloud = await cloudinary.v2.uploader.upload(image, {
        folder: 'portfolio/skills',
      });
  
      // Update project image
      user.skills[skillIndex].image = {
        public_id: myCloud.public_id,
        url: myCloud.url,
      };
    } 
  
     
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Skill updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:error.message
    })
  }
}

const updateExperience=async(req,res)=>{
  const {position,company,description,fromDate,toDate,skills,image}=req.body
  const {id}=req.params
  try {
    const user=await User.findOne().select("-password -email")
    const experienceIndex=user?.experiences?.findIndex((experience)=>experience?._id.toString()===id)
    if (experienceIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Experience not found',
      });
    }

    const experience=user.experiences[experienceIndex]
    if(position){
      user.experiences[experienceIndex].position=position
    }

   if(company){
    user.experiences[experienceIndex].company=company
   }
   if(description){
    user.experiences[experienceIndex].description=description
   }
   if(fromDate){
    user.experiences[experienceIndex].fromDate=fromDate
   }
   if(toDate){
    user.experiences[experienceIndex].toDate=toDate
   }
   if(skills){
    user.experiences[experienceIndex].skills=skills
   }
   if (image) {
    if(typeof image==='string')
   {
    if(experience?.image?.public_id!==null){
      await cloudinary.v2.uploader.destroy(experience.image.public_id); 
    }
   
     const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: 'portfolio/experiences',
    });

    
    user.experiences[experienceIndex].image = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  } 

   
  }
   

    await user.save();

    res.status(200).json({
      success: true,
      message: "Experience updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:error.message
    })
  }
}

const updateEducation=async(req,res)=>{
  const {degree,institution,description,fromDate,toDate,field,image,grade}=req.body
  const {id}=req.params
  try {
    const user=await User.findOne().select("-password -email")
    const educationIndex=user?.educations?.findIndex((education)=>education?._id.toString()===id)
    if (educationIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Education not found',
      });
    }

    const education=user.educations[educationIndex]
    if(degree){
      user.educations[educationIndex].degree=degree
    }
    if(field){
      user.educations[educationIndex].field=field
    }
   if(institution){
    user.educations[educationIndex].institution=institution
   }
   if(description){
    user.educations[educationIndex].description=description
   }
   if(fromDate){
    user.educations[educationIndex].fromDate=fromDate
   }
   if(toDate){
    user.educations[educationIndex].toDate=toDate
   }
   if(grade){
    user.educations[educationIndex].grade=grade
   }
   if (image) {
    if(typeof image==='string')
   {
    if(education?.image?.public_id!==null){
      await cloudinary.v2.uploader.destroy(education.image.public_id); 
    }
   
     const myCloud = await cloudinary.v2.uploader.upload(image, {
      folder: 'portfolio/educations',
    });

    
    user.educations[educationIndex].image = {
      public_id: myCloud.public_id,
      url: myCloud.url,
    };
  } 

   
  }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Education updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success:false,
      message:error.message
    })
  }
}
const updateAboutMe=async(req,res)=>{
  const {name,title,avatar,subtitle,quote,description}=req.body
  try {
    const user=await User.findOne().select("-password -email")
    if(name){
      user.about.name=name
    }
    if(title){
      user.about.title=title
    }
    if(subtitle){
      user.about.subtitle=subtitle
    }
    if(avatar){
      if(user.about.avatar.public_id)
      {await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);}
      if(typeof(avatar)!=='object')
      {

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: 'portfolio/aboutme',
        });
        user.about.avatar={
          public_id:myCloud.public_id,
          url:myCloud.url
        }
      }
     
    }
    
      if(description){
        user.about.description=description
      }
      if(quote){
        user.about.quote=quote
      }

      await user.save()
      return res.status(200).json({
        success: true,
        message: "About Me Detail updated successfully",
      });
    
    
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
    
  }
 
}
const myProfile = async (req, res) => {
  try {
    const user = await User.findOne(req?.user?._id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const contact = async (req, res) => {
  try {
    const { name, email, message,subject } = req.body;
    const userMessage = `Email: ${email}\nMessage: ${message}`;
    const contactDetails={name:name,email:email,message:userMessage,subject:subject}
    

    await sendMail(contactDetails);

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const user = await User.findOne(req?.user?._id);

    user.timeline.unshift({
      title,
      description,
      date,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to Timeline",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const addSkill = async (req, res) => {
  try {
    const { name, image,category } = req.body;
    const user = await User.findOne(req?.user?._id);
    let myCloud=null
    if(image!=="")
    {
      myCloud= await cloudinary.v2.uploader.upload(image, {
        folder: "portfolio/skills",
      });
    }

    const newSkill={
      ...(name && { name }),
      ...(category && {category}),
      ...(myCloud && myCloud.public_id && myCloud.secure_url ? {
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      }:{image:{
        public_id: null,
        url: null,
      }}),

    }
    user.skills.unshift(newSkill);

    await user.save();

    res.status(200).json({
      success: true,
      message: "New Skill Added",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const addProjects = async (req, res) => {
  try {
    const { title,demo_url, github_url, image,description,techStack ,category,fromDate,toDate} = req.body;
    const user = await User.findOne();
    let myCloud=null
    if(image!=="")
    {
      myCloud= await cloudinary.v2.uploader.upload(image, {
        folder: "portfolio/projects",
      });
    }
    

    const newProject = {
      ...(title && { title }),
      ...(demo_url && { demo_url }),
      ...(github_url && { github_url }),
      ...(myCloud && myCloud.public_id && myCloud.secure_url ? {
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      }:{image:{
        public_id: null,
        url: null,
      }}),
      ...(category &&{category}),
      ...(description && { description }),
      ...(techStack && { techStack }),
      ...(fromDate && { fromDate }),
      ...(toDate && {toDate}),
    };

    user.projects.unshift(newProject);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "New Project Added",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const addEducation=async(req,res)=>{
    try {
        const {institution,description,degree,image,fromDate,toDate,field,grade}=req.body;
        const user=await User.findOne(req?.user?._id)
        let myCloud=null
    if(image!=="")
    {
      myCloud= await cloudinary.v2.uploader.upload(image, {
        folder: "portfolio/educations",
      });
    }
    
    const newEducation = {
      ...(institution && { institution }),
      ...(field && { field }),
      ...(degree && { degree }),
      ...(myCloud && myCloud.public_id && myCloud.secure_url ? {
        image: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      }:{image:{
        public_id: null,
        url: null,
      }}),
      ...(grade && {grade}),
      ...(description && { description }),
      ...(fromDate && { fromDate }),
      ...(toDate && {toDate}),
    };
        user.educations.unshift(newEducation)
        
        await user.save()

        res.status(200).json({
            success:true,
            message:"New Education Added"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const addExperience=async(req,res)=>{
    try {
        const {company,position,toDate,fromDate,description,skills,image}=req.body;
        const user=await User.findOne(req?.user?._id)
        if(image!=="")
        {
          myCloud= await cloudinary.v2.uploader.upload(image, {
            folder: "portfolio/experiences",
          });
        }

        const newExperience = {
          ...(position && { position }),
          ...(company && { company }),
          ...(skills && { skills }),
          ...(myCloud && myCloud.public_id && myCloud.secure_url ? {
            image: {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            },
          }:{image:{
            public_id: null,
            url: null,
          }}),
          ...(description && { description }),
          ...(fromDate && {fromDate}),
          ...(toDate && { toDate }),
        };
        user.experiences.unshift(newExperience)
        
        await user.save()

        res.status(200).json({
            success:true,
            message:"New Experience Added"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
const deleteTimeline=async(req,res)=>{
    try {
        const {id}=req.params;

        const user=await User.findId(req?.user?._id)

        user.timeline=user.timeline.filter(item=>item._id!==id)

        await user.save();

        return res.status(200).json({
            success:true,
            message:"Timeline Deleted"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
const deleteSkill=async(req,res)=>{
    try {
        const {id}=req.params;

        const user=await User.findById(req?.user?._id)
        
        const skillIndex = user?.skills?.findIndex(skill => skill._id.toString() === id);
    
        if (skillIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Skill not found',
          });
        }
        if(user.skills[skillIndex].image && user.skills[skillIndex].image.public_id){
          await cloudinary.v2.uploader.destroy(user.skills[skillIndex].image.public_id);
        }
        user.skills=user.skills.filter(item=>item._id.toString()!==id)

        await user.save();

        return res.status(200).json({
            success:true,
            message:"Skill Deleted"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
const deleteProject=async(req,res)=>{
    try {
        const {id}=req.params;

        const user=await User.findById(req?.user?._id)
        const projectIndex = user?.projects?.findIndex(project => project._id.toString() === id);
    
        if (projectIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Project not found',
          });
        }
        if(user.projects[projectIndex].image && user.projects[projectIndex].image.public_id){
          await cloudinary.v2.uploader.destroy(user.projects[projectIndex].image.public_id);
        }
       
        
        user.projects=user.projects.filter(item=>(item._id.toString()!==id))

        await user.save();

        return res.status(200).json({
            success:true,
            message:"Project Deleted"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
const deleteExperience=async(req,res)=>{
    try {
        const {id}=req.params;

        const user=await User.findById(req?.user?._id)

        const experienceIndex = user?.experiences?.findIndex(experience => experience._id.toString() === id);
    
        if (experienceIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Experience not found',
          });
        }
        if(user.experiences[experienceIndex].image && user.experiences[experienceIndex].image.public_id){
          await cloudinary.v2.uploader.destroy(user.experiences[experienceIndex].image.public_id);
        }
        
        user.experiences=user.experiences.filter(item=>item._id.toString()!==id)
        await user.save();

        return res.status(200).json({
            success:true,
            message:"Experience Deleted"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
const deleteEducation=async(req,res)=>{
    try {
        const {id}=req.params;

        const user=await User.findById(req?.user?._id)
        const educationIndex = user?.educations?.findIndex(education => education._id.toString() === id);
    
        if (educationIndex === -1) {
          return res.status(404).json({
            success: false,
            message: 'Education not found',
          });
        }
        if(user.educations[educationIndex].image && user.educations[educationIndex].image.public_id){
          await cloudinary.v2.uploader.destroy(user.educations[educationIndex].image.public_id);
        }
        user.educations=user.educations.filter(item=>item._id.toString()!==id)

        await user.save();

        return res.status(200).json({
            success:true,
            message:"Education Deleted Successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

// module.exports.signIn = login;
// module.exports.signOut = logout;
// module.exports.getUser = getUser;
// module.exports.contactMe = contact;
// module.exports.myProfile = myProfile;
// module.exports.updateUser = updateUser;
// module.exports.addTimeline = addTimeline;
module.exports={
  getProjects:getProjects,
  getEducation:getEducation,
  getExperience:getExperiences,
    getSkills:getSkills,
    addSkill:addSkill,
    addProject:addProjects,
    addEducation:addEducation,
    addExperience:addExperience,
    signIn:login,
    signOut:logout,
    getUser:getUser,
    contactMe:contact,
    myProfile:myProfile,
    updateUser:updateUser,
    updateProject:updateProject,
    updateSkill:updateSkill,
    updateExperience:updateExperience,
    updateEducation:updateEducation,
    updateAboutMe:updateAboutMe,
    addTimeline:addTimeline,
    deleteTimeline:deleteTimeline,
    deleteSkill:deleteSkill,
    deleteProject:deleteProject,
    deleteExperience:deleteExperience,
    deleteEducation:deleteEducation
}
