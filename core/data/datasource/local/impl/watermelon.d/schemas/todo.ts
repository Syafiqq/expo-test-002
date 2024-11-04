import {tableSchema} from "@nozbe/watermelondb";

const v1 = tableSchema({
  name: 'todos',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'description', type: 'string', isOptional: true},
    {name: 'completed', type: 'boolean'},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
    {name: 'due_date', type: 'number', isOptional: true},
    {name: 'priority', type: 'string'},
  ]
});

export default {
  v1
}
