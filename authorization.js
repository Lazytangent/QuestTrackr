
const db = require('./db/models');

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id,
  };
};

const logoutUser = (req, res, next) => {
  delete req.session.auth; 
  req.session.save(error =>{
    if(error){
      next(error);
    }else{
      res.redirect('/');
    }
  });
};

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/user/login');
  }
  return next();
};

module.exports = {
  loginUser,
  logoutUser,
  requireAuth
};
