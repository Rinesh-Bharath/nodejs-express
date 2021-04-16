// const _ = require('lodash');

export function update (req, res, next) {
  let response = {};

  if (req.params) {
    response = req.params;
  }

  res.status(200).json({
    'success': true,
    'data': response
  });
};
