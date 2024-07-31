import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    id: {type: String},
    login: {
        type: String,
        required: [true, "O nome do produto é obrigatório"]
    },
    password: {
        type: String,
        required: [true, "O nome do produto é obrigatório"],
        unique: true,
    },
})

const usuarios = mongoose.model("usuarios", usuarioSchema);

export default usuarios