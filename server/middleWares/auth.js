import jwt from "jsonwebtoken";

// AUTHENTICATION MIDDLEWARE
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authentication.split(" ")[1];

    // For react-google-login TOKEN
    const isCustomeToken = token.length < 500;

    let decodeToken;

    if (token && isCustomeToken) {
      decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);

      req.userId = decodeToken?.id;
    } else {
      decodeToken = jwt.decode(token);

      req.userId = decodeToken?.id;
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
