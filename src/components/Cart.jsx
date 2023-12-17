import { useGlobalContext } from '../context/Context';

const Cart = () => {
  const { cart } = useGlobalContext();
  return (
    <div>
      {cart.length < 1 ? (
        <div>your cart is currently empty!</div>
      ) : (
        <div>
          {cart.map((item) => {
            return <div key={item.id}>hello</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default Cart;
