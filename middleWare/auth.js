const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  if(!req.methods === 'OPTIONS') {
    next();
  } else {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if(!token) throw new Error();
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.user = decodedToken
        next();
      } catch (error) {
        res.status(401).json({message: 'Пользователь не аунтентифицирован'})
      }
  }
}