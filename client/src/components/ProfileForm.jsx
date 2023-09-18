import { useSelector } from "react-redux";

import Button from "../components/ui/Button";

const ProfileForm = () => {
  const { user } = useSelector((state) => state.authenticated);

  return (
    <form className="mt-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-sm text-gray-500">
          Name
        </label>
        <input
          type="text"
          value={user?.name}
          className="text-sm text-gray-500 focus:ring-0 py-2 px-2.5 rounded-md border-gray-300 w-full md:w-96"
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="address" className="text-sm text-gray-500">
          Address
        </label>
        <input
          type="text"
          value={user?.addresses[0].address}
          className="text-sm text-gray-500 focus:ring-0 py-2 px-2.5 rounded-md border-gray-300 w-full md:w-96"
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="phone" className="text-sm text-gray-500">
          Phone #
        </label>
        <input
          type="number"
          value={user?.phone}
          className="text-sm text-gray-500 focus:ring-0 py-2 px-2.5 rounded-md border-gray-300 w-full md:w-96"
        />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="phone" className="text-sm text-gray-500">
          Email
        </label>
        <input
          type="email"
          value={user?.email}
          className="text-sm text-gray-500 focus:ring-0 py-2 px-2.5 rounded-md border-gray-300 w-full md:w-96"
        />
      </div>
      <div className="mt-5">
        <Button variant="danger" className="w-16">
          Save
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
