const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
      return res.sendStatus(401);
    }
    try {
      const data = jwt.verify(token, process.env.JWT_AUTH_SECRET);

      req.userId = data.id;
      req.userRole = data.role;
      next();
    } catch {
      return res.sendStatus(401);
    }
}

module.exports = authorization;
