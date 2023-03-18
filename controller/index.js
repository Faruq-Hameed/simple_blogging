const {paginate, paginationError} = require('./paginate')
const {doesNameOrEmailAlreadyExit} = require('./errors')

module.exports = {paginate, paginationError,doesNameOrEmailAlreadyExit}