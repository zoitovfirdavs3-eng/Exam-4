const { globalError, ClientError } = require("shokhijakhon-error-handler");
const readDb = require("../utils/readFile");
const writeDb = require("../utils/writeFile");
const jwtService = require("../lib/jwt.service");
const bcrypt = require("bcrypt");

module.exports = {
    async REGISTER(req, res){
        try{
            let newUser = req.body;
            let users = await readDb("users");
            
            let checkUser = users.some(user => user.email == newUser.email);
            if(checkUser) throw new ClientError("User already exists", 400);

            newUser.password = await bcrypt.hash(newUser.password, 10);
            newUser = {
                id: users.length ? users.at(-1).id + 1 : 1,
                ...newUser,
                createdAt: new Date().toLocaleString(),
                updatedAt: null,
            };

            users.push(newUser);
            await writeDb("users", users);

            let accessToken = jwtService.createToken({user_id: newUser.id})

            return res.status(201).json({message: "User successfully registered", status: 201, accessToken});
        }catch(err){
            return globalError(err, res);
        }
    },
    async LOGIN(req, res){
        try{
            let user = req.body;
            
            let users = await readDb("users");
            
            const findUser = users.find(u => u.email == user.email);

            if(!findUser) throw new ClientError(`User not found`, 404);

            let checkUserPassword = await bcrypt.compare(user.password, findUser.password);
            
            if(!checkUserPassword) throw new ClientError(`User not found`, 404);

            let accessToken = jwtService.createToken({user_id: findUser.id})

            return res.json({message: "User successfully logged in", status: 201, accessToken});
        }catch(err){
            return globalError(err, res);
        }
    },
}