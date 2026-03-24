const jwt = require("jsonwebtoken");

async function authArtist(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.json(401).json({
      message: "Unauthorized User",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.json(401).json({
        message: "Don't have access",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.json(401).json({
      message: "Unauthorized User",
    });
  }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.json(401).json({
      message: "Unauthorized User",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user" && decoded.role !== "artist") {
      return res.json(401).json({
        message: "Don't have access",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.json(401).json({
      message: "Unauthorized User",
    });
  }
}

module.exports = { authArtist,authUser };
