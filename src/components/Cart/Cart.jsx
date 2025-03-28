import React, { useEffect, useState } from "react";
import YourCart from "./YourCart";
import Details from "./Details";
import PriceDetail from "./PriceDetail";
import { getCart, updateCart, clearCart } from "../../apiEndpoints";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import CartPayment from "./CartPayment";
import { isLoggedIn } from "../../utils/auth";
import PaymentSuccess from "./PaymentSuccess";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [gst, setGst] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [billingAddress, setBillingAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authStatus = isLoggedIn();
    setIsAuthenticated(authStatus);

    if (authStatus) {
      fetchCartItems();
    }
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await getCart();
      if (response.success && Array.isArray(response.data)) {
        const items = response.data;
        setCartItems(items);

        const total = items.reduce(
          (acc, item) => acc + parseFloat(item.price),
          0
        );
        const gstAmount = total * 0.18;
        const grandTotalAmount = total + gstAmount;

        setTotalAmount(total);
        setGst(gstAmount);
        setGrandTotal(grandTotalAmount);
      }
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      await updateCart(cartId, 0);
      fetchCartItems();
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleClearCart = async (showAlert = true) => {
    try {
      await clearCart();
      fetchCartItems();
      if (showAlert) {
        Swal.fire({
          title: "Cart items cleared.",
          text: "Your cart has been cleared.",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  };

  const handlePricelist = () => {
    navigate("/pricelist");
  };

  const handleOpenPayment = () => {
    if (!billingAddress) {
      Swal.fire({
        icon: "warning",
        title: "Billing Address Required",
        text: "Please add your billing address before proceeding to payment.",
      });
      return;
    }

    if (grandTotal > 500000) {
      Swal.fire({
        icon: "info",
        title: "Contact IMR",
        text: "Please contact IMR for payments exceeding ₹500,000.",
        footer: '<a href="https://www.imr.com/contact">Contact IMR</a>',
      });
      return;
    }

    setShowPayment(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      setPaySuccess(true);
      setShowPayment(false);
      await handleClearCart(false); // Clear cart without showing alert after payment success
    } catch (error) {
      console.error("Failed to clear cart after payment:", error);
    }
  };

  const handleSaveDetails = (address) => {
    setBillingAddress(address);
    setAddressSaved(true);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="container 3xl:w-[70%]  px-4 xl:px-8 pt-20 pb-4 text-right">
        <button className="rounded-full px-4 py-2 text-white bg-textblue">
          <Link to="/pricelist"> Back to Price List</Link>
        </button>
      </div>
      <div className="container 3xl:w-[70%] px-4 xl:px-8 pb-20 grid grid-cols-5 gap-4">
        <YourCart
          title={"Your Cart"}
          priceTitle={"Price"}
          items={cartItems}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
        <Details
          title={"Add Details"}
          address={"Billing Address"}
          addressPlaceholder={"Enter your billing address"}
          gst={"GST"}
          gstPlaceholder={"Enter GST number"}
          onSave={handleSaveDetails}
        />
        <PriceDetail
          title={"Price Details"}
          totalAmount={totalAmount}
          gst={gst}
          grandTotal={grandTotal}
          onProceedToBuy={handleOpenPayment}
          isAuthenticated={isAuthenticated}
          isAddressSaved={addressSaved}
        />
      </div>
      {showPayment && (
        <CartPayment
          onClose={() => setShowPayment(false)}
          onPaymentSuccess={handlePaymentSuccess}
          amount={totalAmount}
          cartItems={cartItems}
        />
      )}
      {paySuccess && <PaymentSuccess onClick={handlePricelist} />}
    </div>
  );
};

export default Cart;
