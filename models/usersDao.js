import { getTransactionManager } from "../middlewares/transactionManager.js";
import  mybatisMapper from "mybatis-mapper";

export const createUser = async (params) => {
    console.log('usersDao.createUser');
    const txMgr = await getTransactionManager();

    const [ results, fields ] = await txMgr.doProcess( async(conn) => {
        /**
         * 익명 함수 내에 한 트랜젝션에서 동작할 로직을 기술한다.
         * 다중 트랜젝션에 대한 처리가 어렵다.
         * 메소드 안의 익명함수 하나가 한개의 트랜젝션 처리가 된다.
         * 맘에 안들어...
         */
         mybatisMapper.createMapper(['./mapper/usersMapper.xml']);
         const sql = mybatisMapper.getStatement('usersMapper', 'insertUser', params, {language: 'sql', indent: ' '} );
        
        return await conn.query(sql);
    });

    return results;
}

export const deleteUser = async (params) => {
    console.log('usersDao.deleteUser');
    const txMgr = await getTransactionManager();
    
    const [ results, fields ] = await txMgr.doProcess( async(conn) => {
        mybatisMapper.createMapper(['./mapper/usersMapper.xml']);
        const sql = mybatisMapper.getStatement('usersMapper', 'deleteUser', params, {language: 'sql', indent: ' '} );
        
        return await conn.query(sql);
    });

    return results;
}

export const getUsers = async() => {
    console.log('usersDao.getUsers');
    const txMgr = await getTransactionManager();

    const [ results, fields ] = await txMgr.doProcess( async(conn) => {
         mybatisMapper.createMapper(['./mapper/usersMapper.xml']);
        const sql = mybatisMapper.getStatement('usersMapper', 'selectAllUsers', null, {language: 'sql', indent: ' '} );
        
        return await conn.execute(sql);
    });

    return results;
}



