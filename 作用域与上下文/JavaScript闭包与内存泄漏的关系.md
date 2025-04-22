# JavaScript闭包与内存泄漏的关系

## 1. 闭包的基本概念

闭包(Closure)是指有权访问另一个函数作用域中变量的函数。在JavaScript中，闭包通常表现为内部函数访问外部函数的变量。

```javascript
function outer() {
    var outerVar = '外部变量';
    
    function inner() {
        console.log(outerVar); // 访问外部函数变量
    }
    
    return inner;
}

var closure = outer();
closure(); // 输出"外部变量"
```

## 2. 闭包导致内存泄漏的机制

### 2.1 引用保留
闭包会保留对外部函数变量的引用，即使外部函数已经执行完毕。如果这些变量引用着DOM元素或大型对象，就会阻止垃圾回收机制(GC)回收这些内存。

```javascript
function leakMemory() {
    var bigObject = new Array(1000000).fill('data');
    var element = document.getElementById('hugeElement');
    
    return function() {
        console.log(bigObject.length);
        // 即使不再需要，element仍被保留
    };
}
```

### 2.2 常见场景
1. **事件监听器**：未正确移除的闭包事件处理器
2. **定时器**：setInterval/setTimeout中的闭包
3. **缓存实现**：不当的缓存策略

## 3. 如何避免内存泄漏

### 3.1 显式释放引用
```javascript
function safeClosure() {
    var resource = acquireResource();
    
    function inner() {
        // 使用resource
    }
    
    // 提供清理方法
    inner.cleanup = function() {
        resource = null;
    };
    
    return inner;
}
```

### 3.2 使用弱引用(ES6+)
```javascript
const weakMap = new WeakMap();

function safeCache() {
    const bigData = new Array(1000000).fill('data');
    weakMap.set(this, bigData); // 弱引用，不影响GC
}
```

### 3.3 事件监听器最佳实践
```javascript
function setupListener() {
    var element = document.getElementById('myButton');
    
    function onClick() {
        console.log('Clicked');
    }
    
    element.addEventListener('click', onClick);
    
    // 提供移除方法
    return function() {
        element.removeEventListener('click', onClick);
        element = null;
    };
}
```

## 4. 检测内存泄漏

1. **Chrome DevTools Memory面板**：
   - 使用Heap Snapshot比较内存变化
   - 使用Allocation Timeline记录内存分配

2. **Node.js检测**：
   ```bash
   node --expose-gc --inspect yourScript.js
   ```
   然后使用Chrome DevTools连接检测

## 5. 总结

| 要点 | 说明 |
|------|------|
| 闭包本质 | 内部函数访问外部作用域变量 |
| 泄漏原因 | 意外保留对大型对象/DOM的引用 |
| 预防措施 | 显式释放引用、使用弱引用、正确清理事件监听 |
| 检测工具 | Chrome DevTools、Node.js内存分析 |

正确使用闭包不会必然导致内存泄漏，关键在于管理好闭包引用的资源生命周期。
