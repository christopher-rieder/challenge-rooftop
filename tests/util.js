function statistics(obj, prop, value) {
    if (!obj || !prop || !value) {
        return //skip
    }
    if (obj[prop + '_avg']) {
        obj[prop + '_avg'] = (obj[prop + '_avg'] + value) / 2
        obj[prop + '_max'] = Math.max(obj[prop + '_max'], value)
        obj[prop + '_min'] = Math.min(obj[prop + '_min'], value)
    } else {
        obj[prop + '_avg'] = value
        obj[prop + '_max'] = value
        obj[prop + '_min'] = value
    }
}

module.exports = {
    statistics
}