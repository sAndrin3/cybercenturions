import {
  Box,
  Flex,
  Heading,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

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
  const [width, setWidth] = useState<number>(typeof window !== "undefined" ? window.innerWidth : 0);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
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
          minW={isMobile ? "xs" : "sm"}
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
