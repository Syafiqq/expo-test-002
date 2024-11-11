## 2. Sync Simulation

### Table Of contents

- [2. Sync Simulation](#2-sync-simulation)
    - [2.1 Simulation 1, \[Success\], Normal sync](#21-simulation-1-success-normal-sync)
    - [2.2 Simulation 2, \[Success\], Sync with new local data](#22-simulation-2-success-sync-with-new-local-data)
    - [2.3 Simulation 3, \[Success\], Sync with updated local data](#23-simulation-3-success-sync-with-updated-local-data)
    - [2.4 Simulation 4, \[Success\], Sync with soft deleted local data](#24-simulation-4-success-sync-with-soft-deleted-local-data)
    - [2.5 Simulation 5, \[Success\], Sync with hard deleted local data](#25-simulation-5-success-sync-with-hard-deleted-local-data)
    - [2.6 Simulation 6, \[Success\], Sync with new un-sync-ed remote data](#26-simulation-6-success-sync-with-new-un-sync-ed-remote-data)
    - [2.7 Simulation 7, \[Success\], Sync with updated un-sync-ed remote data](#27-simulation-7-success-sync-with-updated-un-sync-ed-remote-data)
    - [2.8 Simulation 8, \[Success\], Sync with deleted un-sync-ed remote data](#28-simulation-8-success-sync-with-deleted-un-sync-ed-remote-data)
    - [2.9 Simulation 9, \[Success\], Sync with un-sync-ed new and updated data from remote](#29-simulation-9-success-sync-with-un-sync-ed-new-and-updated-data-from-remote)
    - [2.10 Simulation 10, \[Success\], Sync with un-sync-ed new and delete data from remote](#210-simulation-10-success-sync-with-un-sync-ed-new-and-delete-data-from-remote)
    - [2.11 Simulation 11, \[Success\], Sync with malformed new data from remote](#211-simulation-11-success-sync-with-malformed-new-data-from-remote)
    - [2.12 Simulation 12, \[Warning\], Sync with un-sync-ed new from remote, same id present in local](#212-simulation-12-warning-sync-with-un-sync-ed-new-from-remote-same-id-present-in-local)
    - [2.13 Simulation 13, \[Warning\], Sync with un-sync-ed updated data from remote, not existed in local](#213-simulation-13-warning-sync-with-un-sync-ed-updated-data-from-remote-not-existed-in-local)
    - [2.14 Simulation 14, \[Success\], Sync with un-sync-ed deleted data from remote, not existed in local](#214-simulation-14-success-sync-with-un-sync-ed-deleted-data-from-remote-not-existed-in-local)
    - [2.15 Simulation 15, \[Success\], Sync with migration involved](#215-simulation-15-success-sync-with-migration-involved)
    - [2.16 Simulation 16, \[Failed\], Sync pull unexpected error](#216-simulation-16-failed-sync-pull-unexpected-error)
    - [2.17 Simulation 17, \[Failed\], Sync push unexpected error](#217-simulation-17-failed-sync-push-unexpected-error)

### 2.1 Simulation 1, [Success], Normal sync

Executed sync twice to show the pull push data change

#### Current Condition:

```plaintext
Local -> 2 data unsynced
Remote -> 0 new data
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=null&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731045479693}
```

#### Push #1

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731045479693' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[{"id":"0c34803f-90cd-3119-bc4c-67f0253945ff","_status":"created","_changed":"","title":"0 - Ab assumenda nobis nostrum soluta recusandae."},{"id":"c24c5ebd-307b-3472-b046-c1c1c4c9e80e","_status":"created","_changed":"","title":"1 - Nesciunt id impedit natus."},{"id":"0980dd04-f044-37d6-aeb4-fcb3b5dee126","_status":"created","_changed":"","title":"2 - Ab et alias et labore."}],"updated":[],"deleted":[]},"populate_initial":{"created":[{"id":"l5qutRGLjfbM8m0x","_status":"created","_changed":"","title":"todos","populated":true}],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [
      {
        "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
        "_status": "created",
        "_changed": "",
        "title": "0 - Ab assumenda nobis nostrum soluta recusandae."
      },
      {
        "id": "c24c5ebd-307b-3472-b046-c1c1c4c9e80e",
        "_status": "created",
        "_changed": "",
        "title": "1 - Nesciunt id impedit natus."
      },
      {
        "id": "0980dd04-f044-37d6-aeb4-fcb3b5dee126",
        "_status": "created",
        "_changed": "",
        "title": "2 - Ab et alias et labore."
      }
    ],
    "updated": [],
    "deleted": []
  },
  "populate_initial": {
    "created": [
      {
        "id": "l5qutRGLjfbM8m0x",
        "_status": "created",
        "_changed": "",
        "title": "todos",
        "populated": true
      }
    ],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
200 OK
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T05:57:59.779Z",
  "lastPulledAt": null,
  "lastPulledSchemaVersion": null,
  "localChangeCount": 4,
  "migration": null,
  "newLastPulledAt": 1731045479693,
  "phase": "done",
  "rejectedIds": null,
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T05:57:59.656Z"
}
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731045479693&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731045766143}
```

#### Push #2

```plaintext
Doesn't call push because no changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T06:02:46.168Z",
  "lastPulledAt": 1731045479693,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731045766143,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T06:02:46.054Z"
}
```

---

### 2.2 Simulation 2, [Success], Sync with new local data

Executed sync twice, new local data before 2nd sync

#### Current Condition:

```plaintext
Local -> 2 data unsynced
Remote -> 0 new data
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=null&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731055053061,}
```

#### Push #1

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731055053061' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[{"id":"0c34803f-90cd-3119-bc4c-67f0253945ff","_status":"created","_changed":"","title":"0 - Ab assumenda nobis nostrum soluta recusandae.","created_at":1731055042224,"updated_at":1731055042224},{"id":"c24c5ebd-307b-3472-b046-c1c1c4c9e80e","_status":"created","_changed":"","title":"1 - Nesciunt id impedit natus.","created_at":1731055042226,"updated_at":1731055042226}],"updated":[],"deleted":[]},"populate_initial":{"created":[{"id":"rAEwFuqa5l4rzNlU","_status":"created","_changed":"","title":"todos","populated":true}],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [
      {
        "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
        "_status": "created",
        "_changed": "",
        "title": "0 - Ab assumenda nobis nostrum soluta recusandae.",
        "created_at": 1731055042224,
        "updated_at": 1731055042224
      },
      {
        "id": "c24c5ebd-307b-3472-b046-c1c1c4c9e80e",
        "_status": "created",
        "_changed": "",
        "title": "1 - Nesciunt id impedit natus.",
        "created_at": 1731055042226,
        "updated_at": 1731055042226
      }
    ],
    "updated": [],
    "deleted": []
  },
  "populate_initial": {
    "created": [
      {
        "id": "rAEwFuqa5l4rzNlU",
        "_status": "created",
        "_changed": "",
        "title": "todos",
        "populated": true
      }
    ],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
200 OK
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T08:37:33.092Z",
  "lastPulledAt": null,
  "lastPulledSchemaVersion": null,
  "localChangeCount": 3,
  "migration": null,
  "newLastPulledAt": 1731055053061,
  "phase": "done",
  "rejectedIds": null,
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T08:37:33.041Z"
}
```

#### Precondition

```plaintext
Local -> 1 new data unsynced
Remote -> 0 new data
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731055053061&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731055071415,}
```

#### Push #2

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731055071415' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[{"id":"RzPaVcXX1pKBIdZu","_status":"created","_changed":"","title":"1731055067171 - Title","created_at":1731055067171,"updated_at":1731055067171}],"updated":[],"deleted":[]},"populate_initial":{"created":[],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [
      {
        "id": "RzPaVcXX1pKBIdZu",
        "_status": "created",
        "_changed": "",
        "title": "1731055067171 - Title",
        "created_at": 1731055067171,
        "updated_at": 1731055067171
      }
    ],
    "updated": [],
    "deleted": []
  },
  "populate_initial": {
    "created": [],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
200 OK
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T08:37:51.442Z",
  "lastPulledAt": 1731055053061,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 1,
  "migration": null,
  "newLastPulledAt": 1731055071415,
  "phase": "done",
  "rejectedIds": null,
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T08:37:51.403Z"
}
```

---

### 2.3 Simulation 3, [Success], Sync with updated local data

Executed sync twice, updated local data before 2nd sync

#### Current Condition:

```plaintext
Local -> 2 data unsynced
Remote -> 0 new data
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=null&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731055885494,}
```

#### Push #1

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731055885494' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[{"id":"0c34803f-90cd-3119-bc4c-67f0253945ff","_status":"created","_changed":"","title":"0 - Ab assumenda nobis nostrum soluta recusandae.","created_at":1731055829997,"updated_at":1731055829997},{"id":"c24c5ebd-307b-3472-b046-c1c1c4c9e80e","_status":"created","_changed":"","title":"1 - Nesciunt id impedit natus.","created_at":1731055830000,"updated_at":1731055830000}],"updated":[],"deleted":[]},"populate_initial":{"created":[{"id":"qxzJ2XzTeYsf3OVv","_status":"created","_changed":"","title":"todos","populated":true}],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [
      {
        "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
        "_status": "created",
        "_changed": "",
        "title": "0 - Ab assumenda nobis nostrum soluta recusandae.",
        "created_at": 1731055829997,
        "updated_at": 1731055829997
      },
      {
        "id": "c24c5ebd-307b-3472-b046-c1c1c4c9e80e",
        "_status": "created",
        "_changed": "",
        "title": "1 - Nesciunt id impedit natus.",
        "created_at": 1731055830000,
        "updated_at": 1731055830000
      }
    ],
    "updated": [],
    "deleted": []
  },
  "populate_initial": {
    "created": [
      {
        "id": "qxzJ2XzTeYsf3OVv",
        "_status": "created",
        "_changed": "",
        "title": "todos",
        "populated": true
      }
    ],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
200 OK
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T08:51:25.591Z",
  "lastPulledAt": null,
  "lastPulledSchemaVersion": null,
  "localChangeCount": 3,
  "migration": null,
  "newLastPulledAt": 1731055885494,
  "phase": "done",
  "rejectedIds": null,
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T08:51:25.461Z"
}
```

#### Precondition

```plaintext
Local -> update 1 item
Remote -> 0 new data
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731055885494&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731055894052,}
```

#### Push #2

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731055894052' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[],"updated":[{"id":"0c34803f-90cd-3119-bc4c-67f0253945ff","_status":"updated","_changed":"updated_at,title","title":"0 - Ab assumenda nobis nostrum soluta recusandae. - [1731055891239]","created_at":1731055829997,"updated_at":1731055891239}],"deleted":[]},"populate_initial":{"created":[],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [],
    "updated": [
      {
        "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
        "_status": "updated",
        "_changed": "updated_at,title",
        "title": "0 - Ab assumenda nobis nostrum soluta recusandae. - [1731055891239]",
        "created_at": 1731055829997,
        "updated_at": 1731055891239
      }
    ],
    "deleted": []
  },
  "populate_initial": {
    "created": [],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
200 OK
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T08:51:34.067Z",
  "lastPulledAt": 1731055885494,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 1,
  "migration": null,
  "newLastPulledAt": 1731055894052,
  "phase": "done",
  "rejectedIds": null,
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T08:51:34.038Z"
}
```

---

### 2.4 Simulation 4, [Success], Sync with soft deleted local data

Executed sync twice, soft delete local data before 2nd sync

#### Current Condition:

```plaintext
Local -> 2 data unsynced
Remote -> 0 new data
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=null&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731056180629,,}
```

#### Push #1

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731056180629' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[{"id":"0c34803f-90cd-3119-bc4c-67f0253945ff","_status":"created","_changed":"","title":"0 - Ab assumenda nobis nostrum soluta recusandae.","created_at":1731056159444,"updated_at":1731056159444},{"id":"c24c5ebd-307b-3472-b046-c1c1c4c9e80e","_status":"created","_changed":"","title":"1 - Nesciunt id impedit natus.","created_at":1731056159448,"updated_at":1731056159448}],"updated":[],"deleted":[]},"populate_initial":{"created":[{"id":"tK2WNi9mEcynzyAo","_status":"created","_changed":"","title":"todos","populated":true}],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [
      {
        "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
        "_status": "created",
        "_changed": "",
        "title": "0 - Ab assumenda nobis nostrum soluta recusandae.",
        "created_at": 1731056159444,
        "updated_at": 1731056159444
      },
      {
        "id": "c24c5ebd-307b-3472-b046-c1c1c4c9e80e",
        "_status": "created",
        "_changed": "",
        "title": "1 - Nesciunt id impedit natus.",
        "created_at": 1731056159448,
        "updated_at": 1731056159448
      }
    ],
    "updated": [],
    "deleted": []
  },
  "populate_initial": {
    "created": [
      {
        "id": "tK2WNi9mEcynzyAo",
        "_status": "created",
        "_changed": "",
        "title": "todos",
        "populated": true
      }
    ],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
200 OK
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T08:56:20.672Z",
  "lastPulledAt": null,
  "lastPulledSchemaVersion": null,
  "localChangeCount": 3,
  "migration": null,
  "newLastPulledAt": 1731056180629,
  "phase": "done",
  "rejectedIds": null,
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T08:56:20.600Z"
}
```

#### Precondition

```plaintext
Local -> soft delete 1 item
Remote -> 0 new data
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731056180629&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731056187627,}
```

#### Push #2

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731056187627' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[],"updated":[],"deleted":["0c34803f-90cd-3119-bc4c-67f0253945ff"]},"populate_initial":{"created":[],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [],
    "updated": [],
    "deleted": [
      "0c34803f-90cd-3119-bc4c-67f0253945ff"
    ]
  },
  "populate_initial": {
    "created": [],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
200 OK
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T08:56:27.641Z",
  "lastPulledAt": 1731056180629,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 1,
  "migration": null,
  "newLastPulledAt": 1731056187627,
  "phase": "done",
  "rejectedIds": null,
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T08:56:27.619Z"
}
```

---

### 2.5 Simulation 5, [Success], Sync with hard deleted local data

Executed sync twice, hard delete local data before 2nd sync

#### Current Condition:

```plaintext
Local -> 2 data unsynced
Remote -> 0 new data
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=null&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731056979557,}
```

#### Push #1

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731056979557' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[{"id":"0c34803f-90cd-3119-bc4c-67f0253945ff","_status":"created","_changed":"","title":"0 - Ab assumenda nobis nostrum soluta recusandae.","created_at":1731056970628,"updated_at":1731056970628},{"id":"c24c5ebd-307b-3472-b046-c1c1c4c9e80e","_status":"created","_changed":"","title":"1 - Nesciunt id impedit natus.","created_at":1731056970630,"updated_at":1731056970630}],"updated":[],"deleted":[]},"populate_initial":{"created":[{"id":"WJLiBnhNC9h49sja","_status":"created","_changed":"","title":"todos","populated":true}],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [
      {
        "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
        "_status": "created",
        "_changed": "",
        "title": "0 - Ab assumenda nobis nostrum soluta recusandae.",
        "created_at": 1731056970628,
        "updated_at": 1731056970628
      },
      {
        "id": "c24c5ebd-307b-3472-b046-c1c1c4c9e80e",
        "_status": "created",
        "_changed": "",
        "title": "1 - Nesciunt id impedit natus.",
        "created_at": 1731056970630,
        "updated_at": 1731056970630
      }
    ],
    "updated": [],
    "deleted": []
  },
  "populate_initial": {
    "created": [
      {
        "id": "WJLiBnhNC9h49sja",
        "_status": "created",
        "_changed": "",
        "title": "todos",
        "populated": true
      }
    ],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
200 OK
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T09:09:39.585Z",
  "lastPulledAt": null,
  "lastPulledSchemaVersion": null,
  "localChangeCount": 3,
  "migration": null,
  "newLastPulledAt": 1731056979557,
  "phase": "done",
  "rejectedIds": null,
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T09:09:39.538Z"
}
```

#### Precondition

```plaintext
Local -> hard delete 1 item
Remote -> 0 new data
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731056979557&schema_version=2&migration=null
```

Res

```jsonl
{changes: {}, timestamp: 1731056987903,}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-08T09:09:47.909Z",
  "lastPulledAt": 1731056979557,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731056987903,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-08T09:09:47.886Z"
}
```

---

### 2.6 Simulation 6, [Success], Sync with new un-sync-ed remote data

Executed sync twice, 1 new remote data before 1st sync

#### Current Condition:

```plaintext
Local -> 1 item synced
Remote -> 1 new item unsynced
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731264389711&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {
    "todos": {
      "created": [
        {
          "id": "d1c159f7-9755-4c12-8f63-9613aba81141",
          "title": "Title 0 - 1731264414375",
          "created_at": 1731264414374,
          "updated_at": 1731264414374
        }
      ],
      "updated": [],
      "deleted": []
    }
  },
  "timestamp": 1731264414375
}
```

#### Push #1

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T18:46:54.445Z",
  "lastPulledAt": 1731264389711,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731264414375,
  "phase": "done",
  "remoteChangeCount": 1,
  "startedAt": "2024-11-10T18:46:54.351Z"
}
```

#### Precondition

```plaintext
Local -> 2 items synced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731264414375&schema_version=2&migration=null
```

Res

```jsonl
{"changes":{},"timestamp":1731264456957}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T18:47:36.967Z",
  "lastPulledAt": 1731264414375,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731264456957,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-10T18:47:36.937Z"
}
```

---

### 2.7 Simulation 7, [Success], Sync with updated un-sync-ed remote data

Executed sync twice, 1 updated remote data before 1st sync

#### Current Condition:

```plaintext
Local -> 1 item synced
Remote -> 1 updated item unsynced
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731266003114&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {
    "todos": {
      "created": [],
      "updated": [
        {
          "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
          "title": "0 - Ab assumenda nobis nostrum soluta recusandae. - [1731266029891]",
          "updated_at": 1731266029883
        }
      ],
      "deleted": []
    }
  },
  "timestamp": 1731266029891
}
```

#### Push #1

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T19:13:50.015Z",
  "lastPulledAt": 1731266003114,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731266029891,
  "phase": "done",
  "remoteChangeCount": 1,
  "startedAt": "2024-11-10T19:13:49.833Z"
}
```

#### Precondition

```plaintext
Local -> 2 items synced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731266029891&schema_version=2&migration=null
```

Res

```jsonl
{"changes":{},"timestamp":1731266032314}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T19:13:52.321Z",
  "lastPulledAt": 1731266029891,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731266032314,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-10T19:13:52.300Z"
}
```

---

### 2.8 Simulation 8, [Success], Sync with deleted un-sync-ed remote data

Executed sync twice, 1 deleted remote data before 1st sync

#### Current Condition:

```plaintext
Local -> 1 item synced
Remote -> 1 deleted item unsynced
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731267722774&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {
    "todos": {
      "created": [],
      "updated": [],
      "deleted": [
        "0c34803f-90cd-3119-bc4c-67f0253945ff"
      ]
    }
  },
  "timestamp": 1731267735968
}
```

#### Push #1

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T19:42:16.084Z",
  "lastPulledAt": 1731267722774,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731267735968,
  "phase": "done",
  "remoteChangeCount": 1,
  "startedAt": "2024-11-10T19:42:15.921Z"
}
```

#### Precondition

```plaintext
Local -> 0 items synced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731267735968&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731267739204
}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T19:42:19.211Z",
  "lastPulledAt": 1731267735968,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731267739204,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-10T19:42:19.185Z"
}
```

---

### 2.9 Simulation 9, [Success], Sync with un-sync-ed new and updated data from remote

Executed sync twice, 2 new and 1 updated remote data before 1st sync

#### Current Condition:

```plaintext
Local -> 1 item synced
Remote -> 2 new item unsynced, 1 updated item unsyneced
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731270253706&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {
    "todos": {
      "created": [
        {
          "id": "c596db2b-3f5c-4b14-bf98-840c3485fd08",
          "title": "Title 0 - [1731270267616]",
          "created_at": 1731270267613,
          "updated_at": 1731270267613
        },
        {
          "id": "68b6e62e-670e-45d7-8d51-963a3919be91",
          "title": "Title 1 - [1731270267618]",
          "created_at": 1731270267613,
          "updated_at": 1731270267613
        }
      ],
      "updated": [
        {
          "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
          "title": "0 - Ab assumenda nobis nostrum soluta recusandae. - [1731270267623]",
          "updated_at": 1731270267618
        }
      ],
      "deleted": []
    }
  },
  "timestamp": 1731270267623
}
```

#### Push #1

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T20:24:27.726Z",
  "lastPulledAt": 1731270253706,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731270267623,
  "phase": "done",
  "remoteChangeCount": 3,
  "startedAt": "2024-11-10T20:24:27.569Z"
}
```

