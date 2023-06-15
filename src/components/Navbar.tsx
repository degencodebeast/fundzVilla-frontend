import {
  Box,
  Flex,
  HStack,
  Button,
  Text,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Image,
  Icon,
  IconButton,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { RiFlashlightFill } from "react-icons/ri";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const navLinks = [
  { name: "Governance", path: "/governance" },
  { name: "Campaigns", path: "/campaigns" },
  { name: "Community", path: "#" },
];

const dropdownLinks = [
  {
    name: "Blog",
    path: "#",
  },
  {
    name: "Documentation",
    path: "#",
  },
  {
    name: "Github Repo",
    path: "#",
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="relative bg-black shadow-2xl pb-5 " px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between" mx="auto">
        <Link href="/">
          <Box mt={5}>
            <Image boxSize="160px" src="/main.svg" alt="Logo" />{" "}
          </Box>
        </Link>

        <HStack spacing={8} alignItems="center">
          <HStack
            as="nav"
            spacing={9}
            color={"white.700"}
            display={{ base: "none", md: "flex" }}
            alignItems="center"
            mt={5}
          >
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} onClose={onClose} />
            ))}
          </HStack>
        </HStack>
        <HStack as="nav" display={{ base: "none", md: "flex" }} mt={5}>
          <ConnectButton showBalance={false} />
        </HStack>

        <IconButton
          size="md"
          icon={isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          aria-label="Open Menu"
          display={{ base: "inherit", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>

      {/* Mobile Screen Links */}
      {isOpen ? (
        <>
          <Box pb={4} display={{ base: "inherit", md: "none" }}>
            <Stack as="nav" spacing={2}>
              {navLinks.map((link, index) => (
                <NavLink key={index} {...link} onClose={onClose} />
              ))}
            </Stack>

            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={{
                smallScreen: false,
                largeScreen: true,
              }}
            />
          </Box>
        </>
      ) : null}
    </Box>
  );
}

// NavLink Component
interface NavLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const NavLink = ({ name, path, onClose }: NavLinkProps) => {
  return (
    <Link
      href={path}
      lineHeight="inherit"
      color={"white"}
      _hover={{
        textDecoration: "none",
        color: useColorModeValue("blue.500", "blue.200"),
      }}
      onClick={() => onClose()}
    >
      {name}
    </Link>
  );
};

// Dropdown MenuLink Component
interface MenuLinkProps {
  name: string;
  path: string;
  onClose: () => void;
}

const MenuLink = ({ name, path, onClose }: MenuLinkProps) => {
  return (
    <Link href={path} onClick={() => onClose()}>
      <MenuItem
        _hover={{
          color: "blue.400",
          bg: useColorModeValue("white.200", "white.700"),
        }}
      >
        <Text>{name}</Text>
      </MenuItem>
    </Link>
  );
};
