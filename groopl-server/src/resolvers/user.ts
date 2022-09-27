import { User } from "../entitites/User";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { COOKIE_NAME } from "../constants";
import { UsernameEmailPasswordInput } from "../utils/UsernamePasswordInput";
import { ValidateRegister } from "../utils/validateRegister";

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => Boolean)
  async forgotPassword() {
    // @Ctx() {em}: MyContext // @Arg('email') email: string,
    // const user = await em.findOne(User, { email })
    return true;
  }
  //who am i
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    //if you are NOT logged in
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  //REGISTER
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernameEmailPasswordInput,
    @Ctx() { req, em }: MyContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {
      email: options.email,
      username: options.username,
      password: hashedPassword,
    });
    const errors = ValidateRegister(options);
    if (errors) {
      return { errors };
    }
    try {
      await em.persistAndFlush(user);
    } catch (err) {
      if (err.code === "23505") {
        return {
          errors: [
            {
              field: "username",
              message: "that username is already taken",
            },
          ],
        };
      }
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  //LOGIN
  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const isEmail = usernameOrEmail.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    const user = await em.findOne(
      User,
      isEmail ? { email: usernameOrEmail } : { username: usernameOrEmail }
    );
    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: isEmail
              ? "that email doesn't exist"
              : "that username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;
    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) => {
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }
}
