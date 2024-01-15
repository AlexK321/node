const jwt = require("jsonwebtoken");

module.exports = function(roles) { 
  return function(req, res, next) {
    if(req.methods === 'OPTIONS') {
      next();
    } else {
      try {
          const token = req.headers.authorization?.split(' ')[1];
          if(!token) throw new Error();
          const decodedToken = jwt.verify(token, process.env.JWT_KEY);
          
          const userRoles = decodedToken.roles;
          req.user = decodedToken
          let hasRole = Boolean(roles.filter(role => userRoles.includes(role)).length)
          if(!hasRole) throw new Error();
          next();
        } catch (error) {
          res.status(403).json({message: 'У пользователя не хватает немножко прав' + error})
        }
    }
  }
}