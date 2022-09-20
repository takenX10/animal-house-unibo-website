export const isAuth = (req, res, next) => {
    console.log('authorization requested');
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(7, authorization.length);
      jwt.verify(
        token,
        process.env.JWT_SECRET,
        (err, decode) => {
          if (err) {
            console.log('Auth denied');
            res.status(401).send({ message: 'Invalid Token' });
          } else {
            console.log('Auth given');
            req.user = decode;
            next();
          }
        }
      );
    } else {
      console.log('No token');
      res.status(401).send({ message: 'No Token' });
    }
};