
const capture =  (callback) => {
    return async (req, res) => {
        try {
        await callback(req, res);
        } catch (error) {
        res.status(500).json(error.message);
        }
       
}};

module.exports = capture


