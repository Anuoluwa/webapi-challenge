import express from "express";
import Project from "../data/helpers/projectModel";
// import validateId from '../middlewares/validateId';
import validateProject from "../middlewares/validateProject";

const projectRoutes = express.Router();

projectRoutes.get("/:id", async (req, res) => {
  const project = await Project.get(req.params.id);

  try {
    if (project) {
      res.status(200).json(project);
    } else {
      res
        .status(404)
        .json({
          message: `The project with the specified id:${
            req.params.id
          } does not exist.`
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The project information could not be retrieved." });
  }
});

projectRoutes.post("/", validateProject, (req, res) => {
  const { name, description, completed } = req.body;
  const project = {
    name,
    description,
    completed
  };
  Project.insert(project)
    .then(data => {
      return res
        .status(201)
        .json({ message: "project  created successfully", data: project });
    })
    .catch(error => {
      return res
        .status(500)
        .json({ error: "The users information could not be created." });
    });
});

export default projectRoutes;
