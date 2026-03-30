function getType(value) {
    if (value === null) {
        return 'null'
    }
    if (value === undefined) {
        return 'undefined'
    }
    if (typeof value === 'object') {
        return Object.prototype.toString.call.call(value).slice(8, -1).toLowerCase()
    } else {
        return typeof value
    }
}