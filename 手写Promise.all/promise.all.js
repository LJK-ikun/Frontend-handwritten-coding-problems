function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        if (!Array.isArray(promises)) {
            return reject(new TypeError("参数必须是数组"));
        }

        const result = [];
        let completed = 0;

        // 如果数组为空，直接 resolve 空数组
        if (promises.length === 0) {
            return resolve([]);
        }

        promises.forEach((p, index) => {
            // 如果不是 Promise，就包装成 Promise
            Promise.resolve(p)
                .then(value => {
                    result[index] = value; // 按顺序保存结果
                    completed += 1;
                    if (completed === promises.length) {
                        resolve(result); // 全部完成
                    }
                })
                .catch(err => {
                    reject(err); // 一旦有失败，立即 reject
                });
        });
    });
}