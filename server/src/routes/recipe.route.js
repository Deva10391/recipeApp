import express from "express";
import { createOne, getAll, getSaved, getSavedId, saveOne } from "../controllers/recipe.controller.js";
import { verifiedToken } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/', getAll);
router.post('/', verifiedToken, createOne);
router.put('/', verifiedToken, saveOne);//
router.get('/savedRecipes/ids/:userID', verifiedToken, getSavedId);//
router.get('/savedRecipes/:userID', verifiedToken, getSaved);//

export { router as recipeRouter }