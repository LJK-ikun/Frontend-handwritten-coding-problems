class EventEmitter {
    constructor() {
        // 用对象存储事件，每个事件对应一个回调数组
        this.events = {};
    }

    // 订阅事件
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    // 只订阅一次
    once(event, callback) {
        const wrapper = (...args) => {
            callback(...args);       // 执行原回调
            this.off(event, wrapper); // 执行一次后取消订阅
        };
        this.on(event, wrapper);
    }

    // 取消订阅
    off(event, callback) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(fn => fn !== callback);
    }

    // 触发事件
    emit(event, ...args) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(...args));
    }
}