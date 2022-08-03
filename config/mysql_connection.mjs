import { createPool } from "mysql2/promise.js";
import { readFile } from "fs/promises";
// import db_config from "./db_config.json" assert { type: 'json' };
/**
 * 기술 종속성을 제거하기 위해 interface를 적용하고 싶은데,
 * intarface는 typeScript에 있음.
 * JS에서 interface를 대체할 만한 수단이 있나? - class, object?
 * -> 제어의 역전 사용할 방법은? 생성자?
 * {  host, user, password, database, connectionLimit }
 */
/**
 * 여기서 풀을 factory 패턴으로? 싱글톤 적용해서?
 */
const dbConfigFile = await readFile('./config/db_config.json');
const db_config = JSON.parse(dbConfigFile);

const pool = createPool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    connectionLimit: db_config.connectionLimit,
    
});

const connection = async () => {
    return await pool.getConnection(async conn => conn);
}

export default connection;
