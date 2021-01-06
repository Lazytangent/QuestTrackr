
const db = require('./db/models');

const loginUser = (req, res, user, next) => {
  req.session.auth = {
    userId: user.id,
  };
  return req.session.save(error => {
    if (error) {
      next(error);
    } else {
     return res.redirect('/');
    }
  });
};

const restoreUser = async (req, res, next) => {
  if (req.session.auth) {
    const { userId } = req.session.auth;
    try {
      const user = await db.User.findByPk(userId);
      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
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
  requireAuth,
  restoreUser
};
