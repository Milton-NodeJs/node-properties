import { Field, ObjectType, InputType,ID } from 'type-graphql';
import { getModelForClass, prop } from "@typegoose/typegoose";
import * as mongoose from "mongoose";
@ObjectType()

export class Todo {
  @Field(() => ID) //4
  @prop()
  id!: mongoose.ObjectId;

  @Field()
  @prop()
  title: string

  @Field()
  @prop()
  description: string

  @Field()
  @prop()
  status: boolean
}
export const TodoModel = getModelForClass<typeof Todo>(Todo);

@InputType()
export class TodoInput implements Partial<Todo> {
  @Field()
  title: string

  @Field()
  description: string
}

