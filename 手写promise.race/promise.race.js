function myPromiseRace(promises) {
    if (!Array.isArray(promises)) promises = Array.from(promises)
    return new Promise((resolve, reject) => {
        promises.forEach(element => {
            Promise.resolve(element).then(
                res => resolve(res),
                err => reject(err)
            )
        });
    })
}