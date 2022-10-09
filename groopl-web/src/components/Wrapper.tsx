import {
  Box,
  Flex,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

interface wrapperProps {
  children: any;
  variant?: "small" | "regular";
  top?: boolean;
}

export const Wrapper: React.FC<wrapperProps> = ({
  children,
  variant = "regular",
  top,
}) => {
  return (
    <Flex
      minH={"100vh"}
      align={top ? "start" : "center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={8}
        mx={"auto"}
        maxW={variant === "small" ? "md" : "lg"}
        py={2}
        px={0}
      >
        <Box
          minW={
            variant == "regular"
              ? { base: "xs", md: "lg" }
              : { base: "xs", md: "sm" }
          }
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
