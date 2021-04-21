// custom response handler
export function responseHandler (req, res) {
  res.status(200).json({
    'success': true,
    'data': res.data || 'Ok'
  });
};

// default error handler
export function errorHandler (err, req, res, next) {
  res.status(404).json({
    'success': false,
    'data': {
      'error': [{
        code: err.statusCode,
        type: err.name,
        description: err.message
      }]
    }
  });
}
