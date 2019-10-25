module.exports = (response) => {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}
