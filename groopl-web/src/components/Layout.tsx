import React from "react";
import NavBar from "./NavBar/navBar";
import { Wrapper } from "./FormWrapper";

interface LayoutProps {
  children: any;
  variant?: "small" | "regular";
  heading?: string;
  text?: string;
  top?: boolean 
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  heading,
  variant = "regular",
  text,
  top,
}) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant} heading={heading} text={text} top={top}>
        {children}
      </Wrapper>
    </>
  );
};
