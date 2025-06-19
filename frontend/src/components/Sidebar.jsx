function Sidebar({ filters, setFilters }) {
  const brandOptions = [
    "Nike",
    "Samsung",
    "Apple",
    "British Airways",
    "Adidas",
    "Sony",
    "LG",
    "Dell",
  ];

  const toggleSelection = (type, value) => {
    setFilters((prev) => {
      const current = new Set(prev[type]);
      current.has(value) ? current.delete(value) : current.add(value);
      return { ...prev, [type]: [...current] };
    });
  };

  return (
    <div className="w-64 space-y-6">
      <div>
        <h3 className="font-bold mb-2">Brand</h3>
        {brandOptions.map((brand) => (
          <label key={brand} className="block">
            <input
              type="checkbox"
              checked={filters.brands.includes(brand)}
              onChange={() => toggleSelection("brands", brand)}
            />
            <span className="ml-2">{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
