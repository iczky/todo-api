import config from "../config/config.js";
import jwt from "jsonwebtoken";

// const authorizationMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     res.status(401).json({
//       message: "Not Authorized",
//     });
//   } else {
//     const token = authHeader.split(" ")[1];
//     try {
//       const decodeToken = jwt.verify(token, config.accessSecret);

//       if (decodeToken.role === "admin") {
//         next();
//       } else {
//         res.status(401).json({
//           message: "Unauthorized",
//         });
//       }
//     } catch (error) {
//       res.status(400).json({
//         message: "error",
//         error: error,
//       });
//     }
//   }
// };

const authorizationMiddleware = (req, res, next) => {
  const authCookies = req.cookies.accessToken;

  if (!authCookies) {
    res.status(401).json({
      message: "Cookies unavail",
    });
  } else {
    try {
      const decodeToken = jwt.verify(authCookies, config.accessSecret);

      if (decodeToken.role === "admin") {
        next();
      } else {
        res.status(403).send("Forbidden Access");
      }
    } catch (error) {
      res.status(400).json({
        message: "error",
        error: error,
      });
    }
  }
};

export default authorizationMiddleware;
