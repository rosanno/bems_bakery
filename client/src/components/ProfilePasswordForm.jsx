import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useGetUserQuery, useUpdateUserMutation } from "../services/cakeApi";
import Button from "../components/ui/Button";
import Input from "./ui/Input";

const ProfilePasswordForm = () => {
  const { data } = useGetUserQuery();
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const response = await updateProfile({ data });
    if (response) {
      toast.success("info updated", {
        style: {
          fontSize: "13px",
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <div className="md:w-96 mt-2">
        <Input
          label="New Password"
          type="password"
          register={register}
          errors={errors}
          name="password"
        />
      </div>
      <div className="md:w-96 mt-2">
        <Input
          label="Confirm Password"
          type="password"
          register={register}
          errors={errors}
          name="confirm_password"
        />
      </div>
      <div className="mt-5">
        <Button type="submit" variant="danger" disabled={isUpdateLoading}>
          update
        </Button>
      </div>
    </form>
  );
};

export default ProfilePasswordForm;
