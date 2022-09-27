import {
  Box,
  Flex,
  IconButton,
  Collapse,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Logo from "../../assets/images/logos/groopl.svg";
import Image from "next/image";
import { useLogoutMutation, useMeQuery } from "../../generated/graphql";
import { DesktopNav } from "./desktopNav";
import { NavItem } from "./navItem";
import { MobileNav } from "./mobileNav";
import { LoginRegisterFragment } from "./userFragments/loginRegisterFragment";
import { AccountFragment } from "./userFragments/accountFragment";
import { isServer } from "../../utils/isServer";

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  
  const [, logout] = useLogoutMutation();

  let body;

  if (fetching) {
    //body is null
    body = null;
  } else if (!data?.me?.username) {
    //set body to signup or login
    body = LoginRegisterFragment({ props: {} });
  } else if (data.me.username) {
    const username = data.me.username;
    body = AccountFragment({ username, logout });
  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 8 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Image src={Logo} priority={true} />
          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav NAV_ITEMS={NAV_ITEMS} />
          </Flex>
        </Flex>
        {body}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav NAV_ITEMS={NAV_ITEMS} />
      </Collapse>
    </Box>
  );
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Inspiration",
    children: [
      {
        label: "Explore Design Work",
        subLabel: "Trending Design to inspire you",
        href: "#",
      },
      {
        label: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    label: "Find Work",
    children: [
      {
        label: "Job Board",
        subLabel: "Find your dream design job",
        href: "#",
      },
      {
        label: "Freelance Projects",
        subLabel: "An exclusive list for contract work",
        href: "#",
      },
    ],
  },
  {
    label: "Learn Design",
    href: "#",
  },
  {
    label: "Hire Designers",
    href: "#",
  },
];
