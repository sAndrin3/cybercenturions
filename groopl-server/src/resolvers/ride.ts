import { Ride } from "../entitites/Ride";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { IsAuth } from "../middlewares/isAuth";
import { User } from "../entitites/User";
import { dataSource } from "../constants";

@InputType()
class RideInput {
  @Field()
  to: string;

  @Field()
  from: string;

  @Field()
  when: Date;

  @Field()
  seats: number;
}

@Resolver(Ride)
export class RideResolver {
  @FieldResolver(() => User)
  creator(@Root() ride: Ride, @Ctx() { userLoader }: MyContext) {
    const user = userLoader.load(ride.creatorId);
    console.log(user);
    return user;
  }

  @Mutation(() => Ride)
  @UseMiddleware(IsAuth)
  async createRide(
    @Arg("input", () => RideInput) input: RideInput,
    @Ctx() { req }: MyContext
  ): Promise<Ride> {
    return Ride.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Query(() => [Ride])
  rides(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<Ride[]> {
    const capLimit = Math.min(50, limit);
    const qb = dataSource
      .getRepository(Ride)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(capLimit);
    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    return qb.getMany();
  }

  @Query(() => Ride, { nullable: true })
  ride(@Arg("id", () => Int) id: number): Promise<Ride | null> {
    return Ride.findOne({ where: { id } });
  }

  @Mutation(() => Boolean)
  async deleteRide(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Ride.delete({ id });
    return true;
  }
}