#### Precondition

```plaintext
Local -> 3 item synced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731270267623&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731270273218
}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T20:24:33.224Z",
  "lastPulledAt": 1731270267623,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731270273218,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-10T20:24:33.200Z"
}
```

---

### 2.10 Simulation 10, [Success], Sync with un-sync-ed new and delete data from remote

Executed sync twice, 2 new and 1 deleted remote data before 1st sync

#### Current Condition:

```plaintext
Local -> 1 item synced
Remote -> 2 new item unsynced, 1 updated item unsyneced
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731270650171&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {
    "todos": {
      "created": [
        {
          "id": "c726e484-ae53-4c82-a3ff-abd45cef25ac",
          "title": "Title 0 - [1731270659651]",
          "created_at": 1731270659651,
          "updated_at": 1731270659651
        },
        {
          "id": "3b0257c6-b610-4fc0-83c0-3412e64b5039",
          "title": "Title 1 - [1731270659652]",
          "created_at": 1731270659651,
          "updated_at": 1731270659651
        }
      ],
      "updated": [],
      "deleted": [
        "0c34803f-90cd-3119-bc4c-67f0253945ff"
      ]
    }
  },
  "timestamp": 1731270659658
}
```

#### Push #1

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T20:30:59.740Z",
  "lastPulledAt": 1731270650171,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731270659658,
  "phase": "done",
  "remoteChangeCount": 3,
  "startedAt": "2024-11-10T20:30:59.552Z"
}
```

#### Precondition

```plaintext
Local -> 2 item synced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731270659658&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731270662122
}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T20:31:02.128Z",
  "lastPulledAt": 1731270659658,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731270662122,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-10T20:31:02.100Z"
}
```

---

### 2.11 Simulation 11, [Success], Sync with malformed new data from remote

Executed sync twice, 1 malformed remote data before 1st sync

#### Current Condition:

```plaintext
Local -> 1 item synced
Remote -> 1 malformed item unsynced
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731272306920&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {
    "todos": {
      "created": [
        {
          "id": "0ed650da-570d-46f6-9ef1-85bc7ee1e43c",
          "created_at": ['1731272319067'],
          "updated_at": 1731272319067
        }
      ],
      "updated": [],
      "deleted": []
    }
  },
  "timestamp": 1731272319161
}
```

#### Push #1

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T20:58:39.237Z",
  "lastPulledAt": 1731272306920,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731272319161,
  "phase": "done",
  "remoteChangeCount": 1,
  "startedAt": "2024-11-10T20:58:39.068Z"
}
```

