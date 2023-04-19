const authMiddleware = require('../middlewares/authMiddleware')
const verifyMiddleware = require('../middlewares/verifyMiddleware')
const uploadMiddleware = require('../middlewares/uploadMiddleware')

module.exports = {
    authMiddleware,
    verifyMiddleware,
    uploadMiddleware,
}