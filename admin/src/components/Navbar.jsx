import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import { useLogoutMutation } from "../services/bakeryApi";
import { persistor } from "../store";
import { useDispatch } from "react-redux";
import { resetAuthUser } from "../features/authSlice";

const Links = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Category",
    href: "/category",
  },
  {
    label: "Ingredients",
    href: "/ingredients",
  },
  {
    label: "Order",
    href: "/order",
  },
  {
    label: "Products",
    href: "/products",
  },
];

const NavLink = ({ children, pathname, href }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    fontSize="sm"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    backgroundColor={pathname === href && "gray.200"}
    href={href}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const onLogout = async () => {
    await logout();
    persistor.purge();
    dispatch(resetAuthUser());
    navigate("/login");
  };

  return (
    <>
      <Box
        position="fixed"
        zIndex="50"
        top="0"
        left="0"
        right="0"
        bg="white"
        borderBottom="1px"
        borderColor="gray.100"
        px={{ base: "4", xl: "32" }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link
              href="/"
              fontWeight={"bold"}
              _hover={{
                textDecoration: "none",
              }}
            >
              Cake House
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink href={link.href} pathname={pathname} key={link.label}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap="4">
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} src="https://bit.ly/broken-link" />
              </MenuButton>
              <MenuList>
                <MenuItem fontSize={"sm"} onClick={() => navigate("/profile")}>
                  Profile
                </MenuItem>
                <MenuItem fontSize={"sm"} onClick={onLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink href={link.href} key={link.label}>
                  {link.label}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
