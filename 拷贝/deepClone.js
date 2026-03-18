function deepClone(obj, cache = new WeakMap()) {
    if (cache.has(obj)) return cache.get(obj)
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags)
    }
    if (obj instanceof Date) {
        return new Date(obj)
    }
    if (obj instanceof Map) {
        const result = new Map();
        cache.set(obj, result);
        obj.forEach((v, k) => {
            result.set(deepClone(k, cache), deepClone(v, cache));
        });
        return result;
    }
    if (obj instanceof Set) {
        const result = new Set();
        cache.set(obj, result);
        obj.forEach(v => {
            result.add(deepClone(v, cache));
        });
        return result;
    }
    // 处理数组和普通对象
    const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, clone);

    // 处理普通属性
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            clone[key] = deepClone(obj[key], cache);
        }
    }

    return clone
}