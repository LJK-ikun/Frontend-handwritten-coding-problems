function throttle(fn, delay) {
    let prev = 0

    return function(...args) {
        let curr = Date.now()
        if ( curr - prev >= delay ) {
            fn.apply(this, args)
            prev = curr
        }
    }
}