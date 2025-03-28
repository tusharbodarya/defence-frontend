import React, { useContext, useEffect, useRef, useState } from "react";
import CommonPriceList from "./CommonPriceList";
import bluecart from "../../assets/bluecart.png";
import exitem1 from "../../assets/exitem1.png"; // Ensure this import is correct
import exitem2 from "../../assets/exitem2.png"; // Ensure this import is correct
import exitem3 from "../../assets/exitem3.png"; // Ensure this import is correct
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import pricelist from "../../constants/pricelist";

import { addToCart, getCart } from "../../apiEndpoints";
import { isLoggedIn } from "../../utils/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../../utils/AuthContext";

const Pricelist = () => {
  const extraItemsArray = Object.keys(pricelist.extraItems.options.F).map(
    (key) => ({ key, ...pricelist.extraItems.options.F[key] })
  );

  const [quantities, setQuantities] = useState(
    extraItemsArray.map((item) => item.quantity || 1)
  );
  const [selected, setSelected] = useState(
    Array(extraItemsArray.length).fill(false)
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalWithTax, setTotalWithTax] = useState(0);
  const [selectedItems, setSelectedItems] = useState({
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
  });
  const [showPayment, setShowPayment] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartData, setCartData] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const sectionRefC = useRef(null);
  const sectionRefB = useRef(null);
  const sectionRefD = useRef(null);
  const sectionRefE = useRef(null);
  const sectionRef = useRef(null); // Defined sectionRefF to remove the error

  useEffect(() => {
    const authStatus = isLoggedIn();
    setIsAuthenticated(authStatus);

    if (authStatus) {
      fetchCartItems();
    }
  }, []);

  const fetchCartItems = async () => {
    const response = await getCart();
    if (response.success && Array.isArray(response.data)) {
      const cartItems = response.data;
      const updatedQuantities = [...quantities];
      const updatedSelected = [...selected];
      cartItems.forEach((item) => {
        const index = extraItemsArray.findIndex(
          (extraItem) => extraItem.key === item.subcategory
        );
        if (index !== -1) {
          updatedQuantities[index] = item.quantity;
          updatedSelected[index] = true;
        }
      });
      setQuantities(updatedQuantities);
      setSelected(updatedSelected);

      // Update selected items in "F" category
      const updatedFItems = extraItemsArray
        .filter((_, i) => updatedSelected[i])
        .map((item, i) => ({
          subcategory: item.key,
          price: item.price,
          description: item.title,
          quantity: updatedQuantities[i],
        }));

      setSelectedItems((prevItems) => ({
        ...prevItems,
        F: updatedFItems,
      }));

      updateTotalPrice(updatedQuantities, updatedSelected);
    }
    setCartData(response.data);
  };

  // Handle checkbox changes for each category
  const handleCheckboxChange = (category, updatedItems) => {
    setSelectedItems((prevItems) => ({
      ...prevItems,
      [category]: updatedItems,
    }));
  };

  const handleAddToCart = async (category, item) => {
    if (!isAuthenticated) {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: category === "A" ? "Additional Meeting Pack can be purchased by A1 Business Participant or A2 Second Business Participant only. Please register, login and click again, or go to Pricing Page and buy the A3 Additional Meeting Pack." : "Please log in to add items to the cart.",
        showCancelButton: true,
        confirmButtonText: "Log In",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: "/pricelist" } });
        }
      });
      return;
    }

    const items = selectedItems[category] || [];

    // If specific item is passed (like for "A3")
    if (item) {
      items.push({
        subcategory: item.id,
        price: parseInt(item.price.replace(/[^0-9]/g, "")),
        description: item.title,
        quantity: 1, // Assuming 1 as default for the A3 package
      });
    }

    Swal.fire({
      title: "Item Added to Cart",
      text: "You can add more items or go to the cart and check out.",
      icon: "success",
      confirmButtonText: "OK",
    });

    for (let item of items) {
      await addToCart({
        category,
        subcategory: item.subcategory,
        price: item.price,
        description: item.description,
        quantity: item.quantity || 1,
      });
    }
  };

  // Calculate tax and total with tax whenever total price changes
  useEffect(() => {
    const newTax = totalPrice * 0.18;
    setTax(newTax);
    setTotalWithTax(totalPrice + newTax);
  }, [totalPrice]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const scrollTo = query.get("scrollTo");

    if (scrollTo === "exhibition") {
      setTimeout(() => {
        if (sectionRefC.current) {
          sectionRefC.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    if (scrollTo === "sponsor") {
      setTimeout(() => {
        if (sectionRefB.current) {
          sectionRefB.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    if (scrollTo === "branding") {
      setTimeout(() => {
        if (sectionRefD.current) {
          sectionRefD.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
    if (scrollTo === "communication") {
      setTimeout(() => {
        if (sectionRefE.current) {
          sectionRefE.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.search]);

  // Handle incrementing quantity
  const handleIncrement = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index]++;
    setQuantities(newQuantities);
    updateTotalPrice(newQuantities, selected);
  };

  // Handle decrementing quantity
  const handleDecrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 1) {
      newQuantities[index]--;
      setQuantities(newQuantities);
      updateTotalPrice(newQuantities, selected);
    }
  };

  // Handle toggling checkbox selection
  const handleCheckboxToggle = (index) => {
    const newSelected = [...selected];
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);

    const updatedItems = extraItemsArray
      .filter((_, i) => newSelected[i])
      .map((item, i) => ({
        subcategory: item.key,
        price: item.price,
        description: item.title,
        quantity: quantities[i],
      }));

    handleCheckboxChange("F", updatedItems);
    updateTotalPrice(quantities, newSelected);
  };

  // Update total price based on quantities and selections
  const updateTotalPrice = (quantities, selected) => {
    const total = extraItemsArray.reduce((acc, item, index) => {
      const itemTotal = quantities[index] * item.price;
      return selected[index] ? acc + itemTotal : acc;
    }, 0);
    setTotalPrice(total);
  };

  // Handle opening payment modal
  const handleOpenPayment = () => {
    setShowPayment(true);
  };

  // Handle closing payment modal
  const handleClosePayment = () => {
    setShowPayment(false);
  };

  //Handle Scroll to F from C4
  const handleScrollToF = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <section className="flex justify-center py-14 mb-20">
      <div className="container 3xl:w-[70%] p-4">
        <div className="relative heading flex justify-center mb-4">
          <h2 className="font-EBGaramond uppercase xl:py-2 text-xl sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            {pricelist.title}
          </h2>
          <div className="absolute bottom-0 left-[47.5%] right-[47.5%] w-[5%] h-[0.15rem] lg:h-[0.25rem] bg-[#1189CC]"></div>
        </div>
        <div className="space-y-8">
          {/* Basic Meetings Package */}
          <div className="space-y-8">
            <div className="bg-lightblue text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-footerblue py-2 px-2 font-semibold">
              {pricelist.basicMeetingsPackage.title}
            </div>
            <div className="relative px-2">
              <div className="flex flex-col lg:flex-row justify-between items-center text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                {pricelist.basicMeetingsPackage.description}
                <button
                  onClick={() => navigate("/register")}
                  className="bg-textblue rounded-full py-1 lg:py-2 px-2 lg:px-3 text-white"
                >
                  {pricelist.basicMeetingsPackage.buttonText}
                </button>
              </div>
              <div className="hidden lg:block absolute bottom-0 w-[4%] h-[0.15rem] lg:h-[0.20rem] bg-[#1189CC]"></div>
            </div>
            {pricelist.basicMeetingsPackage.packages.map((pkg, index) => (
              <div className="px-2 py-4" key={index}>
                <div className="text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold flex justify-between items-center">
                  <div>
                    {" "}
                    {pkg.title}
                    {pkg.id === "A3" && (
                      <button
                        className=" text-textblue rounded-full py-1 px-3 ml-4 ring-1 ring-textblue "
                        onClick={() => {
                          handleAddToCart("A", pkg);
                        }} // Pass the package details to add to cart
                      >
                        {pkg.buttonText || "Buy Now"}
                      </button>
                    )}
                  </div>
                  <span>{pkg.price}</span>
                </div>
                <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-iconborder">
                  {pkg.description}
                </div>
                {pkg.features &&
                  Array.isArray(pkg.features) &&
                  pkg.features.length > 0 && (
                    <ul
                      className={`${index === 5 ? "list-none" : "list-disc pl-6"
                        }`}
                    >
                      {pkg.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-iconborder text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {/* Sponsorship Options */}
            <div
              id="sponsor"
              ref={sectionRefB}
              className="bg-lightblue text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-footerblue py-2 px-2 font-semibold flex flex-col sm:flex-row justify-between"
            >
              {pricelist.sponsorship.title}
              <div className="flex items-center justify-between sm:justify-center gap-2">
                <div className="font-normal text-sm md:text-base lg:text-lg xl:text-xl">
                  {pricelist.sponsorship.buttonDescription}
                </div>
                <button
                  onClick={() => handleAddToCart("B")}
                  className="border-[1px] border-footerblue rounded-full px-3 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl flex justify-center items-center gap-2"
                >
                  <div className="flex gap-2 items-center">
                    <img src={bluecart} alt="" />
                    {pricelist.sponsorship.buttonText}
                  </div>
                </button>
              </div>
            </div>
            <CommonPriceList
              title="Corporate Sponsorship"
              title2="Association Sponsorship"
              cartDataArray={cartData}
              options={pricelist.sponsorship.options}
              onCheckboxChange={(category, items) =>
                handleCheckboxChange(category, items)
              }
              scrollToF={handleScrollToF}
            />

            {/* Exhibiting Options */}
            <div
              id="exhibition"
              ref={sectionRefC}
              className="bg-lightblue text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-footerblue py-2 px-2 font-semibold flex flex-col sm:flex-row justify-between"
            >
              {pricelist.exhibitingOptions.title}
              <div className="flex items-center justify-between sm:justify-center gap-2">
                <div className="font-normal text-sm md:text-base lg:text-lg xl:text-xl">
                  {pricelist.exhibitingOptions.buttonDescription}
                </div>
                <button
                  onClick={() => handleAddToCart("C")}
                  className="border-[1px] border-footerblue rounded-full px-3 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl flex justify-center items-center gap-2"
                >
                  <img src={bluecart} alt="" />
                  {pricelist.exhibitingOptions.buttonText}
                </button>
              </div>
            </div>
            <CommonPriceList
              cartDataArray={cartData}
              options={pricelist.exhibitingOptions.options}
              onCheckboxChange={(category, items) =>
                handleCheckboxChange(category, items)
              }
            />

            {/* Branding Options */}
            <div
              id="branding"
              ref={sectionRefD}
              className="bg-lightblue text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-footerblue py-2 px-2 font-semibold flex flex-col sm:flex-row justify-between"
            >
              {pricelist.brandingOptions.title}
              <div className="flex items-center justify-between sm:justify-center gap-2">
                <div className="font-normal text-sm md:text-base lg:text-lg xl:text-xl">
                  {pricelist.brandingOptions.buttonDescription}
                </div>
                <button
                  onClick={() => handleAddToCart("D")}
                  className="border-[1px] border-footerblue rounded-full px-3 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl flex justify-center items-center gap-2"
                >
                  <img src={bluecart} alt="" />
                  {pricelist.brandingOptions.buttonText}
                </button>
              </div>
            </div>
            <CommonPriceList
              cartDataArray={cartData}
              options={pricelist.brandingOptions.options}
              onCheckboxChange={(category, items) =>
                handleCheckboxChange(category, items)
              }
            />

            {/* Communication Options */}
            <div
              id="communication"
              ref={sectionRefE}
              className="bg-lightblue text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-footerblue py-2 px-2 font-semibold flex flex-col sm:flex-row justify-between"
            >
              {pricelist.communicationOptions.title}
              <div className="flex items-center justify-between sm:justify-center gap-2">
                <div className="font-normal text-sm md:text-base lg:text-lg xl:text-xl">
                  {pricelist.communicationOptions.buttonDescription}
                </div>
                <button
                  onClick={() => handleAddToCart("E")}
                  className="border-[1px] border-footerblue rounded-full px-3 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl flex justify-center items-center gap-2"
                >
                  <img src={bluecart} alt="" />
                  {pricelist.communicationOptions.buttonText}
                </button>
              </div>
            </div>
            <CommonPriceList
              cartDataArray={cartData}
              title3="Advertisement in the Event Guide."
              options={pricelist.communicationOptions.options}
              onCheckboxChange={(category, items) =>
                handleCheckboxChange(category, items)
              }
            />

            {/* Extra Items */}
            <div ref={sectionRef}>
              <div className="bg-lightblue text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-footerblue py-2 px-2 font-semibold flex flex-col sm:flex-row justify-between">
                {pricelist.extraItems.title}
                <div className="flex items-center justify-between sm:justify-center gap-2">
                  <div className="font-normal text-xs md:text-base lg:text-lg xl:text-xl">
                    {pricelist.extraItems.buttonDescription}
                  </div>
                  <button
                    onClick={() => handleAddToCart("F")}
                    className="border-[1px] border-footerblue rounded-full px-3 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl flex justify-center items-center gap-2"
                  >
                    <img src={bluecart} alt="" />
                    {pricelist.extraItems.buttonText}
                  </button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-2">
                <div className="w-full sm:w-[70%] sm:flex justify-between flex-col">
                  <div className="text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                    {pricelist.extraItems.description}
                  </div>
                  <div className="py-4">
                    <div className="flex flex-col gap-3 border-[1px] border-pricingborder/50 p-4">
                      <div className="flex justify-between font-semibold text-sm md:text-base lg:text-lg 2xl:text-xl">
                        <div className="w-[55%]">Items</div>
                        <div className="w-[10%]">Qty</div>
                        <div className="w-[20%]">Price</div>
                        <div className="w-[15%]">Total Price</div>
                      </div>

                      {extraItemsArray.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl"
                        >
                          <div className="flex items-center gap-2 w-[55%] text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                            <div>
                              <input
                                type="checkbox"
                                className="w-3 lg:w-5 h-3 lg:h-5"
                                checked={selected[index]}
                                onChange={() => handleCheckboxToggle(index)}
                              />
                            </div>
                            <div>{item.title}</div>
                          </div>
                          {item.quantity !== 0 && (
                            <div className="w-[10%] text-center text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                              <div className="flex items-center gap-1">
                                <span className="text-lg font-medium">
                                  {quantities[index]}
                                </span>
                                <div className="flex flex-col items-center">
                                  <button
                                    onClick={() => handleIncrement(index)}
                                    className="w-3 h-3 bg-gray-200 rounded-sm flex justify-center items-center"
                                  >
                                    <MdArrowDropUp
                                      size="15px"
                                      className="mx-auto w-full"
                                    />
                                  </button>
                                  <button
                                    onClick={() => handleDecrement(index)}
                                    className="w-3 h-3 bg-gray-200 rounded-sm flex justify-center items-center"
                                  >
                                    <MdArrowDropDown
                                      size="15px"
                                      className="mx-auto w-full"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                          <div className="w-[20%] text-left text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                            {item.price && item.quantity !== 0 && (
                              <>@Rs {item.price}</>
                            )}
                          </div>
                          <div className="w-[15%] text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-xl">
                            {item.quantity !== 0 ? (
                              <>
                                Rs {(quantities[index] * item.price).toFixed(2)}
                              </>
                            ) : (
                              <>Rs {item.price}</>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3 border-[1px] border-pricingborder/50 p-4">
                      {pricelist.extraItems.totalDetails.map((item, index) => (
                        <div
                          className="flex justify-between text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl pl-5"
                          key={index}
                        >
                          <div className="w-[85%] flex flex-col">
                            <div>{item.label}</div>
                            <div className="text-xs md:text-sm lg:text-base 2xl:text-lg text-iconborder">
                              {item.description}
                            </div>
                          </div>
                          {item.id === 1 && (
                            <div className="w-[15%]">
                              Rs{totalPrice.toFixed(2)}
                            </div>
                          )}
                          {item.id === 2 && (
                            <div className="w-[15%]">Rs{tax.toFixed(2)}</div>
                          )}
                          {item.id === 3 && (
                            <div className="w-[15%]">
                              Rs{totalWithTax.toFixed(2)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl pl-9 border-[1px] border-pricingborder/50 p-4">
                      {pricelist.extraItems.paymentTerms}
                    </div>
                  </div>
                  <div className="pt-8">
                    <div className="font-semibold py-2 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                      {pricelist.extraItems.refundRules.title}
                    </div>
                    <div>
                      <ul className="list-disc pl-5">
                        {pricelist.extraItems.refundRules.rules.map(
                          (rule, index) => (
                            <li
                              key={index}
                              className="text-sm md:text-base lg:text-lg xl:text-lg 2xl:text-xl py-2"
                            >
                              {rule}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-[30%]">
                  <div className="flex flex-col justify-between h-full">
                    <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl flex gap-3 flex-col items-center sm:items-start pb-2">
                      <div className="text-center sm:text-left">
                        <img src={exitem1} alt="" />
                        <div>{pricelist.exampleItems.exitem1}</div>
                      </div>
                      <div className="text-center sm:text-left">
                        <img src={exitem2} alt="" />
                        <div>{pricelist.exampleItems.exitem2}</div>
                      </div>
                      <div className="text-center sm:text-left">
                        <img src={exitem3} alt="" />
                        <div>{pricelist.exampleItems.exitem3}</div>
                      </div>
                    </div>
                    <div className="bg-subscriptionlightbg px-4 sm:px-2 lg:px-4 py-6">
                      <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-footerblue font-semibold py-2">
                        {pricelist.bankDetails.title}
                      </div>
                      <div className="pb-8">
                        {pricelist.bankDetails.details.map((detail, index) => (
                          <div key={index}>
                            <span className="font-semibold">
                              {detail.label}
                            </span>
                            {detail.value}
                          </div>
                        ))}
                      </div>
                      <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl text-footerblue font-semibold py-2">
                        {pricelist.fulfillingOrder.title}
                      </div>
                      <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                        {pricelist.fulfillingOrder.steps[0]}
                      </div>
                      <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                        {pricelist.fulfillingOrder.steps[1]}
                      </div>
                      <div className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                        {pricelist.fulfillingOrder.steps[2]}
                      </div>
                      <div className="text-textblue underline text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
                        {pricelist.fulfillingOrder.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right mt-8">
                <button className="rounded-full px-4 py-2 text-white bg-textblue">
                  <Link to="/cart"> Go to your Cart</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricelist;
