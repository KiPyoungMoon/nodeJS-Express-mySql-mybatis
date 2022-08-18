import * as rTracer from 'cls-rtracer';
import morgan from 'morgan';

import MybatisMapper from 'mybatis-mapper';
import TransactionManager from '../middlewares/transactionManager.mjs';
import { getLogger } from '../middlewares/winston.js';

MybatisMapper.createMapper(['./mapper/usersMapper.xml']);

export const insertUser = async (params) => {
  // const requestId = rTracer.id();
  // console.log(`requestId: ${requestId}`);

  const txMgr = new TransactionManager();

  const results = await txMgr.doProcess(async (conn) => {
    /**
     * 익명 함수 내에 한 트랜젝션에서 동작할 로직을 기술한다.
     * 다중 트랜젝션에 대한 처리가 어렵다.
     * 메소드 안의 익명함수 하나가 한개의 트랜젝션 처리가 된다.
     * 맘에 안들어...
     */
    // console.log(params);
    const sql = MybatisMapper.getStatement('usersMapper', 'insertUser', params, { language: 'sql', indent: ' ' });

    // getLogger().stream(`excute Query: ${sql}`);
    // console.log(`excute Query: ${sql}`);
    morgan('combined', {
      stream: getLogger().stream
    });

    const result = await conn.query(sql);
    return result;
  });

  return results;
};

export const deleteUser = async (params) => {
  // const requestId = rTracer.id();
  // console.log(`requestId: ${requestId}`);
  getLogger('deleteUser').stream();
  const txMgr = new TransactionManager();

  const results = await txMgr.doProcess(async (conn) => {
    const sql = MybatisMapper.getStatement('usersMapper', 'deleteUser', params, { language: 'sql', indent: ' ' });
    getLogger('deleteUser').stream(sql);
    // console.log(`excute Query: ${sql}`);

    const result = await conn.query(sql);
    return result;
  });

  return results;
};

export const getUsers = async () => {
  const txMgr = new TransactionManager();

  const [results, fields] = await txMgr.doProcess(async (conn) => {
    const sql = MybatisMapper.getStatement('usersMapper', 'selectAllUsers', null, { language: 'sql', indent: ' ' });
    
    // console.log(`excute Query: ${sql}`);
    
    const result = await conn.execute(sql);
    return result;
  });

  return results;
};

export const getUser = async (params) => {
  const txMgr = new TransactionManager();

  const [results, fields] = await txMgr.doProcess(async (conn) => {
    const sql = MybatisMapper.getStatement('usersMapper', 'selectUser', params, { language: 'sql', indent: ' ' });
    
    // console.log(`excute Query: ${sql}`);
    
    const result = await conn.execute(sql);
    return result;
  });

  return results;
};

export const updateUser = async (params) => {
  // const requestId = rTracer.id();
  // console.log(`requestId: ${requestId}`);

  const txMgr = new TransactionManager();

  const results = await txMgr.doProcess(async (conn) => {
    const sql = MybatisMapper.getStatement('usersMapper', 'updateUser', params, { language: 'sql', indent: ' ' });

    // console.log(`excute Query: ${sql}`);

    return await conn.query(sql);;
  });

  return results;
}

export const testApi = async() => {
  const txMgr = new TransactionManager();
  console.log('1');
  txMgr.doProcess(null); // doProcess 호출 시 connection 생성함
  return null;
}
