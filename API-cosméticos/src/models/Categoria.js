import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    nome: 
    {
        type: String,
        required: [true, "O titulo da categoria é obrigátorio"]
    }
}, { versionKey: false })

const categorias = mongoose.model("categorias", categoriaSchema);

export default categorias;