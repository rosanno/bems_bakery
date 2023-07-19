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
import { BsBell } from "react-icons/bs";

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
    label: "Products",
    href: "/products",
  },
  {
    label: "Order",
    href: "/order",
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
    const res = await logout();
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
            <Box>Admin</Box>
            <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
              {Links.map((link) => (
                <NavLink href={link.href} pathname={pathname} key={link.label}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap="4">
            <IconButton backgroundColor="transparent">
              <BsBell size="20" />
            </IconButton>
            <Menu>
              <MenuButton as={Button} rounded={"full"} variant={"link"} cursor={"pointer"} minW={0}>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
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
