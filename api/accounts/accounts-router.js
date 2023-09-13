const router = require('express').Router()
const Account = require('./accounts-model')
const {checkAccountId, checkAccountPayload, checkAccountNameUnique, trimName} = require('./accounts-middleware')

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.status(200).json(accounts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try {
    const [account] = await Account.getById(req.params.id)
    const newAccount = {budget: account.budget, name: account.name}
    res.status(200).json(newAccount);
  } catch (err) {
    next(err)
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const acct = {name: req.body.name.trim(), budget: req.body.budget}
    const [newAccount] = await Account.create(acct)
    res.status(201).json(newAccount)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
 try {
  const [acct] = await Account.updateById(req.params.id, req.body);
  const updatedAccount = {budget: acct.budget, name: acct.name}
  res.status(200).json(updatedAccount);
 }
 catch (err) {
  next(err)
 }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Account.deleteById(req.params.id)
    res.status(200).json(deletedAccount)
  } catch (err) {
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message
  })
})

module.exports = router;
