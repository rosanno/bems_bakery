import Container from "../components/ui/Container";
import { useGetOrdersQuery } from "../services/cakeApi";
import OrderItem from "../components/OrderItem";
import useScrollTop from "../hooks/useScrollTop";
import Loader from "../components/Loader";

const Orders = () => {
  const { data: orders, error, isLoading } = useGetOrdersQuery();

  useScrollTop();

  return (
    <Container>
      <section className="mt-3 md:mt-6">
        <h1 className="text-xl md:text-2xl font-semibold capitalize">Orders</h1>
        {isLoading && (
          <div className="flex items-center justify-center h-[450px]">
            <Loader label="loading orders.." />
          </div>
        )}
        <div className="px-4 py-4 sm:px-6 lg:px-7">
          {orders?.order?.orderItems?.length === 0 || error ? (
            <div className="flex flex-col justify-center items-center h-96">
              <img src="/assets/ordered.svg" alt="" className="w-72" />
              <h3 className="text-base text-neutral-500 font-medium mt-3">
                No orders
              </h3>
            </div>
          ) : (
            <div className="mt-6 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
              <div className="lg:col-span-full">
                <ul>
                  {orders?.order?.orderItems?.map((item) => (
                    <OrderItem key={item._id} item={item} />
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </Container>
  );
};

export default Orders;
