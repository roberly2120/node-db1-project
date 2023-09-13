const db = require('../../data/db-config')

const getAll = async () => {
  const accounts = await db('accounts');
  return accounts;
}

const getById = async (id) => {
  const account = await db('accounts').where('id', id)
  return account;
}

const create = async (account) => {
  const [ id ] = await db('accounts').insert(account)
  const newAccount = await db('accounts').where('id', id)
  return newAccount;
}

const updateById = async (id, account) => {
  await db('accounts').update(account).where('id', id);
  const result = await getById(id);
  return result;
}

const deleteById = async (id) => {
  const toBeDeleted = await db('accounts').where('id', id)
  await db('accounts').del().where('id', id)
  return toBeDeleted;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
