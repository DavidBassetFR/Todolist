const tryCAtch = (query) => {
    try {
        query()
        res.json(callback())
    }catch (error) {
        console.trace('cc')
        res.json(error)
    }
}

module.exports = tryCatch