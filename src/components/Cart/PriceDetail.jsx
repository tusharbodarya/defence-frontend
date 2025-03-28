import React from "react";
import BlueButton from "../BlueButton";
import priceDetail from "../../assets/cartPriceDetails.png";
import cartInfo from "../../assets/cartInfo.png";

const PriceDetail = ({
  title,
  totalAmount,
  gst,
  grandTotal,
  onProceedToBuy,
  isAuthenticated,
  isAddressSaved, // Add prop for address saved state
}) => {
  const handleProceedToBuy = () => {
    if (isAuthenticated) {
      onProceedToBuy();
    } else {
      alert("Please log in to proceed with the purchase.");
    }
  };

  return (
    <div className="shadow border-[1px] border-iconborder/20 rounded-xl col-span-5 lg:col-span-2 text-sm lg:text-lg">
      <div className="flex items-center gap-4 border-b-[1px] border-iconborder/20 p-4 text-iconborder text-sm lg:text-lg font-semibold pb-4">
        <img src={priceDetail} alt="" />
        <div className="uppercase">{title}</div>
      </div>
      <div className="border-b-[1px] border-iconborder/20 p-4 space-y-2">
        <div className="flex justify-between items-center">
          <div className="">Total Amount</div>
          <div>₹ {totalAmount.toFixed(2)}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            GST <img src={cartInfo} alt="" />
          </div>
          <div>₹ {gst.toFixed(2)}</div>
        </div>
      </div>
      <div className="border-b-[1px] border-iconborder/20 p-4 pb-8 space-y-2">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Grand Total</div>
          <div>₹ {grandTotal.toFixed(2)}</div>
        </div>
        <div className="flex justify-end w-full py-4 pt-6">
          <BlueButton
            title={"Proceed to Buy"}
            width={"w-full"}
            font={"text-sm lg:text-lg"}
            onClick={handleProceedToBuy}
            disabled={!isAddressSaved}
            className={!isAddressSaved}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceDetail;
