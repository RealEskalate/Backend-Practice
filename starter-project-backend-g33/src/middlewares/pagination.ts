// cursor based pagination
export const paginationOffset = (req, res, next) => {
  const { page, limit } = req.query
  const offset = (page - 1) * limit
  req.query.offset = offset
  req.query.limit = limit
  next()
}

// pagination based on cursor
export const paginationCursor = (req, res, next) => {
  const { cursor, limit } = req.query
  const offset = cursor
  req.query.offset = offset
  req.query.limit = limit
  next()
}
