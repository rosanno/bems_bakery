const sorts = [
  {
    label: "Name Desc",
    value: "nameDesc",
  },
  {
    label: "Name Asc",
    value: "nameAsc",
  },
  {
    label: "Price High",
    value: "priceHigh",
  },
  {
    label: "Price Low",
    value: "priceLow",
  },
];

const Sorting = ({ onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sorts" className="text-xs md:text-sm text-gray-500">
        Sort By:
      </label>
      <select
        onChange={onChange}
        className="text-xs font-medium bg-gray-400/10 rounded-md py-2 px-3 border-0 w-44"
      >
        {sorts.map((item) => (
          <option key={item.label} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
