const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  // 发送初始事件
  res.write('event: connected\ndata: Connection established\n\n');

  // 每2秒发送一个事件
  const intervalId = setInterval(() => {
    const time = new Date().toISOString();
    res.write(`data: ${time}\n\n`);
  }, 2000);

  // 客户端断开连接时清理
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});