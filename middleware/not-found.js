module.exports = (req, res) => {
    console.log('NotFound route')
    return res.status(404).send('Route dose not exits')
}