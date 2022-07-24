const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).send("Token invalide");
    }
    try {
      const data = jwt.verify(token, process.env.JWT_AUTH_SECRET);

      req.userId = data.id;
      req.userRole = data.role;
      next();
    } catch {
      return res.status(401).send("Token invalide");
    }
}

module.exports = authorization;
