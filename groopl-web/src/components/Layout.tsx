import React from "react";
import NavBar from "./NavBar/navBar";
import { Wrapper } from "./wrapper";

interface LayoutProps {
  children: any;
  variant?: "small" | "regular";
  heading?: string;
  text?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  heading,
  variant = "regular",
  text,
}) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant} heading={heading} text={text}>
        {children}
      </Wrapper>
    </>
  );
};
