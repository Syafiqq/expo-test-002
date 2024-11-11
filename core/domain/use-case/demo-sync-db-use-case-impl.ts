import DemoSyncDbUseCase from "@/core/domain/use-case/demo-sync-db-use-case";
import {Database} from "@nozbe/watermelondb";
import {synchronize, SyncPullArgs, SyncPullResult, SyncPushArgs, SyncPushResult} from "@nozbe/watermelondb/sync";

class DemoSyncDbUseCaseImpl implements DemoSyncDbUseCase {
  private readonly database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async execute(
    pullTransformer: (data: SyncPullArgs) => Promise<SyncPullResult>,
    pushTransformer: (data: SyncPushArgs) => Promise<SyncPushResult | undefined | void>,
  ): Promise<void> {
    await synchronize({
      database: this.database,
      pullChanges: async ({lastPulledAt, schemaVersion, migration}) => {
        const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
          JSON.stringify(migration),
        )}`

        fetch(`https://example.com/pull/sync?${urlParams}`)
          .then()
          .catch(_ => {})

        const response = await pullTransformer({lastPulledAt, schemaVersion, migration})

        console.log(JSON.stringify(response))

        // @ts-ignore
        const {changes, timestamp} = response;
        return {changes, timestamp}
      },
      pushChanges: async ({changes, lastPulledAt}) => {
        fetch(`https://example.com/push/sync?last_pulled_at=${lastPulledAt}`, {
          method: 'POST',
          body: JSON.stringify(changes),
        })
          .then()
          .catch(_ => {})

        return await pushTransformer({changes, lastPulledAt})
      },
      migrationsEnabledAtVersion: 1,
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
  }
}

export default DemoSyncDbUseCaseImpl;
