import mongoose from "mongoose";

const produtoSchema = mongoose.Schema({
    nome: {
        type: String,
        required: [true, "O nome do produto é obrigatório"],
        unique: [true, "Já existe um produto com esse nome"]
    },
    preco: {
        type: Number ,
        required: [true, "O preço do produto é obrigatório"]
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categorias",
        required: [true, "A categoria é obrigatória"]
    },
    img: {
        type: String
    }
}, { versionKey: false })

const produtos = mongoose.model("produtos", produtoSchema);

export default produtos