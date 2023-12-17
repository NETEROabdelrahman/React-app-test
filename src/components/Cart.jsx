import { useGlobalContext } from '../context/Context';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
  const { cart, clearCart, subTotal, remove, increaseQuantity, decreaseQuantity } = useGlobalContext();

  return (
    <div>
      {cart.length < 1 ? (
        <h1 className=" text-center p-4">
          your cart is currently empty!
        </h1>
      ) : (
        <div className="p-3 m-3">
          <h1 className=" text-center p-4">your items</h1>
          <div className=" text-center flex flex-row justify-between items-center p-3 sm:text-lg text-[10px]">
            <p className=" uppercase basis-1/6">products</p>
            <p className=" uppercase basis-1/6">name</p>
            <p className=" uppercase basis-1/6">price</p>
            <p className=" uppercase basis-1/6">quantity</p>
            <p className=" uppercase basis-1/6">remove</p>
            <p className=" uppercase basis-1/6">total</p>
          </div>
          {cart.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-row items-center text-center justify-between p-3 sm:text-lg text-[10px]"
              >
                <img
                  className=" w-[16%] basis-1/6"
                  src={item?.images[0]}
                  alt={item?.title}
                />
                <p className='basis-1/6'>{item?.title}</p>
                <p className='basis-1/6'>{item?.price}</p>
                <button
                  className=" p-3 rounded bg-slate-500 hover:bg-slate-200 hover:text-black disabled:bg-slate-200 transition-all border-none m-3 text-white cursor-pointer w-fit"
                  onClick={(e) =>
                    increaseQuantity(e, item.id)
                  }
                  disabled={item?.count == item?.stock || !item.disabled ? true : false}
                >
                  +
                </button>
                <h5>{item.count > 0 && item.count}</h5>
                <button
                  className=" p-3 rounded bg-slate-500 hover:bg-slate-200 hover:text-black disabled:bg-slate-200 transition-all border-none m-3 text-white cursor-pointer w-fit"
                  onClick={(e) => {
                    decreaseQuantity(e, item.id);
                  }}
                  disabled={item?.count == 0 ? true : false}
                >
                  -
                </button>
                <MdDelete className=' basis-1/6' color="red" cursor="pointer" onClick={() => remove(item.id)} />
                <p className=' basis-1/6'>{item?.total}</p>
              </div>
            );
          })}
          <hr className="m-5" />
          <button onClick={() => clearCart()} className=" p-5 rounded bg-red-500 hover:bg-red-200 hover:text-black disabled:bg-green-400 transition-all border-none m-3 text-white cursor-pointer w-fit">
            clear cart
          </button>
          <p>total: {subTotal}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
