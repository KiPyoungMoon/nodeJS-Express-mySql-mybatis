import { getUsers as _getUsers, insertUser as _insertUser, deleteUser as _deleteUser } from '../models/usersDao.mjs';
/**
 * 여기 template Method - transaction 적용해야 하지 않을까?
 */
export const getUsers = async () => await _getUsers();

export const insertUser = async (userInfo) => await _insertUser(userInfo);

export const deleteUser = async (userId) => await _deleteUser(userId);
