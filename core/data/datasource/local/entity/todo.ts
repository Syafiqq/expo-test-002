import {Model} from '@nozbe/watermelondb'
import {date, field, text} from "@nozbe/watermelondb/decorators";

export default class Todo extends Model {
  static table = 'todos'

  static associations = {}

  @text('title') title!: string;
  @text('description') description: string | undefined;
  @field('completed') completed!: boolean;
  @date('created_at') createdAt!: Date;
  @date('updated_at') updatedAt!: Date;
  @date('due_date') dueDate: Date | undefined;
  @text('priority') priority!: string;
}
