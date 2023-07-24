import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useLoginMutation } from "../services/bakeryApi";
import { setToken } from "../features/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const token = useSelector((state) => state.auth.token);
  const [login, { isLoading }] = useLoginMutation();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  if (token) {
    return <Navigate to="/" />;
  }

  const onSubmit = async (data) => {
    const res = await login(data);
    if (res?.data?.accessToken) {
      dispatch(setToken({ token: res?.data?.accessToken }));
    }

    if (res?.error?.status === 404 || res?.error?.status === 401) {
      toast({
        title: `${res?.error?.data.message}`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} width={"md"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize="3xl" fontWeight={"semibold"}>
            Login
          </Heading>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => <Input type="email" {...field} />}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => <Input type="password" {...field} />}
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  isLoading={isLoading}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
