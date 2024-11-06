import {addColumns, schemaMigrations} from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    //
    {
      toVersion: 2,
      steps: [
        addColumns({
          table: 'todos',
          columns: [
            {name: 'picture', type: 'string', isOptional: true},
          ],
        }),
      ],
    },
  ],
})
