import express from 'express';
import jwt from 'jsonwebtoken';
import usuarios from '../models/usuario.js'

const router = express.Router();

router.post("/login", async(req,res)=>{
    const { loginB, passwordB } = req.body;

    const usuariosResultado = usuarios.find([
        {
            login: loginB,
            password: passwordB,
        }
    ]);

    if(usuariosResultado.length !== 0){
        const token = jwt.sign({userId: response.rows[0].cd_cliente}, `${process.env.SECRET}`,
        {expiresIn: 3600})
        return res.json({auth:true, token})
    }
    res.status(401).send({message: "Usuário não autorizado"}).end();        
})

export default router