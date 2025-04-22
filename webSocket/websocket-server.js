const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    
    // 广播消息给所有客户端
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server: ${message}`);
      }
    });
  });
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on ws://localhost:8080');