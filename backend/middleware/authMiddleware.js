const jwt =
require("jsonwebtoken");

const protect = async (
  req,
  res,
  next
) => {

  try {

    let token =
      req.headers.authorization;

    // CHECK TOKEN
    if (!token) {

      return res.status(401).json({

        success: false,

        message:
          "Unauthorized",
      });
    }

    // REMOVE BEARER
    if (
      token.startsWith(
        "Bearer "
      )
    ) {

      token =
        token.split(" ")[1];
    }

    // VERIFY TOKEN
    const decoded =
      jwt.verify(

        token,

        process.env.JWT_SECRET
      );

    req.user = decoded;

    next();

  } catch (error) {

    return res.status(401).json({

      success: false,

      message:
        "Invalid Token",
    });
  }
};

module.exports = {
  protect,
};