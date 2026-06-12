const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname)); // Seus arquivos HTML/CSS devem ficar em uma pasta chamada 'public'

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Painel HZX Vision rodando na porta ${PORT}`);
});
