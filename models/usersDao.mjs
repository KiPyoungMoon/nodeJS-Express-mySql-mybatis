import MybatisMapper from 'mybatis-mapper';
import getTransactionManager from '../middlewares/transactionManager.mjs';

MybatisMapper.createMapper(['./mapper/usersMapper.xml']);

export const insertUser = async (params) => {
  const txMgr = await getTransactionManager();

  const [results] = await txMgr.doProcess(async (conn) => {
    /**
         * 익명 함수 내에 한 트랜젝션에서 동작할 로직을 기술한다.
         * 다중 트랜젝션에 대한 처리가 어렵다.
         * 메소드 안의 익명함수 하나가 한개의 트랜젝션 처리가 된다.
         * 맘에 안들어...
         */

    const sql = MybatisMapper.getStatement('usersMapper', 'insertUser', params, { language: 'sql', indent: ' ' });

    const result = await conn.query(sql);
    return result;
  });

  return results;
};

export const deleteUser = async (params) => {
  const txMgr = await getTransactionManager();

  const [results] = await txMgr.doProcess(async (conn) => {
    const sql = MybatisMapper.getStatement('usersMapper', 'deleteUser', params, { language: 'sql', indent: ' ' });

    const result = await conn.query(sql);
    return result;
  });

  return results;
};

export const getUsers = async () => {
const txMgr = await getTransactionManager();

  const [results] = await txMgr.doProcess(async (conn) => {
    const sql = MybatisMapper.getStatement('usersMapper', 'selectAllUsers', null, { language: 'sql', indent: ' ' });
    // console.log(`excute Query: ${sql}`);
    const result = await conn.execute(sql);
    return result;
  });

  return results;
};

export const getUser = async (params) => {
  const txMgr = await getTransactionManager();

  const [results] = await txMgr.doProcess(async (conn) => {
    const sql = MybatisMapper.getStatement('usersMapper', 'selectUser', params, { language: 'sql', indent: ' ' });
    const result = await conn.execute(sql);
    return result;
  });

  return results;
};
