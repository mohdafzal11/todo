
import express from 'express';
import {createTodo , getTodos , updateTodo , deleteTodo} from "../controllers/todoController.js"
import auth  from '../middleware/auth.js';


const router = express.Router();


router.post('/', auth, createTodo);
router.get('/', auth, getTodos);
router.patch('/:id', auth, updateTodo);
router.delete('/:id', auth,deleteTodo);

export {router as todoRouter}