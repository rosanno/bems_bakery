const Input = ({ label, type, register, errors, name }) => {
  return (
    <div className="flex flex-col gap-2 pb-1 w-full">
      <label className="text-gray-500 text-sm">{label}</label>
      <input
        type={type}
        {...register(name, { required: `${label} is required` })}
        className={`py-2 px-2.5 text-sm rounded-md focus:ring-0 outline-none border ${
          errors[name] ? "border-red-500" : "border-gray-300/60"
        } bg-gray-100/60`}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;
