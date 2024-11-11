import {useDemoSyncDbUseCase} from "@/core/di/domain/use-case/use-demo-sync-db-use-case";
import {
  pullDefaultSuccessWithEmpty,
  pullWithCreateAndDeleteData,
  pullWithCreateAndUpdatedData,
  pullWithCreateData,
  pullWithDeletedData,
  pullWithDuplicatedCreatData,
  pullWithError,
  pullWithMalformedCreatData,
  pullWithNotExistDeleteData,
  pullWithNotExistUpdateData,
  pullWithUpdatedData,
  pushDefaultSuccessWithEmpty,
  pushWithError
} from "@/core/domain/use-case/demo-sync-db-use-case-helper";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import {hasUnsyncedChanges} from "@nozbe/watermelondb/sync";
import React from "react";
import {Pressable, Text, TextProps} from "react-native";

export const UnSyncText = React.memo((props: TextProps) => {
  const [status, setStatus] = React.useState(false);

  const database = useDatabase();

  const checkUnsyncChanges = async () => {
    const hasChanges = await hasUnsyncedChanges({database});
    setStatus(hasChanges);
  }

  return (
    <Pressable onPress={() => checkUnsyncChanges()}>
      <Text {...props}>
        Has unsynced data{'\n'}
        Status: {status ? 'Need Sync' : 'Up To Date'}
      </Text>
    </Pressable>
  )
});

export const DefaultSyncStatus = React.memo((props: TextProps) => {
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullDefaultSuccessWithEmpty(),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Empty sync:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});
export const SyncPullCreate1Item = React.memo((props: TextProps) => {
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullWithCreateData(1),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Pull 1 new remote item:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPullUpdate1Item = React.memo((props: TextProps) => {
  const database = useDatabase();
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullWithUpdatedData(database),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Pull 1 updated remote item:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPullDelete1Item = React.memo((props: TextProps) => {
  const database = useDatabase();
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullWithDeletedData(database),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Pull 1 deleted remote item:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPullCreateAndUpdate = React.memo((props: TextProps) => {
  const database = useDatabase();
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullWithCreateAndUpdatedData(database),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Pull new / updated remote item:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPullCreateAndDelete = React.memo((props: TextProps) => {
  const database = useDatabase();
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullWithCreateAndDeleteData(database),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Pull new / deleted remote item:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPullMalformedCreate = React.memo((props: TextProps) => {
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullWithMalformedCreatData(),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Malformed new item from remote:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPullDuplicatedCreate = React.memo((props: TextProps) => {
  const [status, setStatus] = React.useState(false);
  const database = useDatabase();

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      await pullWithDuplicatedCreatData(database),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        New remote item but id present in local:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPullNotExistUpdate = React.memo((props: TextProps) => {
  const [status, setStatus] = React.useState(false);
  const database = useDatabase();

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      await pullWithNotExistUpdateData(database),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Updated item from remote but local not exists:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPullNotExistDelete = React.memo((props: TextProps) => {
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullWithNotExistDeleteData(),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Deleted item from remote but local not exists:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPullError = React.memo((props: TextProps) => {
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullWithError(),
      pushDefaultSuccessWithEmpty()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Error when pulling data:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});

export const SyncPushError = React.memo((props: TextProps) => {
  const [status, setStatus] = React.useState(false);

  const sync = useDemoSyncDbUseCase();

  const execute = async () => {
    setStatus(true);
    await sync.execute(
      pullDefaultSuccessWithEmpty(),
      pushWithError()
    )
      .then(() => {
        console.log('Sync completed')
      })
      .catch((error) => {
        console.log('Sync error', error)
      })
    setStatus(false);
  }

  return (
    <Pressable onPress={() => execute()}>
      <Text {...props}>
        Error when pushing data:{'\n'}
        Status: {status ? 'Processing' : '-'}
      </Text>
    </Pressable>
  )
});
