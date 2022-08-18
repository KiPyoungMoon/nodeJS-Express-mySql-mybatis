import { getUsers as _getUsers, getUser as _getUser, insertUser as _insertUser, deleteUser as _deleteUser, updateUser as _updateUser, testApi as _testApi } from '../models/usersDao.mjs';

export const getUsers = async () => await _getUsers();

export const getUser = async () => await _getUser();

export const insertUser = async (userInfo) => await _insertUser(userInfo);

export const deleteUser = async (userId) => await _deleteUser(userId);

export const updateUser = async (userInfo) => await _updateUser(userInfo);

export const testApi = async () => await _testApi();
