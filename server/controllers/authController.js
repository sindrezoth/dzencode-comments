const { getUserByCredService } = require("../services/usersService");
const jwt = require("jsonwebtoken");

const authController = async (req, res) => {
  const authHeader = req.headers["authorization"];
  const cookies = req.cookies;
  // console.log(`cookie: ${cookies.jwt}`);
  // console.log(`authHeader: ${authHeader}`);

  let accessToken;
  if (authHeader && authHeader.startsWith("Bearer")) {
    accessToken = authHeader.split(" ")[1];
    console.log(`accessToken: ${accessToken}`)
    let result;
    jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decoded);
        result = {
          username: decoded.username
        }
      }
    });

    console.log("jwt verify result: ");
    console.log(result);

    return res.json(result);
  }

  let refreshToken;
  if (cookies?.jwt) {
    refreshToken = cookies.jwt;
    console.log(`refreshToken: ${refreshToken}`)
    let result;
    jwt.verify(
      refreshToken, 
      process.env.JWT_REFRESH_TOKEN, 
      (err, decoded) => {
        if (err) {
          console.log(err);
          res.clearCookie("jwt");
        } else {
          console.log(decoded);

          accessToken = jwt.sign(
            {
              username: decoded.username
            },
            process.env.JWT_ACCESS_TOKEN,
            { expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN }
          )

          result = {
            username: decoded.username,
            accessToken
          };
        }
      }
    );

    if(result) {
      return res.json(result);
    }
  }

  
  return res.json({ message: "/auth" });
  // if (!username || !email) {
  //   console.log("no username or email provided");
  //   res.status(401).json({ message: "Unauthorized" });
  // }

  // const userCred = username || email;
  // console.log(userCred);
  //
  // let user;
  // try {
  //   user = await getUserByCredService(userCred);
  // } catch (err) {
  //   throw new Error(err);
  // }
  //
  // if (user) {
  //   console.log("AUTH");
  //   req.auth = user;
  // } else {
  //   req.auth = false;
  // }
};

module.exports = {
  authController,
};
