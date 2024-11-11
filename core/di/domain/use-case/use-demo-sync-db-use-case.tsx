import {useMemo} from 'react';
import DemoSyncDbUseCase from "@/core/domain/use-case/demo-sync-db-use-case";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import DemoSyncDbUseCaseImpl from "@/core/domain/use-case/demo-sync-db-use-case-impl";

export const useDemoSyncDbUseCase = (): DemoSyncDbUseCase => {
  const database = useDatabase();
  return useMemo(() => new DemoSyncDbUseCaseImpl(database), [database]);
}
