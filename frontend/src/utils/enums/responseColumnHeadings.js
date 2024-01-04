export const columnsToHide = {
  PROJECTS: {
    ON_LARGE: [ "_id","demo_url","github_url"],
    ON_MEDIUM: ["description"],
    ON_SMALL:["image","techStack"],
  },
  SKILLS: {
    ON_LARGE: ["_id"],
    ON_MEDIUM: ["image"],
    ON_SMALL:["category"],
  },
  EXPERIENCES: {
    ON_LARGE: ["fromDate","toDate","_id"],
    ON_MEDIUM: ["description","company"],
    ON_SMALL:[""],
  },
  EDUCATIONS:{
    ON_LARGE: ["fromDate","toDate","_id"],
    ON_MEDIUM: ["description","institution","grade"],
    ON_SMALL:["field","image"]
  }
};
