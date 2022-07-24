const isAdmin = (req, res, next) => {
  if (req.userRole !== 'ROLE_ADMIN') {
    return res.sendStatus(401)
  }
  next();
}

module.exports = isAdmin;
