import { DatabaseException } from "../exceptions";
import deleteQuery from "../queries/things/delete.query.txt";
import insertQuery from "../queries/things/insert.query.txt";
import selectAllQuery from "../queries/things/select-all.query.txt";
import selectByIdQuery from "../queries/things/select-by-id.query.txt";
import selectTotalCountQuery from "../queries/things/select-total-count.query.txt";
import updateQuery from "../queries/things/update.query.txt";
import { PaginationRequest, Thing, ThingRequest } from "../types";
import { asDatabaseItem, asPaginatedDatabaseItems, withMessage } from "../utilities";
import { DatabaseService } from "./_database.service";

export class ThingService extends DatabaseService {
  async add(thing: ThingRequest) {
    const success = await super.run(insertQuery, thing.title);

    if (!success) {
      throw new DatabaseException(withMessage("Unable to add thing"));
    }
  }

  async delete(id: string) {
    let success = await super.run(deleteQuery, id);

    if (!success) {
      throw new DatabaseException(withMessage("Unable to delete thing"));
    }
  }

  async getAll(pagination: PaginationRequest) {
    const results = await super.selectAll<Thing>(selectAllQuery, pagination.pageSize, pagination.offset);
    const totalCount = await this.getTotalCount();
    
    return asPaginatedDatabaseItems(results, totalCount);
  }

  async getById(id: string) {
    const thing = await super.selectFirst<Thing>(selectByIdQuery, id);
    return asDatabaseItem(thing);
  }

  async getTotalCount(): Promise<number> {
    return await super.count(selectTotalCountQuery);
  }

  async update(id: string, thing: ThingRequest) {
    let success = await super.run(updateQuery, id, thing.title);

    if (!success) {
      throw new DatabaseException(withMessage("Unable to update thing"));
    }
  }
}