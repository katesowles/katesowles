module.exports = function cors(url) {
  return (request, response, next) => {
    // const url = '*';
    response.header('Access-Control-Allow-Origin', url);
    response.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
    response.header('Access-Controll-Allow-Headers', 'Origin, X-Requsted-With, Content-Tyle, Accept');
    next();
  };
};
