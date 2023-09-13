const db = require('../../data/db-config')

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    next({ status: 400, message: "name and budget are required"})
  }
  else if (typeof name != 'string') {
    next({ status: 400, message: "name of account must be a string"})
  }
  else if (name.trim().length < 3 || name.trim().length > 100) {
    next({ status: 400, message: "name of account must be between 3 and 100"})
  }
  else if (typeof budget != 'number' || isNaN(budget)) {
    next({ status: 400, message: "budget of account must be a number"})
  }
  else if (budget < 0 || budget > 1000000) {
    next({ status: 400, message: "budget of account is too large or too small"})
  }
  else {
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body
  const [nameCheck] = await db('accounts').where('name', name)
  if(!nameCheck) {
    next();
  } else {
    next({ status: 400, message: "that name is taken"})
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = await db('accounts').where('id', req.params.id)
  if(!account.length) {
    res.status(404).json({ message: 'account not found'})
  } else {
    next();
  }

  // DO YOUR MAGIC
}
