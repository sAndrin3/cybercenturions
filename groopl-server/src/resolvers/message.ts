import { Message } from "../entitites/Message";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from "type-graphql";
import { MyContext } from "../types";
import { IsAuth } from "../middlewares/isAuth";

@Resolver(Message)
export class MessageResolver {
  @Mutation()
  @UseMiddleware(IsAuth)
  async sendMessage(
    @Arg("receiver_id", () => Int) receiver_id: number,
    @Arg("text", () => String) text: string,
    @Arg("is_read", () => Boolean) is_read: boolean,
    @Ctx() { req }: MyContext,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    const msg = await Message.create({
      sender_id: req.session.userId,
      receiver_id: receiver_id,
      is_read: is_read,
      text: text,
    }).save();

    const payload = { message: msg };
    await pubSub.publish("MESSAGES", payload);

    return true;
  }

  @Subscription({ topics: "MESSAGES" })
  newMessage(
    @Root() messagePayload: { message: Message },
    @Arg("sender_id", () => Int) sender_id: number,
    @Arg("receiver_id", () => Int) receiver_id: number
  ): Message | null {
    if (
      messagePayload.message.sender_id == sender_id &&
      messagePayload.message.receiver_id == receiver_id
    ) {
      return messagePayload.message;
    }
    return null;
  }
}
