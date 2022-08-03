import connection from "../config/mysql_connection.mjs";

class TransactionManager {
    constructor(conn) {
        this.results,
        this.fields,
        this.conn = conn,

        this.beginTransaction = function () {
            this.conn.beginTransaction();
        },
        this.commit = function () {
            this.conn.commit();
        },
        this.rollback = function () {
            this.conn.rollback();
        },
        this.release = function () {
            this.conn.release();
        },

        this.doProcess = async function(todos) {
            try {
                this.beginTransaction();
                
                [this.results, this.fields] = await todos( this.conn );

                this.commit();

            } catch (error) {
                this.rollback();
                /**
                 * TODOS: error handling
                 */
                console.log(`transactionManager error: ${ error }`);
                return error;
            } finally {
                this.release();
            }
            return [this.results, this.fields];
        };
    }
}

export const getTransactionManager = async() => {
    const conn = await connection();
    // console.log(`connection ThreadId: ${ conn.threadId }`);
    return new TransactionManager(conn);
}