import { createPool } from 'mysql2/promise.js';
import { readFile } from 'fs/promises';
// import db_config from "./db_config.json" assert { type: 'json' };
/**
 * 기술 종속성을 제거하기 위해 interface를 적용하고 싶은데,
 * intarface는 typeScript에 있음.
 * JS에서 interface를 대체할 만한 수단이 있나? - class, object?
 * -> 제어의 역전 사용할 방법은? 생성자?
 * {  host, user, password, database, connectionLimit }
 */
// db_config.example.json 참조해서 db_config.json파일 생성할 것.
const dbConfigFile = await readFile('./config/dbConfig.json');
const dbConfig = JSON.parse(dbConfigFile);

let connectionPool;

class ConnectionPool {
  constructor() {
    if ( connectionPool ) return connectionPool;
    this.pool = createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      connectionLimit: dbConfig.connectionLimit
    });
    connectionPool = this;
  }
}
const pool = new ConnectionPool().pool;
const connection = async () => await pool.getConnection(async (conn) => conn);

export default connection;
