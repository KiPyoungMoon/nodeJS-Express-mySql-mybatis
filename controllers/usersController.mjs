import { getUsers as _getUsers, insertUser as _insertUser, deleteUser as _deleteUser } from '../models/usersDao.mjs';

export const getUsers = async () => await _getUsers();

export const insertUser = async (userInfo) => await _insertUser(userInfo);

export const deleteUser = async (userId) => await _deleteUser(userId);
