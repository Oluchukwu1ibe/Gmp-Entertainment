import express from 'express';
import { createContestant, getAllContestants, getContestantByIdOrName } from '../controller/contestantController.js';
import upload from "../utils/multer.js";

const router = express.Router();

router.post('/addContestant',upload.array('image',1),createContestant);
router.get('/contestants',getAllContestants);
router.get('/contestants/:idOrName', getContestantByIdOrName);


export default router;