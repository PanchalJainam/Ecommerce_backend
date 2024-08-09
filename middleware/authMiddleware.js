const jwt = require("jsonwebtoken");
// const Users = require("../models/userSchema");

// const verify = async (req, res, next) => {
//   const { authorization } = req.headers;

//   if (authorization && authorization.startsWith("Bearer")) {
//     try {
//       var token = authorization.split(" ")[1];
//       // if (!token) {
//       //   console.log("User is not verify");
//       // }
//       // const decodedData = jwt.verify(token, "vertifiacationtoken");
//       // console.log(decodedData, 13);
//       // const { userID } = jwt.verify(token, "vertifiacationtoken");
//       // if (userID) {
//       //   req.user = await Users.findById(userID).select("-password");
//       // } else {
//       //   console.log("User Is not Authenticate");
//       // }
//       // next();
//       // if (token) {
//       //   const decodedData = jwt.verify(token, "vertifiacationtoken");
//       //   console.log(decodedData, 24);
//       //   if (decodedData?.userID) {
//       //     req.user = decodedData.userID;
//       //     next();
//       //   } else {
//       //     res.status(401).json({ success: false, message: "Wrong Token" });
//       //   }
//       // } else {
//       //   res.status(401).json({ success: false, message: "Wrong Token" });
//       // }

//       if (token) {
//         jwt.verify(token, "vertifiacationtoken", function (err, decoded) {
//           if (err) {
//             console.log(err);
//             res.json({
//               success: false,
//               error: "Failed to authenticate token.",
//             });
//           } else if (decoded) {
//             // console.log(decoded);
//             res.json({
//               success: true,
//               message: "Authenticated User",
//             });
//             req.user = decoded?.userID;
//             next();
//           }
//         });
//       } else {
//         res.status(401).json({ success: false, message: "Token is not get" });
//       }
//     } catch (error) {
//       console.log(error);
//       // return res.json("error");
//     }
//   }
// };

const verify = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (token) {
      const decodedData = jwt.verify(token, "vertifiacationtoken");
      console.log(decodedData);
      if (decodedData?.userID) {
        req.user = decodedData.userID;
        res.send({ success: true, message: "Authorized User" });
        next();
      } else {
        res.send({ success: false, error: "Unauthorized User" });
      }
    } else {
      res.send({ success: false, error: "Failed to authenticate token" });
    }
  } catch (error) {
    // console.log(error);
    res.send({
      success: false,
      error: error?.TokenExpiredError
        ? "Token Expire"
        : "Failed to authenticated token",
    });
  }
};

module.exports = { verify };
