import { getTransactionManager } from '../../middlewares/transactionManager.js';
import { getUsers, createUser, deleteUser } from '../../models/usersDao.js';

test('add users and get user and reset', async() => {
    const users = await getUsers();
    
    expect(users.length).toBe(0);

    const params = { id: 'test', password: '1234', email: 'test@test.com', name: '테스터' };
    await createUser(params);

    const usersAfterCreate = await getUsers();

    expect(usersAfterCreate.length).toBe(1);
    expect(usersAfterCreate[0].id).toBe('test');

    await deleteUser({ userId: 'test' });

    const usersAfterDelete = await getUsers();
    expect(usersAfterDelete.length).toBe(0);
})
