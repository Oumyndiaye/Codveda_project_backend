const jwt = require('jsonwebtoken');

const auth = (requiredRole = null) => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
      req.user = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Accès interdit' });
      }

      next();
    } catch (err) {
      res.status(401).json({ message: 'Non authentifié' });
    }
  };
};

module.exports = auth;
