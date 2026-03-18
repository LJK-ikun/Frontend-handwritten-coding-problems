function curry(fn) {
    return function curried(...args){
        if (fn.length <= args.length) {
            fn.apply(this, args)
        } else {
            return function (...rest) {
                return curried(...args, ...rest)
            }
        }
    }
}