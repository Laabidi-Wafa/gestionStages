const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    //if there's no authorization
    const error = new Error("not authenticated");
    error.statusCode = 404;
    throw error;
  }
  //we check if the token contains space 'Bearer anhjbx9'
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    //verifying if the token matches our secretfortoken
    decodedToken = jwt.verify(token, "secretfortoken");
  } catch (err) {
    //if not we're gonna throw an error
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    //if there's no token
    const error = new Error("Not authenticated!");
    error.statusCode = 401;
    throw error;
  } //if we go through that and we have the token we can set the isLoggedIn to true
  req.isLoggedIn = true;
  req.userId = decodedToken.userId;
  req.email = decodedToken.email;
  req.role = decodedToken.role;
  next();
};