#### Precondition

```plaintext
Local -> 1 item synced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731272319161&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731272346440
}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T20:59:06.446Z",
  "lastPulledAt": 1731272319161,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731272346440,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-10T20:59:06.350Z"
}
```

---

### 2.12 Simulation 12, [Warning], Sync with un-sync-ed new from remote, same id present in local

Executed sync twice, 1 new remote data before 1st sync, same id present in local
The synchronization will show warning, and the affected data will be updated instead, ignoring tye sync status(whether
the item has been synced or no)

#### Current Condition:

```plaintext
Local -> 1 item synced
Remote -> 1 item unsynced (same id)
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731273152915&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {
    "todos": {
      "created": [
        {
          "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
          "title": "Title 0 - [1731273161235]",
          "created_at": 1731273161235,
          "updated_at": 1731273161235
        }
      ],
      "updated": [],
      "deleted": []
    }
  },
  "timestamp": 1731273161335
}
```

#### Push #1

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T21:12:41.401Z",
  "lastPulledAt": 1731273152915,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731273161335,
  "phase": "done",
  "remoteChangeCount": 1,
  "startedAt": "2024-11-10T21:12:41.330Z"
}
```

#### Warning

```plaintext
[Diagnostic error: [Sync] Server wants client to create record todos#0c34803f-90cd-3119-bc4c-67f0253945ff, but it already exists locally. This may suggest last sync partially executed, and then failed; or it could be a serious bug. Will update existing record instead.]
```

#### Precondition

```plaintext
Local -> 1 item synced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731273161335&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731273173752
}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-10T21:12:53.759Z",
  "lastPulledAt": 1731273161335,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731273173752,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-10T21:12:53.734Z"
}
```

---

### 2.13 Simulation 13, [Warning], Sync with un-sync-ed updated data from remote, not existed in local

Executed sync twice, 1 updated remote data before 1st sync, not existed in local
It will force to create item instead

#### Current Condition:

```plaintext
Local -> 1 item synced
Remote -> 1 updated item unsynced (not existed in local)
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731291065624&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {
    "todos": {
      "created": [],
      "updated": [
        {
          "id": "ac215b03-65e0-441a-9e7a-522ac9c9aade",
          "title": "Title 0 - [1731291081207]",
          "created_at": 1731291081207,
          "updated_at": 1731291081207
        }
      ],
      "deleted": []
    }
  },
  "timestamp": 1731291081234
}
```

#### Push #1

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-11T02:11:21.366Z",
  "lastPulledAt": 1731291065624,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731291081234,
  "phase": "done",
  "remoteChangeCount": 1,
  "startedAt": "2024-11-11T02:11:21.232Z"
}
```

