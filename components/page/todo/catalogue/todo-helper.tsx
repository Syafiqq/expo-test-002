import {Database, Q} from "@nozbe/watermelondb";
import {interval, Subscription} from "rxjs";
import Todo from "@/core/data/datasource/local/entity/todo";

export const todoUpdater = (database: Database): Subscription => interval(1000).subscribe({
  next: async (value) => {
    let collection = database.get<Todo>('todos');
    const count = await collection.query().fetchCount();
    let index = value % Math.max(count, 1);
    let todos = await collection.query(Q.where('title', Q.like(`${index} - %`))).fetch();
    if (!todos) {
      return
    }
    let todo = todos[0];
    if (!todo) {
      return
    }
    await database.write(async () => {
      await todo.update((record) => {
        let newTitle = record.title
        let match = newTitle.match(/\[\d+]/)
        if (match) {
          newTitle = newTitle.replace(match[0], `[${value}]`)
        } else {
          newTitle = `${newTitle} - [${value}]`
        }
        record.title = newTitle
      })
    })
  }
})

export const todoAppender = (database: Database): Subscription => interval(5000).subscribe({
  next: async (value) => {
    let collection = database.get<Todo>('todos');
    const count = await collection.query().fetchCount();
    await database.write(async () => {
      await collection.create((record) => {
        let now = new Date()
        record.title = `${count + 1} - Title`
        record.description = `${count + 1} - Description`
        record.completed = false
        record.createdAt = now
        record.updatedAt = now
        record.dueDate = now
        record.priority = 'low'
      })
    })
  }
})
