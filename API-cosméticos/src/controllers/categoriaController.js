import categorias from "../models/Categoria.js";
import { v4 as uuidv4 } from 'uuid';

class CategoriaController {
    static listarCategorias = async (req, res, next) => {
        try{
            const categoriasResultado = await categorias.find();
            
            res.status(200).json(categoriasResultado);
        } catch (e) {
            console.log(e)
        }
    }

    static listarCategoriaPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const categoriaResultado = await categorias.findById(id);

            res.status(200).json(categoriaResultado);
        } catch (error) {
            console.log(error)
        }
    }

    static cadastrarCategoria = async (req, res, next) => {
        let categoria = new categorias(req.body);

        const categoriaResultado = await categoria.save();
        res.status(201).send(categoriaResultado.toJSON())
    }

    static atualizarCategoria = async (req, res, next) => {
        try {
            const id = req.params.id;
            const categoriaResultado = await categorias.findById(id);

            if(categoriaResultado){
                await categorias.findByIdAndUpdate(id, {$set: req.body});
                res.status(200).send({message: "Categoria atualizado com sucesso"});
            } else {
                res.status(401).send({message: "O id do categoria não localizado"})
            }

        } catch (error) {
            console.log(error)
        }
    }
    static excluirCategoria = async (req, res, next) => {
        try {
            const id = req.params.id;
            const categoriaResultado = await categorias.findById(id);

            if(categoriaResultado){
                await categorias.findByIdAndDelete(id);
                res.status(200).send({message: "Categoria removida com sucesso"});
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export default CategoriaController;