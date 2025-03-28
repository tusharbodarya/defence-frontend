import React, { useState } from "react";
import details from "../../assets/cartPriceDetails.png";
import BlueButton from "../BlueButton";

const Details = ({
  title,
  address,
  addressPlaceholder,
  gst,
  gstPlaceholder,
  onSave,
}) => {
  const [billingAddress, setBillingAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const handleSave = () => {
    onSave(billingAddress);
    setAddressSaved(true);
  };

  return (
    <div className="shadow border-[1px] border-iconborder/20 rounded-xl p-4 col-span-5 lg:col-span-3">
      <div className="flex items-center gap-4 text-iconborder text-sm lg:text-lg font-semibold pb-8">
        <img src={details} alt="" />
        <div className="uppercase">{title}</div>
      </div>
      <div className="space-y-4 text-sm lg:text-lg">
        <div className="w-full">{address}</div>
        <textarea
          value={billingAddress}
          onChange={(e) => setBillingAddress(e.target.value)}
          className="w-full p-2 bg-inputcolor rounded-lg outline-none"
          placeholder={addressPlaceholder}
        ></textarea>
      </div>
      <div className="space-y-4 text-sm lg:text-lg">
        <div className="w-full">{gst}</div>
        <textarea
          value={gstNumber}
          onChange={(e) => setGstNumber(e.target.value)}
          className="w-full p-2 bg-inputcolor rounded-lg outline-none"
          placeholder={gstPlaceholder}
        ></textarea>
      </div>
      {addressSaved && (
        <div className="text-green-500 text-sm lg:text-lg pt-4">
          Address saved successfully!
        </div>
      )}
      <div className="flex justify-end py-4 pt-6">
        <BlueButton
          title={"Save"}
          font={"text-sm lg:text-lg"}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

export default Details;
