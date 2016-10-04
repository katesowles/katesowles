const tokenChecker = require('./token');

module.exports = function confirmAuth (request, response, next) {
  if (request.method === 'OPTIONS') return next();

  const authHeader = request.headers.authorization;
  const token = authHeader ? authHeader.replace('Bearer ', '') : '';

  if (!token) {
    return response.status(403).json({message:'Authorization failed, the token could not be found'});
  }

  tokenChecker.verify(token)
    .then(payload => {
      request.user = payload;
      next();
    })
    .catch(error => {
      console.log('ERROR: We had trouble validating the token', error);
      response.status(403).json({message:'Authorization failed, the otken was invalid'});
    });
};
