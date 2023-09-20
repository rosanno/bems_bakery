import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useUpdateUserMutation } from "../services/cakeApi";
import Button from "../components/ui/Button";
import Input from "./ui/Input";
import useScrollTop from "../hooks/useScrollTop";

const ProfilePasswordForm = () => {
  const [updateProfile, { isLoading: isUpdateLoading }] =
    useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useScrollTop();

  const onSubmit = async (data) => {
    if (data.password !== data.confirm_password) {
      toast.error("Password did not match!", {
        style: {
          fontSize: "12px",
        },
      });
      return;
    }

    const response = await updateProfile({ data });
    if (response) {
      toast.success("password updated", {
        style: {
          fontSize: "13px",
        },
      });
      reset();
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
