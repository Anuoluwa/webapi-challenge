import express from 'express';
import Action from '../data/helpers/actionModel';
import validateId from '../middlewares/validateId';
import validateAction from '../middlewares/validateAction';
import Project from '../data/helpers/projectModel';


const actionRoutes = express.Router();

actionRoutes.get('/:id', async (req, res) => {
    const action = await Action.get(req.params.id);

    try {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(404).json({ message: `The action with the specified id:${req.params.id} does not exist.` })
        }
    } catch(error) {
        res.status(500).json({ error: "The action information could not be retrieved." })
    }
})


actionRoutes.post('/:id', validateId, validateAction, async (req, res) => {
    const project = await Project.get(req.params.id);
    const { description, notes, completed } = req.body;
    const action = {
        project_id: req.params.id,
        description,
        notes,
        completed
    }
    try { 
        if(project) {
            if(action) {
                const newAction = await Action.insert(action);
               return res.status(201).json({ message: "new action is posted successfully", data: action });
            }
        }  else {
            return res.status(404).json({ message: `The project with the specified ID ${req.params.id} does not exist.` });
        }
    } catch(error) {
        res.status(500).json({ error: "There was an error while saving the action to the database" });
    }
  })

export default actionRoutes;