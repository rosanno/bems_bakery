import { useGetProductsQuery } from "../services/bakeryApi";

const Home = () => {
  const { data: products } = useGetProductsQuery();

  return (
    <>
      <section>
        <header className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5507696/pexels-photo-5507696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="w-full md:h-[790px] object-cover"
          />
          <div className="bg-black/50 md:h-[790px] absolute z-10 inset-0" />
        </header>
      </section>
      <section>
        
      </section>
    </>
  );
};

export default Home;
