function myNew(Constructor, ...args) {
    // 1. 创建一个新对象
    const obj = {};

    // 2. 设置原型链
    Object.setPrototypeOf(obj, Constructor.prototype); 
    // 或者： obj.__proto__ = Constructor.prototype;

    // 3. 执行构造函数
    const result = Constructor.apply(obj, args);

    // 4. 如果返回值是对象，返回它，否则返回新对象
    return (result !== null && (typeof result === "object" || typeof result === "function")) ? result : obj;
}