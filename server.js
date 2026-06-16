const express = require('express');
const axios = require('axios'); // Adicionado
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const path = require('path');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Importante: Isso permite que o servidor leia dados em formato JSON vindos do seu painel
app.use(express.json()); 
app.use(express.static(__dirname));

// CONFIGURAÇÃO DO DISCORD
const CLIENT_ID = process.env.CLIENT_ID || '1514845956020113408';
const CLIENT_SECRET = process.env.CLIENT_SECRET || '-sebk_0XyoJ6SskrwQDg0JWVVC0SAbQ1';
const CALLBACK_URL = 'https://site-hzx.onrender.com/auth/discord/callback';

passport.use(new Strategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: ['identify']
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(session({ 
    secret: 'segredo-hzx', 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

// SOCKET.IO
io.on('connection', (socket) => {
    console.log('Painel conectado via Socket');
});

// --- NOVA ROTA DE ENVIO PARA O DISCORD ---
app.post('/api/enviar-discord', async (req, res) => {
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1516328791734095942/5YwTinFY9vHJ5FtyWuIXog6ZKHo-rfjRjJM5Ka-WD45zZbSYkGCYN5t_8MmqRFZiXNWc'; 
    
    const { title, description, color, author, footer, image } = req.body;

    try {
        await axios.post(WEBHOOK_URL, {
            embeds: [{
                author: { name: author || 'HzX Vision' },
                title: title || 'Sem título',
                description: description || 'Sem descrição',
                color: color ? parseInt(color.replace('#',''), 16) : 0,
                footer: { text: footer || 'HzX Vision' },
                image: image ? { url: image } : null
            }]
        });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao enviar' });
    }
});

// ROTAS
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', { failureRedirect: '/' }), (req, res) => res.redirect('/dashboard'));
app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
