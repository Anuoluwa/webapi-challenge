import express from 'express';
import actionRoutes from './actionRoutes';
import projectRoutes from './projectRoutes';

const route = express.Router();


route.use('/actions', actionRoutes);
route.use('/projects', projectRoutes);


export default route;