import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.NeonStorage_DATABASE_URL,
});

export { pool };  // Changed to named export
