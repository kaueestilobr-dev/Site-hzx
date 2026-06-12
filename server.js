const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-discord').Strategy;
const path = require('path');

const app = express();

// CONFIGURAÇÃO DO DISCORD
const CLIENT_ID = '1514845956020113408';
const CLIENT_SECRET = '-sebk_0XyoJ6SskrwQDg0JWVVC0SAbQ1';
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

app.use(session({ secret: 'segredo', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// ROTAS
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/auth/discord', passport.authenticate('discord'));

app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), (req, res) => res.redirect('/dashboard'));

app.get('/dashboard', (req, res) => {
    if (!req.isAuthenticated()) return res.redirect('/');
    res.sendFile(path.join(__dirname, 'dashboard.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
