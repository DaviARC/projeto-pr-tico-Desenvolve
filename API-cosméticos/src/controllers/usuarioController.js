import usuarios from "../models/usuario.js";
import { v4 as uuidv4 } from 'uuid';

class UsuarioController {
    static listarUsuarios = async (req, res, next) => {
        try{
            const usuariosResultado = await usuarios.find();
            
            res.status(200).json(usuariosResultado);
        } catch (e) {
            console.log(e)
        }
    }

    static listarUsuarioPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const usuarioResultado = await usuarios.findById(id);

            res.status(200).json(usuarioResultado);
        } catch (error) {
            console.log(error)
        }
    }

    static cadastrarUsuario = async (req, res, next) => {
        let usuario = new usuarios(req.body);

        const usuarioResultado = await usuario.save();
        res.status(201).send(usuarioResultado.toJSON())
    }

    static atualizarUsuario = async (req, res, next) => {
        try {
            const id = req.params.id;
            const usuarioResultado = await usuarios.findById(id);

            if(usuarioResultado){
                await usuarios.findByIdAndUpdate(id, {$set: req.body});
                res.status(200).send({message: "usuario atualizado com sucesso"});
            } else {
                res.status(401).send({message: "O id do usuario não localizado"})
            }

        } catch (error) {
            console.log(error)
        }
    }
    static excluirUsuario = async (req, res, next) => {
        try {
            const id = req.params.id;
            const usuarioResultado = await usuarios.findById(id);

            if(usuarioResultado){
                await usuarios.findByIdAndDelete(id);
                res.status(200).send({message: "usuario removida com sucesso"});
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export default UsuarioController;