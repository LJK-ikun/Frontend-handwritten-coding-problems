function flat(arr, depth = Infinity) {
    // 使用reduce遍历数组，acc是累加器（最终返回的扁平化数组），cur是当前遍历元素
    return arr.reduce((acc, cur) => {
        // 判断：当前元素是数组 且 扁平化深度>0
        if (Array.isArray(cur) && depth > 0) {
            // 递归扁平化当前数组，深度减1，并展开结果添加到累加器
            return [...acc, ...flat(cur, depth - 1)];
        } else {
            // 非数组/深度耗尽，直接添加当前元素到累加器
            return [...acc, cur];
        }
    }, []); // 初始值为空数组
}