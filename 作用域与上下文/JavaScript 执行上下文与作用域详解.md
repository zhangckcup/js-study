# JavaScript 执行上下文与作用域详解

## 1. 执行上下文 (Execution Context)

执行上下文是JavaScript代码执行时的环境，包含以下三种类型：
- 全局执行上下文
- 函数执行上下文
- eval执行上下文

### 1.1 创建阶段
执行上下文的创建包括：
1. 创建变量对象(VO)
2. 建立作用域链
3. 确定this指向

## 2. 作用域 (Scope)

### 2.1 作用域类型
- 全局作用域
- 函数作用域
- 块级作用域(ES6 let/const)

```javascript
// 示例：不同作用域
var globalVar = 'global'; // 全局作用域

function scopeDemo() {
    var functionVar = 'function'; // 函数作用域
    
    if(true) {
        let blockVar = 'block'; // 块级作用域
        console.log(blockVar); // 可访问
    }
    // console.log(blockVar); // 报错
}
```

## 3. 作用域链 (Scope Chain)

作用域链决定了变量的可访问性，查找顺序为：
1. 当前作用域
2. 外层作用域
3. 直到全局作用域

```javascript
// 示例：作用域链
var outer = 'outer';

function outerFunc() {
    var middle = 'middle';
    
    function innerFunc() {
        var inner = 'inner';
        console.log(outer); // 通过作用域链访问
    }
    
    innerFunc();
}
```

## 4. 闭包 (Closure)

闭包是函数和其词法环境的组合，允许函数访问其词法作用域外的变量。

```javascript
// 示例：闭包
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        console.log(count);
    }
}

const counter = createCounter();
counter(); // 1
counter(); // 2
```

## 5. 变量提升 (Hoisting)

JavaScript引擎会在执行前将变量和函数声明提升到作用域顶部。

```javascript
// 示例：变量提升
console.log(hoistedVar); // undefined
var hoistedVar = 'value';

hoistedFunc(); // "函数已执行"
function hoistedFunc() {
    console.log("函数已执行");
}
```

## 6. this指向

this的指向取决于函数的调用方式：
- 默认绑定：全局对象(非严格模式)或undefined(严格模式)
- 隐式绑定：调用上下文对象
- 显式绑定：call/apply/bind
- new绑定：新创建的对象

```javascript
// 示例：this指向
const obj = {
    name: 'Object',
    logName: function() {
        console.log(this.name);
    }
};

obj.logName(); // "Object" (隐式绑定)
const log = obj.logName;
log(); // undefined (默认绑定)
```

## 7. 练习题目

1. 分析以下代码的输出结果：
```javascript
var a = 1;
function foo() {
    console.log(a);
    var a = 2;
}
foo();
```

2. 实现一个闭包函数，每次调用返回递增的数字

3. 解释以下代码中this的指向：
```javascript
const obj = {
    name: 'obj',
    log: function() {
        console.log(this.name);
    }
};
const log = obj.log;
log();
```

## 8. 总结

- 执行上下文是代码执行的环境
- 作用域决定了变量的可访问范围
- 作用域链实现了变量的层级查找
- 闭包可以保留对外部变量的引用
- 变量提升是JavaScript的编译特性
- this指向由调用方式决定
