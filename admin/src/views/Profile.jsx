import { useEffect } from "react";
import { Box, Card, CardBody, Divider, Heading, Text } from "@chakra-ui/react";
import Header from "../components/ui/Header";
import PasswordForm from "../components/PasswordForm";
import ProfileForm from "../components/ProfileForm";
import { useGetUserQuery } from "../services/bakeryApi";
import Progress from "../components/ui/Progress";

const Profile = () => {
  const { data: user, isFetching } = useGetUserQuery();

  useEffect(() => {
    document.title = "Admin | Settings";

    return () => {
      document.title = "Admin";
    };
  }, []);

  return (
    <>
      {isFetching && <Progress />}
      <Box px={{ base: "4", xl: "32" }} mt="28">
        <Header heading="Profile" subHeading="Manage your profile" />

        <Divider mt="2" />

        <Box mt="10">
          <Card>
            <CardBody>
              <Heading as="h1" fontSize={"md"} fontWeight={"semibold"}>
                Profile Information
              </Heading>
              <Text fontSize={"xs"} textColor={"gray.500"} mt={"1"}>
                Update your account&apos;s profile information and email address
              </Text>
              <Box as="div" mt={"5"}>
                <ProfileForm data={user} />
              </Box>
            </CardBody>
          </Card>
        </Box>
        <Box mt="10">
          <Card>
            <CardBody>
              <Heading as="h1" fontSize={"md"} fontWeight={"semibold"}>
                Update Password
              </Heading>
              <Text fontSize={"xs"} textColor={"gray.500"} mt={"1"}>
                Update your account&apos;s password
              </Text>
              <Box as="div" mt={"5"}>
                <PasswordForm />
              </Box>
            </CardBody>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
