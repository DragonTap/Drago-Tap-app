const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let players = {}; // Хранилище игроков

// Обновление данных игрока
app.post('/update', (req, res) => {
    const { username, score, level } = req.body;

    if (!username) return res.status(400).send({ error: 'Username required' });

    if (!players[username]) {
        players[username] = { score: 0, level: 1 };
    }

    players[username].score = score;
    players[username].level = level;

    res.send({ success: true });
});

// Получение рейтинга
app.get('/rating', (req, res) => {
    const sortedPlayers = Object.entries(players)
        .sort(([, a], [, b]) => b.score - a.score)
        .map(([username, { score, level }]) => ({ username, score, level }));

    res.send(sortedPlayers);
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