#### Warning

```plaintext
[Diagnostic error: [Sync] Server wants client to update record todos#ac215b03-65e0-441a-9e7a-522ac9c9aade, but it doesn't exist locally. This could be a serious bug. Will create record instead. If this was intentional, please check the flag sendCreatedAsUpdated in https://watermelondb.dev/docs/Sync/Frontend#additional-synchronize-flags]
```

#### Precondition

```plaintext
Local -> 2 item synced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731291081234&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731291111238
}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-11T02:11:51.245Z",
  "lastPulledAt": 1731291081234,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731291111238,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-11T02:11:51.222Z"
}
```

---

### 2.14 Simulation 14, [Success], Sync with un-sync-ed deleted data from remote, not existed in local

Executed sync twice, 1 deleted remote data before 1st sync, not existed in local
will do nothing

#### Current Condition:

```plaintext
Local -> 1 item synced
Remote -> 1 deleted item unsynced (not existed in local)
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731293646859&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {
    "todos": {
      "created": [],
      "updated": [],
      "deleted": [
        "b889d6e2-20de-47b0-ab8c-60cced09d3e0"
      ]
    }
  },
  "timestamp": 1731293658719
}
```

#### Push #1

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-11T02:54:18.747Z",
  "lastPulledAt": 1731293646859,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731293658719,
  "phase": "done",
  "remoteChangeCount": 1,
  "startedAt": "2024-11-11T02:54:18.704Z"
}
```

#### Precondition

```plaintext
Local -> 1 item synced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731293658719&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731293666008
}
```

#### Push #2

Req

```plaintext
Desnt' call push as we dont have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-11T02:54:26.014Z",
  "lastPulledAt": 1731293658719,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": null,
  "newLastPulledAt": 1731293666008,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-11T02:54:25.987Z"
}
```

---

### 2.15 Simulation 15, [Success], Sync with migration involved

Executed sync twice, with db migration after 1st sync

#### Current Condition:

```plaintext
Local -> 1 item unsynced
Remote -> 0 item unsynced

