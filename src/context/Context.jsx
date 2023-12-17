import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
const AppContext = React.createContext();
const URL = 'https://dummyjson.com/products';

const AppProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState([]);

  console.log(data);
  //Fetch all data
  const fetchData = async () => {
    const res = await axios.get(URL);
    setData(res.data.products);
  };
  useEffect(() => {
    fetchData();
  }, []);
  //put products in cart
  const addToCart = (e, id) => {
    const temp = data && [...data];
    const index = temp.indexOf(
      data.find((item) => item.id === id),
    );
    const product = temp[index];
    if (product.stock > 0) {
      product.inCart = true;
      product.count = 1;
      const price = product.price;
      product.total = price;
      product.disabled = true;
      product.stock-=1
      setCart([...cart, product]);
    }
  };
  
  const increaseQuantity = (e,id) => {
    const temp = data && [...data];
    const index = temp.indexOf(
      data.find((item) => item.id === id),
      );
    const product = temp[index];
    if (product.stock > 0) {
      const filteredData = data.filter(item=>item.id !== product.id)
      setData([product,...filteredData])
      product.count += 1;
      product.stock -= 1;
    }
  };

  const decreaseQuantity = (e,id) => {
    const temp = data && [...data];
    const index = temp.indexOf(
      data.find((item) => item.id === id),
      );
      const product = temp[index];
      if (product.count > 0) {
        const filteredData = data.filter(item=>item.id !== product.id)
        setData([product,...filteredData])
        product.count -= 1;
        product.stock += 1;
    }
      
      console.log(product.stock)
    };

  return (
    <AppContext.Provider
      value={{
        data,
        addToCart,
        cart,
        increaseQuantity,
        decreaseQuantity
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
