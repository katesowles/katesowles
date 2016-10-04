module.exports = function(error, request, response) {
  if (error) {
    console.log('ERROR:', error);
    response.status(error.status || 400);
    response.json(error);
  }
};
