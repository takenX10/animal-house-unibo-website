// import { AUTH } from './authentication.js';

async function isAuth(req, res, next) {
  // if(await AUTH.check_login(req)){
  //     next();
  // }else{
  //     res.header("location", "http://localhost:8000/login");
  //     res.send();
  // }
  res.sendStatus(200);
}

export { isAuth };
