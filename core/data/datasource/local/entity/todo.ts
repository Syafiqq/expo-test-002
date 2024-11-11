import {Model} from '@nozbe/watermelondb'
import {date, readonly, text} from "@nozbe/watermelondb/decorators";
import TodoEntity from "@/core/domain/entity/todo-entity";

export default class Todo extends Model implements TodoEntity {
  static table = 'todos'

  static associations = {}

  @text('title') title!: string;
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
}
