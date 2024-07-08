import Todo from "../models/todo.js"

export const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create({ ...req.body, userId: req.user._id });
        res.status(201).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const  getTodos = async (req, res) => {
    console.log("hello")
    try {
        // const cachedTodos = await redisClient.get(`todos:${req.user._id}`);
        // if (cachedTodos) {
        //     return res.status(200).json(JSON.parse(cachedTodos));
        // }
        const todos = await Todo.find({ userId: req.user._id });
        // await redisClient.set(`todos:${req.user._id}`, JSON.stringify(todos), 'EX', 3600);
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const  updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        // await redisClient.del(`todos:${req.user._id}`);
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const  deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        // await redisClient.del(`todos:${req.user._id}`);
        res.status(204).send();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};