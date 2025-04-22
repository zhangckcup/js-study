# WebSocket、Web Worker和SSE技术总结

## WebSocket

### 简介
WebSocket是一种在单个TCP连接上进行全双工通信的协议，允许服务器主动向客户端推送数据。

### 使用场景
- 实时聊天应用
- 多人协作编辑
- 实时游戏

### 代码示例
```javascript
// websocket-server.js
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
```

## Server-Sent Events (SSE)

### 简介
SSE是一种服务器向客户端推送数据的单向通信技术，基于HTTP协议。

### 使用场景
- 实时通知
- 新闻推送
- 股票行情更新

### 代码示例
```javascript
// server.js
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
```

## Web Worker

### 简介
Web Worker允许在后台线程中运行JavaScript代码，不会阻塞主线程。

### 使用场景
- 复杂计算
- 大数据处理
- 图像处理

### 代码示例
```javascript
// worker.js
self.onmessage = function(e) {
  console.log('Message received from main script');
  const result = e.data * 2;
  console.log('Posting message back to main script');
  postMessage(result);
};
```

## 技术比较

| 特性        | WebSocket       | SSE          | Web Worker   |
|-------------|----------------|--------------|--------------|
| 通信方向    | 全双工          | 单向(服务器到客户端) | 单向(主线程到工作线程) |
| 协议        | 独立协议        | HTTP         | -            |
| 连接        | 持久连接        | 持久连接      | 独立线程     |
| 适用场景    | 实时交互        | 服务器推送    | 后台计算     |