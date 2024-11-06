import {tableSchema} from "@nozbe/watermelondb";

const v1 = tableSchema({
  name: 'populate_initial',
  columns: [
    {name: 'title', type: 'string'},
    {name: 'populated', type: 'boolean'},
  ]
});

export default {
  v1,
}