Schema -> 2
  Todos -> { title }
  Populate initial { title, populated }
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=null&schema_version=2&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731312402365
}
```

#### Push #1

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731312402365' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[{"id":"0c34803f-90cd-3119-bc4c-67f0253945ff","_status":"created","_changed":"","title":"0 - Ab assumenda nobis nostrum soluta recusandae.","created_at":1731312353939,"updated_at":1731312353939}],"updated":[],"deleted":[]},"populate_initial":{"created":[{"id":"4sEdaUG1WLBAKy9U","_status":"created","_changed":"","title":"todos","populated":true}],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [
      {
        "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
        "_status": "created",
        "_changed": "",
        "title": "0 - Ab assumenda nobis nostrum soluta recusandae.",
        "created_at": 1731312353939,
        "updated_at": 1731312353939
      }
    ],
    "updated": [],
    "deleted": []
  },
  "populate_initial": {
    "created": [
      {
        "id": "4sEdaUG1WLBAKy9U",
        "_status": "created",
        "_changed": "",
        "title": "todos",
        "populated": true
      }
    ],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
200 OK
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-11T08:06:42.419Z",
  "lastPulledAt": null,
  "lastPulledSchemaVersion": null,
  "localChangeCount": 2,
  "migration": null,
  "newLastPulledAt": 1731312402365,
  "phase": "done",
  "rejectedIds": null,
  "remoteChangeCount": 0,
  "startedAt": "2024-11-11T08:06:42.315Z"
}
```

