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

const v3 = tableSchema({
  name: 'todos',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'created_at', type: 'number'},
    {name: 'updated_at', type: 'number'},
    {name: 'picture', type: 'string', isOptional: true},
  ]
});

export default {
  v1,
  v2,
  v3,
}
