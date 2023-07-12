const Input = ({ type, name, placeholder, register, icon }) => {
  return (
    <div className="w-full bg-gray-100 my-4 rounded-md flex items-center px-1.5">
      <div className="bg-white p-2 rounded-md">{icon}</div>
      <input
        type={type}
        {...register(name, { required: true })}
        placeholder={placeholder}
        className="bg-transparent w-full outline-none py-3 px-2 text-sm"
      />
    </div>
  );
};

export default Input;
