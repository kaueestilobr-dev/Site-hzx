const express = require('express');
const path = require('path');
const app = express();

// Serve os arquivos do seu site
app.use(express.static(__dirname));

// Rota principal (Home)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota do Painel
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// Rota de login Discord (O erro sumirá ao usar esta rota)
app.get('/auth/discord', (req, res) => {
    // Aqui você redirecionará para a API do Discord futuramente
    res.send('Sistema de login conectado. Próximo passo: configurar Passport.js.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
