import {
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface wrapperProps {
  children: any;
  variant?: "small" | "regular";
  text?: string;
  heading?: string;
}

export const Wrapper: React.FC<wrapperProps> = ({
  children,
  variant = "regular",
  text = "",
  heading,
}) => {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={variant === "small" ? "md" : "lg"}
        py={12}
        px={6}
      >
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {heading}
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            {text}
          </Text>
        </Stack>
        <Box
          minW={{base:"xs" , md:"sm"}}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>{children}</Stack>
        </Box>
      </Stack>
    </Flex>
  );
};
