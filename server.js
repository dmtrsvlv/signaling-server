const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', ws => {
    console.log('Пользователь подключён');
    ws.on('message', message => {
        try {
            const data = JSON.parse(message);
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data));
                }
            });
        } catch (error) {
            console.error('Ошибка обработки сообщения:', error);
        }
    });
    ws.on('close', () => console.log('Пользователь отключён'));
});

console.log('Сигнальный сервер запущен на порту 8080');