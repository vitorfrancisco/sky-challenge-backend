require('dotenv').config();
const jwt = require('jsonwebtoken');
const token = {
    generateToken: (params = {}) => {
        return jwt.sign(params, process.env.SECRET, {
            expiresIn: 432700
        });
    },
    validateToken: (req, res , next) => {
        const authHeader  = req.headers.authorization;

        if(!authHeader)
            return res.status(401).send({error: 'Não autorizado'});
        
        const parts = authHeader.split(' ');

        if(!parts.length === 2)
            return res.status(401).send({error: 'Não autorizado'});
        
        const [scheme, token] = parts;

        if(!/^Bearer$/i.test(scheme))
            return res.status(401).send({error: 'Não autorizado'});
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err)
                return res.status(401).send({error: "Não autorizado"});

            req.userId = decoded.id;
            return next();
        });

        
    }
}

module.exports = token;