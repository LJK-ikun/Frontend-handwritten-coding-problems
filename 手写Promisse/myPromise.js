class MyPromise {
    constructor(callback) {
        this.status = "pending"
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallback = []
        this.onRejectedCallback = []

        const resolve = value => {
            if (value instanceof MyPromise) {
              return value.then(resolve, reject)
            }
            if (this.status === "pending") {
              this.status = "resolved"
              this.value = value
              this.onResolvedCallback.forEach(fn => fn())
            }
          }

          const reject = reason => {
            if (this.status === "pending") {
              this.status = "rejected"
              this.reason = reason
              this.onRejectedCallback.forEach(fn => fn())
            }
          }
          try {
            callback(resolve, reject)
          } catch (error) {
            reject(error)
          }
        }
        then(onResolved, onRejected) {
            onResolved = typeof onResolved === "function" ? onResolved : value => value
            onRejected =
              typeof onRejected === "function"
                ? onRejected
                : reason => {
                    throw reason
                  }
            const promise2 = new MyPromise((resolve, reject) => {
              if (this.status === "resolved") {
                try {
                  const x = onResolved(this.value)
                  resolve(x)
                } catch (error) {
                  reject(error)
                }
              } else if (this.status === "rejected") {
                try {
                  const x = onRejected(this.reason)
                  resolve(x)
                } catch (error) {
                  reject(error)
                }
              }
              if (this.status === "pending") {
                this.onResolvedCallback.push(() => {
                  try {
                    const x = onResolved(this.value)
                    resolve(x)
                  } catch (error) {
                    reject(error)
                  }
                })
                this.onRejectedCallback.push(() => {
                  try {
                    const x = onRejected(this.reason)
                    resolve(x)
                  } catch (error) {
                    reject(error)
                  }
                })
              } else {
                this.onResolvedCallback = []
                this.onRejectedCallback = []
              }
            })
            return promise2
          }
}