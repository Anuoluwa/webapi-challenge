import express from 'express';
import Action from '../data/helpers/actionModel';

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


export default actionRoutes;