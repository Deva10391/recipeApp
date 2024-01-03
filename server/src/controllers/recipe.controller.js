import { RecipeModel } from "../models/recipe.model.js";
import { UserModel } from '../models/user.model.js';

export const getAll = async (req, res) => {
    try {
        const allRecipes = await RecipeModel.find({});
        res.json(allRecipes);
    } catch (err) {
        res.json(err);
    }
}

export const createOne = async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch (err) {
        res.json(err);
    }
}

export const saveOne = async (req, res) => {
    console.log(req.body)
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({ savedRecipes: user.savedRecipes });
    } catch (err) {
        console.error(err);
        res.json(err);
    }
}

export const getSavedId = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        res.json({ savedRecipes: user?.savedRecipes })
    } catch (err) {
        res.json(err);
    }
}

export const getSaved = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userID);
        const savedRecipes = await RecipeModel.find({
            _id: { $in: user.savedRecipes },
        });
        res.json({ savedRecipes })
    } catch (err) {
        res.json(err);
    }
}