// Web Worker脚本
self.onmessage = function(e) {
    const num = e.data;
    let sum = 0;
    
    // 模拟耗时计算
    for (let i = 1; i <= num; i++) {
        sum += i;
    }
    
    // 将结果发送回主线程
    self.postMessage(sum);
};