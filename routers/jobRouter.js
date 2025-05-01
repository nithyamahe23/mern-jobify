import { Router } from "express";

const router = Router();

//import all controllers
//use .js extension here
import {getAllJobs, createJob, getJob, updateJob, deleteJob, showStats} from '../controllers/jobController.js'
import { validateJobInput, validataJobIdParam } from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";


//there are 2 approaches to set up route
//Approach 1
// router.get('/', getAllJobs);    // '/' indicates base URL
// router.post('/', createJob);

//Approach 2
//To the same route we can use get and post together
router.route('/').get(getAllJobs).post(checkForTestUser, validateJobInput, createJob);

//for stats
router.route('/stats').get(showStats);

router.route('/:id').get(validataJobIdParam, getJob).patch(checkForTestUser, validateJobInput,validataJobIdParam, updateJob).delete(checkForTestUser, validataJobIdParam, deleteJob);



//export the router instance
export default router;