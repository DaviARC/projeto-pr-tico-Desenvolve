import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    login: {
        type: String,
        required: [true, "O nome do produto é obrigatório"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "O nome do produto é obrigatório"],
    },
}, { versionKey: false })

const usuarios = mongoose.model("usuarios", usuarioSchema);

export default usuarios