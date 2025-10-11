// Artillery processor functions
// Funciones helper para los escenarios de carga

module.exports = {
  // Generate random test data
  generateTestData: function(requestParams, context, ee, next) {
    const timestamp = Date.now();
    context.vars.randomEmail = `test${timestamp}@seedor.com`;
    context.vars.randomName = `Campo Test ${timestamp}`;
    context.vars.timestamp = timestamp;
    return next();
  },

  // Log response for debugging
  logResponse: function(requestParams, response, context, ee, next) {
    if (response.statusCode >= 400) {
      console.log(`❌ Error ${response.statusCode}: ${requestParams.url}`);
    }
    return next();
  },

  // Set auth header from captured token
  setAuthHeader: function(requestParams, context, ee, next) {
    if (context.vars.authToken) {
      requestParams.headers = requestParams.headers || {};
      requestParams.headers['Authorization'] = `Bearer ${context.vars.authToken}`;
    }
    return next();
  }
};
