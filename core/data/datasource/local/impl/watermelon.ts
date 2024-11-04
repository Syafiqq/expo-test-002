import {Database} from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import {migrations, schema} from "@/core/data/datasource/local/impl/watermelon.d";
import Todo from "@/core/data/datasource/local/entity/todo";

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  dbName: 'myapp',
  jsi: false,
  onSetUpError: error => {

  }
})

const database = new Database({
  adapter,
  modelClasses: [
    Todo,
  ],
})

export default database;
