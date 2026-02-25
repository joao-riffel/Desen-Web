    const express = require('express');

    const app = express();

    const usuarios = [];

    const PORT = 3000;

    app.use(express.json());

    app.get('/usuarios', (req, res) => {
        res.json(usuarios);
       });   

    app.post('/usuarios', (req, res) => {

        const usuario = req.body;
    
        usuarios.push(usuario);
    
        res.status(201).json(usuario);
    
    });

    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

