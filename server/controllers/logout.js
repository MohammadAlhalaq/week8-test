exports.logout = (req, res) => {
  res.clearCookie('city').redirect('/');
};