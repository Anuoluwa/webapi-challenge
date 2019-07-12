import express from "express";
import Project from "../data/helpers/projectModel";
import validateId from '../middlewares/validateId';
import validateProject from "../middlewares/validateProject";

const projectRoutes = express.Router();

projectRoutes.get("/:id", validateId, async (req, res) => {
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


projectRoutes.get("/:id/actions", validateId, async (req, res) => {
    const project = await Project.getProjectActions(req.params.id);
  
    try {
      if (project) {
        res.status(200).json({message: "Project with their actions, successfully retrieved", project});
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

  projectRoutes.delete('/:id', validateId, async (req, res) => {
    const item = await Project.get(req.params.id);
    try {
        if(item) {
            const project = await Project.remove(req.params.id);
            res.status(200).json({message: "This project has been deleted successfully",  project: item })
        } else {
            res.status(404).json({ message: `The project with the specified ID ${req.params.id} does not exist.` })
        }
    } catch(error) {
        res.status(500).json({ error: "The project could not be removed" })
    }

})

export default projectRoutes;
