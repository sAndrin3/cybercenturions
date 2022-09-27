import { UsernamePasswordInput } from "./UsernamePasswordInput";

export const ValidateRegister = (options: UsernamePasswordInput) => {
  if (!options.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }
  if (!options.username.match(/^[a-zA-Z0-9]+$/)) {
    return [
      {
        field: "username",
        message: "include only letters and numbers in your username",
      },
    ];
  }
  if (options.username.length <= 2) {
    return [
      {
        field: "username",
        message: "username has to be longer than 2 characters",
      },
    ];
  }
  if (options.password.length <= 7) {
    return [
      {
        field: "password",
        message: "password has to be longer than 8 characters",
      },
    ];
  }

  return null;
};
