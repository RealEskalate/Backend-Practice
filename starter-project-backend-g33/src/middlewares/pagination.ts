// cursor based pagination
export const paginationOffset = (req, res, next) => {
  const { page, limit } = req.query
  const offset = (page - 1) * limit
  req.query.offset = offset
  req.query.limit = limit
  next()
}
