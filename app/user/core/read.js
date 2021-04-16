// const _ = require('lodash');

export function read (req, res, next) {
  const response = {
    'first_name': 'Rinesh',
    'last_name': 'Bharath'
  };

  res.status(200).json({
    'success': true,
    'data': response
  });
};