#### Precondition

```plaintext
Local -> 0 item unsynced
Remote -> 0 item unsynced

Migration 
3
4
5
6
  Todos { picture }
7
  Populate initial { column_3 }
8

Schema -> 3
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731312402365&schema_version=8&migration=%7B%22from%22%3A2%2C%22tables%22%3A%5B%5D%2C%22columns%22%3A%5B%7B%22table%22%3A%22todos%22%2C%22columns%22%3A%5B%22picture%22%5D%7D%2C%7B%22table%22%3A%22populate_initial%22%2C%22columns%22%3A%5B%22column_3%22%5D%7D%5D%7D
https://example.com/pull/sync?last_pulled_at=1731312402365&schema_version=8&migration={"from":2,"tables":[],"columns":[{"table":"todos","columns":["picture"]},{"table":"populate_initial","columns":["column_3"]}]}
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731312518048
}
```

#### Push #2

Req

```plaintext
Doesn't call push as we don't have any changes
```

#### Sync Log

```json
{
  "finishedAt": "2024-11-11T08:08:38.091Z",
  "lastPulledAt": 1731312402365,
  "lastPulledSchemaVersion": 2,
  "localChangeCount": 0,
  "migration": {
    "columns": [
      {},
      {}
    ],
    "from": 2,
    "tables": []
  },
  "newLastPulledAt": 1731312518048,
  "phase": "done",
  "remoteChangeCount": 0,
  "startedAt": "2024-11-11T08:08:38.024Z"
}
```

