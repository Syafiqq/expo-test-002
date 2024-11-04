import {appSchema} from '@nozbe/watermelondb'
import todos from './schemas/todo'

export default appSchema({
  version: 1,
  tables: [
    todos.v1,
  ],
})
