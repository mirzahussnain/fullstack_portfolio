const express=require('express')
const userController=require('../controllers/userController.js')

const userRouter=express.Router();

userRouter.post('/login',userController.signIn);
userRouter.get('/logout',userController.signOut);
userRouter.get('/user',userController.getUser);
userRouter.get('/admin/skills',userController.getSkills);
userRouter.get('/admin/projects',userController.getProjects);
userRouter.get('/admin/experiences',userController.getExperience);
userRouter.get('/admin/educations',userController.getEducation);
userRouter.post('/admin/contact',userController.contactMe);
userRouter.get('/admin/dashboard',userController.myProfile);
userRouter.put('/admin/update',userController.updateUser)
userRouter.put('/admin/about/update',userController.updateAboutMe)
userRouter.put('/admin/project/update/:id',userController.updateProject)
userRouter.put('/admin/skill/update/:id',userController.updateSkill)
userRouter.put('/admin/education/update/:id',userController.updateEducation)
userRouter.put('/admin/experience/update/:id',userController.updateExperience)
userRouter.post('/admin/timeline/add',userController.addTimeline)
userRouter.post('/admin/skill/add',userController.addSkill)
userRouter.post('/admin/project/add',userController.addProject)
userRouter.post('/admin/education/add',userController.addEducation)
userRouter.post('/admin/experience/add',userController.addExperience)
userRouter.delete('/admin/timeline/delete/:id',userController.deleteTimeline)
userRouter.delete('/admin/experience/delete/:id',userController.deleteExperience)
userRouter.delete('/admin/education/delete/:id',userController.deleteEducation)
userRouter.delete('/admin/skill/delete/:id',userController.deleteSkill)
userRouter.delete('/admin/project/delete/:id',userController.deleteProject)

module.exports.userRoutes=userRouter;