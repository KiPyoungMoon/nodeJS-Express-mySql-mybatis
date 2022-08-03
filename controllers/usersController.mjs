import { getUsers as _getUsers, insertUser as _insertUser, deleteUser as _deleteUser } from '../models/usersDao.mjs';
/**
 * 여기 template Method - transaction 적용해야 하지 않을까?
 */
export const getUsers = async() => {
  return await _getUsers();
}

export const insertUser = async(userInfo) => {
  return await _insertUser(userInfo);
}

export const deleteUser = async(userId) => {
  return await _deleteUser(userId);
}
