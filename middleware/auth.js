const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const ensureMember = (req, res, next) => {
  if (req.user.is_admin || req.user.is_member) {
    return next();
  }
  res.redirect("/join-club");
};

module.exports = { ensureAuthenticated, ensureMember };
