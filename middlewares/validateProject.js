const validateProject = (req, res, next) => {
    const { id } = req.body;
    const { name, description, completed } = req.body;
    const project = {
      id,
      name,
      description,
      completed
    };
    if (typeof project.name === "undefined" || typeof project.description === "undefined" || typeof project.completed === "undefined") {
      return res
        .status(404)
        .json({
          errorMessage: "Please provide name, description and completed as keys, with values for the new project."
        });
    }
    if (project.name.trim() === "" || project.description.trim() === "" || project.completed.trim() === "") {
      return res
        .status(404)
        .json({ errorMessage: "Please provide value for the new project." });
    }
    next();
  };
  
  export default validateProject;