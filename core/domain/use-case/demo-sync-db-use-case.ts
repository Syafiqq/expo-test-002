import {SyncPullArgs, SyncPullResult, SyncPushArgs, SyncPushResult} from "@nozbe/watermelondb/sync";

interface DemoSyncDbUseCase {
  execute(
    pullTransformer: (data: SyncPullArgs) => Promise<SyncPullResult>,
    pushTransformer: (data: SyncPushArgs) => Promise<SyncPushResult | undefined | void>,
  ): Promise<void>;
}

export default DemoSyncDbUseCase;
