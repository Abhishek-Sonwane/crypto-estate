import React from "react";

const CurrencyConvertor = () => {
  return (
    <section>
      <div className="max-w-xs flex items-center justify-center">
        <div className="flex flex-nowrap">
          <input
            type="number"
            className="outline-none bg-slate-200 px-6 py-3 h-14 decoration-0 border border-gray-300 border-r-0 "
          />
          <select className="outline-none bg-slate-200 px-6 py-3 h-14 decoration-0 border border-gray-300 border-l-0 ">
            <option value="inr">Indian Rupees</option>
            <option value="usd">USD Dollar</option>
          </select>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConvertor;
