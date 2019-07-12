import express from 'express';
import Project from '../data/helpers/projectModel';

const projectRoutes = express.Router();

projectRoutes.get('/:id', async (req, res) => {
    const project = await Project.get(req.params.id);

    try {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({ message: `The project with the specified id:${req.params.id} does not exist.` })
        }
    } catch(error) {
        res.status(500).json({ error: "The project information could not be retrieved." })
    }
})


export default projectRoutes;