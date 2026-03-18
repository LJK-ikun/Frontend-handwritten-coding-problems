function debounce(fn, delay = 300) {
    let timer = null;
    let called = false; // 标记第一次是否执行过

    const debounced = function(...args) {
        const context = this;

        // 第一次立即执行
        if (!called) {
            fn.apply(context, args);
            called = true;
            return;
        }

        // 清理旧定时器
        if (timer) clearTimeout(timer);

        // 延迟执行
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay);
    };

    // 手动取消
    debounced.cancel = () => {
        if (timer) clearTimeout(timer);
        timer = null;
        called = false; // 重置第一次标记
    };

    return debounced;
}