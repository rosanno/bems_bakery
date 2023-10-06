import { BsWallet2, BsTruck, BsFileEarmarkText } from "react-icons/bs";

const Process = () => {
  return (
    <section className="sm:p-6 lg:p-8 mt-16 lg:mt-20">
      <div className="flex flex-col items-center justify-center text-center my-10">
        <h2 className="text-2xl lg:text-3xl font-bold capitalize mt-2">
          How it works
        </h2>
        <h3 className="text-sm pt-2.5 text-gray-500">
          Overview of the Process
        </h3>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-10 px-20">
        <div className="rounded-md pl-5 pr-2 pt-10 h-[260px]">
          <BsFileEarmarkText className="text-4xl text-rose-400" />
          <div className="pt-5">
            <h1 className="text-sm text-gray-400">Step 1</h1>
            <h2 className="pt-2 text-lg font-medium">Add to Cart</h2>
            <div className="pt-4">
              <p className="text-sm">
                Select your desired cake to add it to your shopping cart.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-rose-500 rounded-md pl-5 pr-2 pt-10 h-[260px]">
          <BsWallet2 className="text-4xl text-white" />
          <div className="pt-5">
            <h1 className="text-sm text-gray-100">Step 2</h1>
            <h2 className="pt-2 text-white text-lg">Checkout</h2>
          </div>
          <div className="pt-4">
            <p className="text-sm text-gray-100">
              Please review your selected items and proceed to complete your
              purchase.
            </p>
          </div>
        </div>
        <div className="rounded-md pl-5 pr-2 pt-10 h-[260px]">
          <BsTruck className="text-4xl text-rose-400" />
          <div className="pt-5">
            <h1 className="text-sm text-gray-400">Step 3</h1>
            <h2 className="pt-2 text-lg font-medium">Wait for Delivery</h2>
            <div className="pt-4">
              <p className="text-sm">
                Relax and anticipate the arrival of your order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
