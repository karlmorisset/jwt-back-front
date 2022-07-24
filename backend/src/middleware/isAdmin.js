const isAdmin = (req, res, next) => {
  if (req.userRole !== 'ROLE_ADMIN') {
    res.sendStatus(401)
  }
  next();
}

module.exports = isAdmin;
