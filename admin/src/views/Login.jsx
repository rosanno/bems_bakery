import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@chakra-ui/react";
import { useLoginMutation } from "../services/bakeryApi";
import { setToken } from "../features/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const [login, { isLoading }] = useLoginMutation();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const onSubmit = async (data) => {
    const res = await login(data);
    dispatch(setToken({ token: res?.data?.accessToken }));
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
