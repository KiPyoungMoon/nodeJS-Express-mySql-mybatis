import { getUsers as _getUsers, createUser as _createUser, deleteUser as _deleteUser } from '../models/usersDao.js';
/**
 * 여기 template Method - transaction 적용해야 하지 않을까?
 */
export const getUsers = async() => {
  return await _getUsers();
}

export const createUser = async(userInfo) => {
  return await _createUser(userInfo);
}

export const deleteUser = async(userId) => {
  return await _deleteUser(userId);
}
