import mysql, { PoolConnection } from 'mysql2';
import { promisify } from 'util';

import keys from './key';

const pool = mysql.createPool(keys.database);

pool.getConnection((err: any, connection: PoolConnection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');
  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

export default pool;