import connection from '../config/mysql_connection.mjs';

class TransactionManager {
  constructor(conn) {
    this.results,
    this.fields,
    this.conn = conn,

    this.beginTransaction = () => {
      this.conn.beginTransaction();
    },
    this.commit = () => {
      this.conn.commit();
    },
    this.rollback = () => {
      this.conn.rollback();
    },
    this.release = () => {
      this.conn.release();
    },

    this.doProcess = async (todos) => {
      try {
        this.beginTransaction();

        [this.results, this.fields] = await todos(this.conn);

        this.commit();
      } catch (error) {
        this.rollback();
        /**
                 * TODOS: error handling
                 */
        console.log(`transactionManager error: ${error}`);
        return error;
      } finally {
        this.release();
      }
      return [this.results, this.fields];
    };
  }
}

const getTransactionManager = async () => {
  const conn = await connection();
  // console.log(`connection ThreadId: ${ conn.threadId }`);
  return new TransactionManager(conn);
};

export default getTransactionManager;
