import {
  Pool,
  type PoolClient,
  type QueryResult,
  type QueryResultRow,
} from "pg";

type GlobalWithPool = typeof globalThis & {
  __avirvoxPgPool?: Pool;
};

const globalWithPool = globalThis as GlobalWithPool;

/**
 * Centralized PostgreSQL pool.
 * Reuses a single pool across hot reloads / route handler invocations.
 */
export function getPool(): Pool {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  if (!globalWithPool.__avirvoxPgPool) {
    const pool = new Pool({
      connectionString,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });

    pool.on("error", (error) => {
      console.error("Unexpected PostgreSQL pool error", error);
    });

    globalWithPool.__avirvoxPgPool = pool;
  }

  return globalWithPool.__avirvoxPgPool;
}

/** Parameterized query helper. All SQL must be parameterized. */
export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params?: unknown[],
): Promise<QueryResult<T>> {
  return getPool().query<T>(text, params as unknown[] | undefined);
}

/** Runs a callback inside a BEGIN/COMMIT/ROLLBACK transaction. */
export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>,
): Promise<T> {
  const client = await getPool().connect();

  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Failed to roll back transaction", rollbackError);
    }
    throw error;
  } finally {
    client.release();
  }
}
