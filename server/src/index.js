import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { userRouter } from './routes/user.route.js';
import { recipeRouter } from './routes/recipe.route.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', userRouter);
app.use('/recipe', recipeRouter);

const port = 3001;
app.listen(port, () => {
    console.log(`activated on: ${port}`);
});

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected')
    })
    .catch((err) => {
        console.error(err);
    });