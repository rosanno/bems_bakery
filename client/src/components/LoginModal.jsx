import { MdLockOutline, MdOutlineMail } from "react-icons/md";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input from "./ui/Input";
import Modal from "./ui/Modal";
import { useLoginMutation } from "../services/bakeryApi";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../features/authSlice";
import { closeModal } from "../features/modalSlice";

const LoginModal = () => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (crendentials) => {
    const result = await login(crendentials);

    reset();
    dispatch(setCurrentUser(result?.data));
    dispatch(closeModal());
  };

  return (
    <Modal title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="email"
          name="email"
          placeholder="email"
          register={register}
          icon={<MdOutlineMail />}
        />
        <Input
          type="password"
          name="password"
          placeholder="password"
          register={register}
          icon={<MdLockOutline />}
        />
        <button
          disabled={isLoading}
          className="bg-[#212121] border-[#212121] disabled:cursor-not-allowed text-white w-full mt-2 py-2.5 rounded-md"
        >
          Login
        </button>
      </form>
      <div className="my-6 relative">
        <div className="border-t border-gray-200" />
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 bg-white text-sm text-gray-400">
          Or
        </span>
      </div>
      <button className="w-full text-sm rounded-md shadow-sm border py-2.5 bg-white hover:bg-gray-200/40 transition-all duration-300">
        Sign in with google
      </button>
      <div className="mt-3 text-center">
        <span className="text-sm text-gray-400">
          Don&apos;t you have an account?{" "}
          <Link to="/signup" className="text-black font-s underline">
            Sign up
          </Link>
        </span>
      </div>
    </Modal>
  );
};

export default LoginModal;
