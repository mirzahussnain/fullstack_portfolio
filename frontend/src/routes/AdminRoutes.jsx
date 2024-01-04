import React, { useContext, useEffect } from "react";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import Projects from "../Pages/Admin/Projects/Projects";
import Experiences from "../Pages/Admin/Experiences/Experiences";
import AboutMe from "../Pages/Admin/About/AboutMe";
import Educations from "../Pages/Admin/Education/Educations";
import Skills from "../Pages/Admin/Skills/Skills";
import { Route, useNavigate } from "react-router-dom";
import AddProject from "../Pages/Admin/Projects/AddProject";
import AddSkill from "../Pages/Admin/Skills/AddSkill";
import UpdateSkill from "../Pages/Admin/Skills/UpdateSkill";
import UpdateProject from "../Pages/Admin/Projects/UpdateProject";
import AddExperiences from "../Pages/Admin/Experiences/AddExperiences";
import UpdateExperiences from "../Pages/Admin/Experiences/UpdateExperiences";
import AddEducation from "./../Pages/Admin/Education/AddEducation";
import UpdateEducation from "../Pages/Admin/Education/UpdateEducation";
const AdminRoutes = () => {
 
  return (
    
    <>
      <Route index path="dashboard" element={<Dashboard />} />
      <Route index path="projects" element={<Projects />} />
      <Route index path="projects/add" element={<AddProject />} />
      <Route index path="projects/update" element={<UpdateProject />} />
      <Route index path="experiences" element={<Experiences />} />
      <Route index path="experiences/add" element={<AddExperiences />} />
      <Route index path="experiences/update" element={<UpdateExperiences />} />
      <Route index path="about" element={<AboutMe />} />
      <Route index path="educations" element={<Educations />} />
      <Route index path="educations/add" element={<AddEducation />} />
      <Route index path="educations/update" element={<UpdateEducation />} />
      <Route index path="skills" element={<Skills />} />
      <Route index path="skills/add" element={<AddSkill />} />
      <Route index path="skills/update" element={<UpdateSkill />} />
    </>
  );
};

export default AdminRoutes;
