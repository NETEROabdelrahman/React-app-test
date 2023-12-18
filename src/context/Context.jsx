import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
const AppContext = React.createContext();
const URL = 'https://dummyjson.com/products';

const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubtotal] = useState(0)
  const [error, setError] = useState(null);

  
 
  //Fetch all data
  const fetchData = async () => {
    try {
      const res = await axios.get(URL);
      setData(res.data.products);
    } catch (err) {
      console.log(err)
      setError(err)
    }
  };
  useEffect(() => {
    fetchData()
  }, []);

  //put products in cart
  const addToCart = (e, id) => {
    const temp = data && [...data];
    const index = temp.indexOf(data.find((item) => item.id === id));
    const product = temp[index];
    if (product.stock > 0) {
      product.inCart = true;
      product.count = 1;
      const price = product.price;
      product.total = price;
      product.disabled = true;
      product.stock -= 1;
      setCart([...cart, product]);
      setSubtotal([...cart, product].reduce((a,b)=>a + b.total,0))
    }
  };

  //increase quantity in cart
  const increaseQuantity = (e, id) => {
    const temp = data && [...data];
    const index = temp.indexOf(data.find((item) => item.id === id));
    const product = temp[index];
    if (product.stock > 0 && product.inCart) {
      const filteredData = data.filter(
        (item) => item.id !== product.id,
      );
      setData([product, ...filteredData]);
      product.count += 1;
      product.stock -= 1;
      product.total = product.price * product.count;
      setSubtotal(cart.reduce((a,b)=>a + b.total,0))
    }
  };

  //decrease quantity in cart
  const decreaseQuantity = (e, id) => {
    const temp = data && [...data];
    const index = temp.indexOf(data.find((item) => item.id === id));
    const product = temp[index];
    if (product.count > 0 && product.inCart) {
      const filteredData = data.filter(
        (item) => item.id !== product.id,
      );
      setData([product, ...filteredData]);
      product.count -= 1;
      product.stock += 1;
      product.total = product.price * product.count;
      setSubtotal(cart.reduce((a, b) => a + b.total, 0));
      if (product.count < 1) {
        const filteredCart = cart.filter(item => item.id !== id)
        product.disabled = false;
        setCart(filteredCart)
      }
    }
  };

  //remove product from cart
  const remove = (id) => {
    const temp = data && [...data];
    const index = temp.indexOf(data.find((item) => item.id === id));
    const product = temp[index];
    product.stock += product.count;
    product.count = 0;
    product.total = 0;
    product.disabled = false;
    const filteredData = data.filter(item => item.id !== product.id);
    setData([product, ...filteredData]);

    const filteredCart = cart.filter(item => item.id !== id)
    setCart(filteredCart)
    setSubtotal(cart.reduce((a,b)=>a + b.total,0))

  }

  //clear cart
  const clearCart = () => {
    setCart([]);
    fetchData()
  };

  return (
    <AppContext.Provider
      value={{
        data,
        addToCart,
        cart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        subTotal,
        remove,
        error
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
