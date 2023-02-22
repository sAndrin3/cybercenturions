import { Message } from "../entitites/Message";
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { MyContext } from "../types";
import { IsAuth } from "../middlewares/isAuth";

@Resolver(Message)
export class MessageResolver {
  @Mutation(() => Message)
  @UseMiddleware(IsAuth)
  async sendMessage(
    @Arg("receiver_id", () => Int) receiver_id: number,
    @Arg("text", () => String) text: string,
    @Arg("is_read", () => Boolean) is_read: boolean,
    @Ctx() { req }: MyContext
  ) {
    return Message.create({
      sender_id: req.session.userId,
      receiver_id: receiver_id,
      is_read: is_read,
      text: text,
    }).save();
  }
}
