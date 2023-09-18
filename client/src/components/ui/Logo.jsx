import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <img src="/assets/logo.png" alt="" className="h-7 w-7" />
      <p className="font-bold text-[#F8605F] hidden md:block">Cake House</p>
    </Link>
  );
};

export default Logo;
