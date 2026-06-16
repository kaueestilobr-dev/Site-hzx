const axios = require('axios');

app.post('/api/enviar-discord', async (req, res) => {
    // A URL que você copiou do Discord
    const WEBHOOK_URL = 'https://discord.com/api/webhooks/1516328791734095942/5YwTinFY9vHJ5FtyWuIXog6ZKHo-rfjRjJM5Ka-WD45zZbSYkGCYN5t_8MmqRFZiXNWc'; 
    
    const { title, description, color, author, footer, image } = req.body;

    try {
        await axios.post(WEBHOOK_URL, {
            embeds: [{
                author: { name: author || 'HzX Vision' },
                title: title || 'Sem título',
                description: description || 'Sem descrição',
                color: parseInt(color.replace('#', ''), 16),
                footer: { text: footer || 'HzX Vision' },
                image: image ? { url: image } : null
            }]
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Erro ao enviar webhook:', error.message);
        res.status(500).json({ success: false, message: 'Erro ao enviar para o Discord' });
    }
});
