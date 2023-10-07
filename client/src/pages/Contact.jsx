import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import { useSendMessageMutation } from "@/services/cakeApi";
import Button from "@/components/ui/Button";

const Contact = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const onSubmit = async (data) => {
    const response = await sendMessage({ data });
    if (response.data) {
      toast.success(response.data.message, {
        style: {
          fontSize: "13px",
        },
      });
      reset();
    }
  };

  return (
    <div className="relative">
      <div
        className="aspect-[2.4/1] lg:aspect-[3.5/1] bg-cover relative"
        style={{
          backgroundImage: "url(/assets/bg-contact.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="mx-auto max-w-7xl px-3 pt-20">
          <div className="flex justify-center items-center h-[300px] relative z-10">
            <h2 className="text-white text-3xl md:text-4xl font-bold uppercase pointer-events-none">
              Contact Us
            </h2>
          </div>
        </div>
      </div>
      <div className="mt-8 mx-auto max-w-7xl px-3">
        <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 lg:col-span-7"
          >
            <h2 className="text-2xl font-semibold">Get in touch</h2>
            <Input
              label="Name"
              type="text"
              register={register}
              errors={errors}
              name="name"
            />
            <Input
              label="Email"
              type="email"
              register={register}
              errors={errors}
              name="email"
            />
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm text-gray-500">Message</label>
              <textarea
                rows="5"
                {...register("messages", {
                  required: "Messages field is required",
                })}
                placeholder="Messages..."
                className={`input ${
                  errors.messages && "border border-red-500"
                }`}
              ></textarea>
              {errors.messages && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.messages.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              variant="danger"
              className="w-28"
              disabled={isLoading}
            >
              Send
            </Button>
          </form>
          <div className="border-t lg:border-t-0 lg:border-l h-full lg:pl-10 mt-10 lg:mt-0 lg:mb-0 lg:col-span-4">
            <div className="mt-5">
              <h3 className="text-lg font-bold">
                Let&apos;s talk about everything.
              </h3>
              <p className="text-xs text-gray-400/90 leading-5 mt-4">
                Have a question, a custom order in mind, or just want to say
                hello? We&apos;d love to hear from you! Feel free to get in
                touch using the contact form below, and we&apos;ll get back to
                you as soon as possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
