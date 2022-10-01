import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  IconButton,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, useState } from "react";

type inputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  isPassword?: boolean;
  rightEl?: any;
  label: string;
  name: string;
  required?: boolean;
};

export const InputField: React.FC<inputFieldProps> = ({
  isPassword,
  rightEl,
  label,
  required,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const [show, setShow] = useState(false);
  const handleIconClick = () => setShow(!show);

  return isPassword ? (
    <>
      <FormControl isInvalid={!!error} isRequired={required}>
        <FormLabel>{label}</FormLabel>
        <InputGroup>
          <Input
            {...field}
            {...props}
            type={show ? "text" : "password"}
            id={field.name}
            placeholder={props.placeholder}
          />
          <InputRightElement h={"full"}>
            <IconButton
              variant={"unstyled"}
              aria-label="Show Password"
              icon={show ? <ViewIcon /> : <ViewOffIcon />}
              onClick={handleIconClick}
            />
          </InputRightElement>
        </InputGroup>
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </>
  ) : (
    <>
      <FormControl isInvalid={!!error} isRequired={required}>
        <FormLabel>{label}</FormLabel>
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
        {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
      </FormControl>
    </>
  );
};
