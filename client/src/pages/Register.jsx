import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useRegisterMutation } from "../services/cakeApi";
import { setAccessToken } from "../features/auth/authSlice";
import Input from "../components/ui/Input";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signup, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data) => {
    const response = await signup(data);

    if (response.error) {
      toast.error(response.error.data.message);
      return;
    }

    dispatch(
      setAccessToken({
        accessToken: response.data.accessToken,
      })
    );
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen px-3 my-20 md:my-0 lg:my-0 md:pt-10">
      <div className="bg-white shadow-md rounded-md w-96 md:w-auto h-auto p-6">
        <h1 className="text-2xl text-[#F8605F] font-bold">Sign up</h1>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3 mb-5">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <Input
                  label="Name"
                  type="text"
                  register={register}
                  errors={errors}
                  name="name"
                />
                <Input
                  label="Address"
                  type="text"
                  register={register}
                  errors={errors}
                  name="address"
                />
              </div>
              <Input
                label="Phone #"
                type="number"
                register={register}
                errors={errors}
                name="phone"
              />
              <Input
                label="Email"
                type="email"
                register={register}
                errors={errors}
                name="email"
              />
              <div className="flex flex-col md:flex-row items-center gap-3">
                <Input
                  label="Password"
                  type="password"
                  register={register}
                  errors={errors}
                  name="password"
                />
                <Input
                  label="Confirm Password"
                  type="password"
                  register={register}
                  errors={errors}
                  name="confirm password"
                />
              </div>
            </div>
            <button
              disabled={isLoading}
              className={`bg-rose-600 hover:bg-rose-700 transition-colors duration-300 w-full text-white px-5 py-1.5 rounded-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Sign up
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Already have account?{" "}
            <Link to="/login" className="underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
