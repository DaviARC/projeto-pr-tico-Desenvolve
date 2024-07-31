import mongoose from "mongoose";

const produtoSchema = mongoose.Schema({
    id: {type: String},
    nome: {
        type: String,
        required: [true, "O nome do produto é obrigatório"]
    },
    preco: {
        type: Number 
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorias",
        required: [true, "A categoria é obrigatória"]
    },
    img: {
        type: String
    }
})

const produtos = mongoose.model("produtos", produtoSchema);

export default produtos