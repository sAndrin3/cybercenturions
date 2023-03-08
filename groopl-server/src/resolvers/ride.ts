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
  ObjectType,
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

@ObjectType()
class PaginatedRides {
  @Field(() => [Ride])
  rides: Ride[];
  @Field()
  hasMore: boolean;
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
    input.seats = parseFloat(input.seats.toString());
    return Ride.create({
      ...input,
      creatorId: req.session.userId,
    }).save();
  }

  @Query(() => PaginatedRides)
  async rides(
    @Arg("limit", () => Int) limit: number,
    @Arg("cursor", () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedRides> {
    const capLimit = Math.min(50, limit);
    const reaLimitPlusOne = capLimit + 1;
    const qb = dataSource
      .getRepository(Ride)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(reaLimitPlusOne);
    if (cursor) {
      qb.where('"createdAt" < :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }

    const rides = await qb.getMany();

    return {
      rides: rides.slice(0, capLimit),
      hasMore: rides.length === reaLimitPlusOne,
    };
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