---

### 2.16 Simulation 16, [Failed], Sync pull unexpected error

Executed sync twice, both pull throws error

#### Current Condition:

```plaintext
Local -> 1 item unsynced
Remote -> 0 item unsynced
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=null&schema_version=8&migration=null
```

Res

```jsonl
Unexpected error
```

#### Push #1

Req

```plaintext
Doesn't call push as the pull throws error
```

#### Sync Log

```json
"Sync error [Error: Pull error occurred]"
```

#### Precondition

```plaintext
Local -> 1 item unsynced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=null&schema_version=8&migration=null
```

Res

```jsonl
Unexpected error
```

#### Push #2

Req

```plaintext
Doesn't call push as the pull throws error
```

#### Sync Log

```json
"Sync error [Error: Pull error occurred]"
```

---

### 2.17 Simulation 17, [Failed], Sync push unexpected error

Executed sync twice, both push throws error

#### Current Condition:

```plaintext
Local -> 1 item unsynced
Remote -> 0 item unsynced
```

#### Pull #1

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=null&schema_version=8&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731319830936
}
```

#### Push #1

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731319830936' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[{"id":"0c34803f-90cd-3119-bc4c-67f0253945ff","_status":"created","_changed":"","title":"0 - Ab assumenda nobis nostrum soluta recusandae.","created_at":1731319787805,"updated_at":1731319787805,"picture":"https://picsum.photos/id/1/200/300"}],"updated":[],"deleted":[]},"populate_initial":{"created":[{"id":"4XRFrYPxIVO2Po4b","_status":"created","_changed":"","title":"todos","populated":true,"column_3":null}],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [
      {
        "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
        "_status": "created",
        "_changed": "",
        "title": "0 - Ab assumenda nobis nostrum soluta recusandae.",
        "created_at": 1731319787805,
        "updated_at": 1731319787805,
        "picture": "https://picsum.photos/id/1/200/300"
      }
    ],
    "updated": [],
    "deleted": []
  },
  "populate_initial": {
    "created": [
      {
        "id": "4XRFrYPxIVO2Po4b",
        "_status": "created",
        "_changed": "",
        "title": "todos",
        "populated": true,
        "column_3": null
      }
    ],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
"Unexpected error"
```

