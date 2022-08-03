import { getUsers, insertUser, deleteUser, getUser } from '../../models/usersDao.mjs';
import MybatisMapper from "mybatis-mapper";
import getTransactionManager from "../../middlewares/transactionManager.mjs";

test('usersDao 사용자 조회, 등록, 삭제를 테스트한다.', async() => {
    
    await deleteUser({userId: 'test'});
    const users = await getUser({userId: 'test'});
    
    expect(users.length).toBe(0);

    const params = { id: 'test', password: '1234', email: 'test@test.com', name: '테스터' };
    await insertUser(params);

    const usersAfterCreate = await getUsers();

    expect(usersAfterCreate.length).toBe(1);
    expect(usersAfterCreate[0].id).toBe('test');

    await deleteUser({ userId: 'test' });

    const usersAfterDelete = await getUsers();
    expect(usersAfterDelete.length).toBe(0);
})

test('transaction test : 존재하지 않는 사용자 test를 insert하고 error를 발생시킨 뒤 rollback을 확인한다.', async() => {
    const txMgr = await getTransactionManager();

    await deleteUser({userId: 'test'});
    let result = await getUser({userId: 'test'});

    expect(result.length).toBe(0);

    const returnError = await txMgr.doProcess( async(conn) => {
        const params = { id: 'test', password: '1234', email: 'test@test.com', name: '테스터' };
        
        const insertSql = MybatisMapper.getStatement('usersMapper', 'insertUser', params, {language: 'sql', indent: ' '} );
        await conn.query(insertSql);

        const selectSql = 'SELECT * FROM USERS WHERE ID = "test"';
        const [usersAfterCreate, fields2] = await conn.query(selectSql);

        expect(usersAfterCreate.length).toBe(1);
        expect(usersAfterCreate[0].id).toBe('test');

        throw new Error("트랜젝션 테스트 강제 에러 발생");
    })
    console.log(`returnError: ${returnError}`);
    let result2 = await getUser({userId: 'test'});

    expect(result2.length).toBe(0);
})
