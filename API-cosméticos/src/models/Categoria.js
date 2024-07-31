import mongoose from "mongoose";

const categoriaSchema = new mongoose.Schema({
    id: {type: String},
    nome: 
    {
        type: String,
        required: [true, "O titulo da categoria é obrigátorio"]
    }
})

const categorias = mongoose.model("categorias", categoriaSchema);

export default categorias;