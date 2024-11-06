import {Model} from '@nozbe/watermelondb'
import {field, text} from "@nozbe/watermelondb/decorators";

export default class PopulateInitial extends Model {
  static table = 'populate_initial'

  static associations = {}

  @text('title') title!: string;
  @field('populated') completed!: boolean;
}
