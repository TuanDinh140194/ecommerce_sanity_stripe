import React, { useEffect } from "react";
import Link from "next/link";
import { BsFillBagXFill } from "react-icons/bs";
import { useStateContext } from "@/context/StateContext";

const Canceled = () => {
  const { setCartItems, setTotalPrice, setTotalQuantity } = useStateContext();
  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
  }, []);
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsFillBagXFill color="red"/>
        </p>
        <h2>The order have been canceled!</h2>
        <p className="email-msg">Thank you for your patient.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:tuandinh0114@gmail.com">
            tuandinh0114@gmail.com
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
