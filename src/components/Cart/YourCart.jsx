import React from "react";
import cartimg from "../../assets/cart.png";
import { FaTimes } from "react-icons/fa";
import pricelist from "../../constants/pricelist";

const YourCart = ({ title, priceTitle, items, onRemoveItem, onClearCart }) => {
  const getItemTitle = (category, subcategory) => {
    const options = pricelist[category]?.options;
    return options ? options[subcategory]?.title : subcategory;
  };

  return (
    <div className="shadow border-[1px] border-iconborder/20 rounded-xl col-span-5">
      <div className="text-iconborder border-b-[1px] border-iconborder/20 p-4  items-center justify-between text-sm lg:text-lg font-semibold  grid grid-cols-9">
        <div className="flex items-center gap-4 col-span-6">
          <img src={cartimg} alt="" />
          <div>{title}</div>
        </div>
        <div className="col-span-2">{priceTitle}</div>
        <button
          onClick={onClearCart}
          className="text-red-500 col-span-1 justify-self-end"
        >
          Clear Cart
        </button>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="border-b-[1px] border-iconborder/20 p-4 grid grid-cols-9 items-center"
        >
          <div className="col-span-6 flex flex-row items-center gap-2">
            <div className="text-base font-semibold">
              {getItemTitle(item.category, item.subcategory)}
            </div>
            <div className="text-sm text-iconborder">{item.description}</div>
          </div>
          <div className="text-base font-semibold col-span-2">
            ₹ {item.price}
          </div>
          <button
            onClick={() => onRemoveItem(item.id)}
            className="text-red-500 col-span-1 justify-self-end"
          >
            <FaTimes />
          </button>
        </div>
      ))}
    </div>
  );
};

export default YourCart;
