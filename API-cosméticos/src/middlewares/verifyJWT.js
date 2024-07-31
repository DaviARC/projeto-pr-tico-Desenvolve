import jwt, { decode } from "jsonwebtoken";

function verifyJWT(req, res, next){
    const token = req.headers.authorization;
    jwt.verify(token, `${process.env.SECRET}`, (err, decoded) => {
        if(err) return res.status(400).send({message: "Acesso negado"}).end();

        req.userId = decoded.userId
        next();
    })
}

export default verifyJWT;