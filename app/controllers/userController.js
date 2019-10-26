const UserModel = require('../models/user');
const bcrypt = require('bcrypt');
const tokenHelper = require('../helpers/token');
const moment = require('moment');
const userController = {

    signUp: async (req, res) => {
        const {email} = req.body;
        try{
            if(await UserModel.findOne({ email })){
                return res.status(400).send({error: 'E-mail já existente!'});
            }
            const user = await UserModel.create(req.body);
            user.password = undefined;
            return res.status(200).send({
                id: user._id,
                data_criacao: user.createdAt,
                data_atualizacao: user.updatedAt,
                ultimo_login: user.lastLogin,
                token: tokenHelper.generateToken({id: user.id}) 
            });
        }catch(err){
            return res.status(400).send({error: "Falha ao se registrar, tente novamente mais tarde!"});
        }
    },
    signIn: async (req, res) => {
        const {email, password } = req.body;

        const user = await UserModel.findOne({ email }).select('+password');
        if (!user)
            return res.status(400).send({error: 'Usuário não encontrado'});
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error: "Usuário e/ou senha inválidos!"});

        await UserModel.updateOne({email : email}, {$set: {lastLogin : Date.now()}});
        user.password = undefined;
        
        return res.status(200).send({
            id: user._id,
            data_criacao: user.createdAt,
            data_atualizacao: user.updatedAt,
            ultimo_login: user.lastLogin,
            token: tokenHelper.generateToken({id: user.id}) 
        });
    },
    search: async (req, res) => {
        try{
            const user = await UserModel.findOne({'_id': req.userId});


            return res.status(200).send({user});

        }catch(err){
            return res.status(400).send({err});
        }
        
    }
};

module.exports = userController;