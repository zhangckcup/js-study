# 变更日志

## 2025-04-24

### 新增功能

- 实现了基于Shared Worker的跨页面通信功能
  - 多个页面可以共享同一个Worker实例
  - 支持广播消息到所有连接的客户端
  - 实时显示当前连接数

### 代码修改

```javascript:/Users/zhangcankun/Documents/study/js/webWorker/shared-worker.js
// Shared Worker脚本
let connections = 0;
const ports = [];

onconnect = function(e) {
    const port = e.ports[0];
    connections++;
    ports.push(port);
    
    port.onmessage = function(e) {
        const num = e.data;
        const result = num * num;
        
        // 广播消息给所有连接的客户端
        ports.forEach(p => {
            p.postMessage(`页面${ports.indexOf(p)+1}计算结果: ${result}`);
        });
    };
    
    // 通知所有客户端当前连接数
    ports.forEach(p => {
        p.postMessage(`已连接客户端数: ${connections}`);
    });
};
```

### 新增文件

- shared-worker-page2.html: 第二个测试页面
- shared-worker.html: 主测试页面
  