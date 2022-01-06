const express = require('express');
const app = express();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { eAdmin } = require('./middlewares/auth');

app.use(express.json());

app.get('/', eAdmin, async (req, res) => {
    return res.json({
        erro: false,
        mensagem: "Listar usuários",
        id_usuario_logado: req.userId
    });
});

app.post('/cadastrar', async (req, res) => {
    
    const password = await bcrypt.hash("123456", 8);

    console.log(password);

    return res.json({
        erro: false,
        mensagem: "Cadastrar usuário"
    });
});

app.post('/login', async (req, res) => {
    console.log(req.body);

    if(req.body.email != "cesar@celke.com.br"){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! --- email incorreto!"
        });
    }

    if(!(await bcrypt.compare(req.body.password,  /* colocar aqui o token gerado */   ))){
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Usuário ou a senha incorreta! --- senha incorreta!"
        });
    }

    var token = jwt.sign({id: 3}, "OP561OPIO5P1IO61PF6D16D8F4G8DT4JMH818M61B81U1K3", {
        expiresIn: '1d' // token expira em 1 dia
    });

    return res.json({
        erro: false,
        mensagem: "Login realizado com sucesso!",
        token
    });
});

app.listen(8080, () => {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});