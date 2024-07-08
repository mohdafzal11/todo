import mongoose , {Schema} from "mongoose";


const todoSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    deadline: { type: Date },
    reminder: { type: Date } ,
    completed: { type: Boolean, default: false },
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
