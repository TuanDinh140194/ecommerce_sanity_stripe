import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  // Load cart items from local storage on component mount
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    const storedTotalPrice = localStorage.getItem("totalPrice");
    if (storedTotalPrice) {
      setTotalPrice(parseFloat(storedTotalPrice));
    }

    const storedTotalQuantity = localStorage.getItem("totalQuantity");
    if (storedTotalQuantity) {
      setTotalQuantity(parseInt(storedTotalQuantity));
    }
  }, []);

  // Update local storage whenever cart items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("totalPrice", totalPrice);
    localStorage.setItem("totalQuantity", totalQuantity);
  }, [cartItems]);

  let foundProduct;
  // let index;

  // const onAdd = (product, quantity) => {
  //   const checkProductInCart = cartItems.find(
  //     (item) => item._id === product._id
  //   );
  //   setTotalPrice(
  //     (prevTotalPrice) => prevTotalPrice + product.price * quantity
  //   );
  //   setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

  //   if (checkProductInCart) {
  //     const updatedCartItems = cartItems.map((cartProduct) => {
  //       if (cartProduct._id === product._id)
  //         return {
  //           ...cartProduct,
  //           quantity: cartProduct.quantity + quantity,
  //         };
  //     });

  //     setCartItems(updatedCartItems);
  //   } else {
  //     product.quantity = quantity;
  //     setCartItems([...cartItems, { ...product }]);
  //   }
  //   toast.success(`${qty} ${product.name} added to the cart.`);
  // };

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        }
        return cartProduct;
      });

      setCartItems(updatedCartItems);
    } else {
      const newCartItem = {
        ...product,
        quantity: quantity,
      };
      setCartItems([...cartItems, newCartItem]);
    }

    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + quantity);

    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantity(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );

    setCartItems(newCartItems);
  };

  // const toggleCartItemQuantity = (id, value) => {
  //   foundProduct = cartItems.find((item) => item._id === id);
  //   index = cartItems.findIndex((product) => product._id === id);

  //   const newCartItems = cartItems.filter((item) => item._id !== id);

  //   if (value === "inc") {
  //     setCartItems([
  //       ...newCartItems,
  //       { ...foundProduct, quantity: foundProduct.quantity + 1 },
  //     ]);
  //     setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
  //     setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
  //   } else if (value === "dec") {
  //     if (foundProduct.quantity > 1) {
  //       setCartItems([
  //         ...newCartItems,
  //         { ...foundProduct, quantity: foundProduct.quantity - 1 },
  //       ]);
  //       setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
  //       setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
  //     }
  //   }
  // };
  const toggleCartItemQuantity = (id, value) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item._id === id) {
        if (value === "inc") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (value === "dec" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    setCartItems(updatedCartItems);

    // Calculate total price and quantity based on the updatedCartItems array
    const totalPrice = updatedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const totalQuantity = updatedCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );

    setTotalPrice(totalPrice);
    setTotalQuantity(totalQuantity);
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        incQty,
        decQty,
        onAdd,
        setShowCart,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
