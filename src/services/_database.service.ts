import { DatabaseException } from "../exceptions";

export class DatabaseService {
  protected database: D1Database;

  constructor(database: D1Database) {
    this.database = database;
  }

  protected async count(query: string, ...bindings: unknown[]): Promise<number> {
    const databaseResponse = await this.database.prepare(query)
      .bind(...bindings)
      .first<{ count: number }>();
    
    return databaseResponse?.count ?? 0;
  }

  protected async run(query: string, ...bindings: unknown[]): Promise<boolean> {
    let success = false;

    try {
      const result = await this.database.prepare(query)
        .bind(...bindings)
        .run();
      
      success = result.success;
    }
    catch (error: any) {
      throw new DatabaseException(error);
    }

    return success;
  }

  protected async selectAll<T = unknown>(query: string, ...bindings: unknown[]) {
    let { results } = await this.database.prepare(query)
      .bind(...bindings)
      .all<T>();
    
    return results;
  }

  protected async selectFirst<T = unknown>(query: string, ...bindings: unknown[]) {
    let result = await this.database.prepare(query)
      .bind(...bindings)
      .first<T>();
    
    return result;
  }
}