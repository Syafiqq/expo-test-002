import {tableSchema} from "@nozbe/watermelondb";

const v1 = tableSchema({
  name: 'todos',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
  ]
});

const v2 = tableSchema({
  name: 'todos',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
  ]
});

export default {
  v1,
  v2,
}
