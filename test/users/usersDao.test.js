import { getUsers, insertUser, deleteUser, getUser, updateUser } from '../../models/usersDao.mjs';

import MybatisMapper from "mybatis-mapper";
import TransactionManager from "../../middlewares/transactionManager.mjs";

describe(`dao Test`, () => {
    test('usersDao 사용자 조회, 등록, 삭제를 테스트한다.', async() => {
    
        await deleteUser({ userId: 'test' });
        let user = await getUser({ userId: 'test' });
        
        expect(user.length).toBe(0);
    
        const params = { userId: 'test', password: '1234', email: 'test@test.com', name: '테스터' };
        await insertUser(params);
    
        user = await getUsers();
    
        expect(user.length).toBe(1);
        expect(user[0].id).toBe('test');
    
        await deleteUser({ userId: 'test' });
    
        user = await getUsers();
        expect(user.length).toBe(0);
    })

    test('사용자 정보 수정을 테스트한다.', async () => {
        await deleteUser({ userId: 'test' });
    
        let user = await getUser({ userId: 'test' });
        expect(user.length).toBe(0);
        
        const params = { userId: 'test', password: '1234', email: 'test@test.com', name: '테스터' };
        await insertUser(params);
    
        user = await getUser({ userId: 'test' });
        
        // console.log(Object.entries(user[0]));
        
        let updateUserInfos = { userId: 'test', password: null, email: null, name: '테스터_수정' };
    
        await updateUser(updateUserInfos);
        user = await getUser({ userId: 'test' });
        
        // console.log(Object.entries(user[0]));
        
        expect(user[0].id).toBe('test');
        expect(user[0].name).toBe('테스터_수정');

        updateUserInfos = { userId: 'test', password: 'test2', email: null, name: null };
        
        await updateUser(updateUserInfos);
        user = await getUser({ userId: 'test' });

        expect(user[0].id).toBe('test');
        expect(user[0].name).toBe('테스터_수정');
        expect(user[0].password).toBe('test2');
    })
})

test('transaction test : 존재하지 않는 사용자 test를 insert하고 error를 발생시킨 뒤 rollback을 확인한다.', async() => {
    const txMgr = new TransactionManager();
    
    await deleteUser({userId: 'test'});
    const user = await getUser({ userId: 'test' });
    expect(user.length).toBe(0);

    await txMgr.doProcess( async(conn) => {
        const params = { userId: 'test', password: '1234', email: 'test@test.com', name: '테스터' };
        
        const insertSql = MybatisMapper.getStatement('usersMapper', 'insertUser', params, {language: 'sql', indent: ' '} );
        await conn.query(insertSql);

        const selectSql = 'SELECT * FROM USERS WHERE ID = "test"';
        let [user, fields2] = await conn.query(selectSql);

        expect(user.length).toBe(1);
        expect(user[0].id).toBe('test');

        throw new Error("트랜젝션 테스트 강제 에러 발생");
    })
    const result2 = await getUser({userId: 'test'});

    expect(result2.length).toBe(0);
})
