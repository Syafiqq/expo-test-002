import {addColumns, schemaMigrations} from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    //
    {
      toVersion: 2,
      steps: [],
    },
    {
      toVersion: 3,
      steps: [],
    },
    {
      toVersion: 4,
      steps: [],
    },
    {
      toVersion: 5,
      steps: [
        addColumns(
          {
            table: 'todos',
            columns: [{name: 'picture', type: 'string', isOptional: true}],
          },
        ),
      ],
    },
    {
      toVersion: 6,
      steps: [
        addColumns(
          {
            table: 'populate_initial',
            columns: [{name: 'column_3', type: 'string', isOptional: true}],
          },
        ),
      ],
    },
    {
      toVersion: 7,
      steps: [],
    },
    {
      toVersion: 8,
      steps: [],
    },
  ],
})
