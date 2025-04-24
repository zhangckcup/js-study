// Shared Worker脚本
let connections = 0;
const ports = [];

onconnect = function(e) {
    const port = e.ports[0];
    connections++;
    ports.push(port);
    
    port.onmessage = function(e) {
        const num = e.data;
        const result = num * num; // 计算平方
        
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