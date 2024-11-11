import {tableSchema} from "@nozbe/watermelondb";

const v1 = tableSchema({
  name: 'populate_initial',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'populated', type: 'boolean'},
  ]
});

const v2 = tableSchema({
  name: 'populate_initial',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'populated', type: 'boolean'},
    {name: 'column_3', type: 'string', isOptional: true},
  ]
});

export default {
  v1,
  v2,
}
