import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useLoginMutation } from "@/services/cakeApi";
import { setAccessToken } from "@/features/auth/authSlice";
import Input from "@/components/ui/Input";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data) => {
    const response = await login(data);

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
    <div className="flex justify-center items-center h-screen px-3">
      <div className="bg-white shadow-md rounded-md w-96 h-96 p-4">
        <h1 className="text-2xl text-[#F8605F] font-bold">Sign in</h1>
        <div className="mt-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3 mb-5">
              <Input
                label="Email"
                type="email"
                register={register}
                errors={errors}
                name="email"
              />
              <Input
                label="Password"
                type="password"
                register={register}
                errors={errors}
                name="password"
              />
            </div>
            <button
              disabled={isLoading}
              className={`bg-rose-600 hover:bg-rose-700 transition-colors duration-300 w-full text-white px-5 py-1.5 rounded-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Sign in
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            Don&apos;t have account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
