import {appSchema} from '@nozbe/watermelondb'
import todos from './schemas/todo'
import populateInitial from './schemas/populate-initial'

export default appSchema({
  version: 2,
  tables: [
    todos.v2,
    populateInitial.v1,
  ],
})