#### Sync Log

```json
"Sync error [Error: Push error occurred]"
```

#### Precondition

```plaintext
Local -> 1 item unsynced
Remote -> 0 item unsynced
```

#### Pull #2

Req

```plaintext
https://example.com/pull/sync?last_pulled_at=1731319830936&schema_version=8&migration=null
```

Res

```jsonl
{
  "changes": {},
  "timestamp": 1731319840396
}
```

#### Push #2

Req

```plaintext
curl 'https://example.com/push/sync?last_pulled_at=1731319840396' \
-X POST \
-H 'Host: example.com' \
-H 'Connection: Keep-Alive' \
-H 'User-Agent: okhttp/4.9.2' \
-H 'Pragma: no-cache' \
-H 'Cache-Control: no-cache' \
-H 'Content-Type: text/plain;charset=UTF-8' \
--data-raw '{"todos":{"created":[{"id":"0c34803f-90cd-3119-bc4c-67f0253945ff","_status":"created","_changed":"","title":"0 - Ab assumenda nobis nostrum soluta recusandae.","created_at":1731319787805,"updated_at":1731319787805,"picture":"https://picsum.photos/id/1/200/300"}],"updated":[],"deleted":[]},"populate_initial":{"created":[{"id":"4XRFrYPxIVO2Po4b","_status":"created","_changed":"","title":"todos","populated":true,"column_3":null}],"updated":[],"deleted":[]}}' \
--proxy http://localhost:9090
```

Req body

```json
{
  "todos": {
    "created": [
      {
        "id": "0c34803f-90cd-3119-bc4c-67f0253945ff",
        "_status": "created",
        "_changed": "",
        "title": "0 - Ab assumenda nobis nostrum soluta recusandae.",
        "created_at": 1731319787805,
        "updated_at": 1731319787805,
        "picture": "https://picsum.photos/id/1/200/300"
      }
    ],
    "updated": [],
    "deleted": []
  },
  "populate_initial": {
    "created": [
      {
        "id": "4XRFrYPxIVO2Po4b",
        "_status": "created",
        "_changed": "",
        "title": "todos",
        "populated": true,
        "column_3": null
      }
    ],
    "updated": [],
    "deleted": []
  }
}
```

Res

```jsonl
"Unexpected error"
```

#### Sync Log

```json
"Sync error [Error: Push error occurred]"
```
