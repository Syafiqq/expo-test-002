import {Database} from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import {migrations, schema} from "@/core/data/datasource/local/impl/watermelon.d";
import Todo from "@/core/data/datasource/local/entity/todo";
import PopulateInitial from "@/core/data/datasource/local/entity/populate-initial";

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
    PopulateInitial,
  ],
})

export default database;
