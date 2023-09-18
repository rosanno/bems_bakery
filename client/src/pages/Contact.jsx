import React from "react";
import Container from "../components/ui/Container";

const Contact = () => {
  return (
    <div className="relative">
      <div
        className="aspect-[2.4/1] lg:aspect-[3.5/1] bg-cover relative"
        style={{
          backgroundImage: "url(/assets/bg-contact.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <Container>
          <div className="flex justify-center items-center h-[300px] relative z-10">
            <h2 className="text-white text-3xl md:text-4xl font-bold uppercase pointer-events-none">
              Contact Us
            </h2>
          </div>
        </Container>
      </div>
      <div className="mt-8 mx-auto max-w-7xl px-3">
        <div className="lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <form className="space-y-4 lg:col-span-7">
            <h2 className="text-2xl font-semibold">Get in touch</h2>
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm text-gray-500">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm text-gray-500">Email</label>
              <input
                type="email"
                placeholder="Enter your email address"
                className="input"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1.5 text-sm text-gray-500">Message</label>
              <textarea
                rows="5"
                placeholder="Messages..."
                className="input"
              ></textarea>
            </div>
            <button className="bg-rose-600 hover:bg-rose-700 transition-colors duration-300 text-white text-sm font-semibold px-6 py-2.5 rounded-md">
              Submit
            </button>
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
