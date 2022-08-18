import pool from '../config/mysql_connection.mjs';
// import connection from '../config/mysql_connection.mjs';

export default class TransactionManager {
  constructor() {
    this.results,
    this.fields,
    this.conn,

    this.getConnection = async() => {
      this.conn = await pool.getConnection();
      // console.log(`conn ThreadId: ${ this.conn.threadId }`);
    }
    this.beginTransaction = async () => {
      await this.conn.beginTransaction();
    },
    this.commit = async () => {
      await this.conn.commit();
    },
    this.rollback = async () => {
      await this.conn.rollback();
    },
    this.release = () => {
      this.conn.release();
    },
    this.destroy = () => {
      this.conn.destroy();
    }

    this.doProcess = async (proceed) => {
      try {
        await this.getConnection();
        await this.beginTransaction();

        [this.results, this.fields] = await proceed(this.conn);

        await this.commit();
      } catch (error) {
        await this.rollback();
        /**
         * TODOS: error handling
         */
        console.log(`transactionManager error: ${error}`);
        return error;
      } finally {
        this.release();
      }
      return [this.results];
    };
  }
}
