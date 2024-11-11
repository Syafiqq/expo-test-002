import {appSchema} from '@nozbe/watermelondb'
import todos from './schemas/todo'
import populateInitial from './schemas/populate-initial'

export default appSchema({
  version: 8,
  tables: [
    todos.v3,
    populateInitial.v2,
  ],
})
