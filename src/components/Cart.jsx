import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/Context';
import { MdDelete } from 'react-icons/md';

const Cart = () => {
  const { cart, clearCart, subTotal, remove, increaseQuantity, decreaseQuantity } = useGlobalContext();
  const {t,i18n} = useTranslation()

  return (
    <div className='text-[var(--dark-color)]'>
      {cart.length < 1 ? (
        <h1 className=" text-center p-4">
          {t('main.empty')}
        </h1>
      ) : (
        <div className="p-3 m-3">
          <h1 className=" text-center p-4">{t('main.yourItems')}</h1>
          <div className=" text-center flex flex-row justify-between items-center p-3 sm:text-lg text-[10px]">
            <p className=" uppercase basis-1/6">{t('main.products')}</p>
            <p className=" uppercase basis-1/6">{t('main.name')}</p>
            <p className=" uppercase basis-1/6">{t('main.price')}</p>
            <p className=" uppercase basis-1/6">{t('main.quantity')}</p>
            <p className=" uppercase basis-1/6">{t('main.remove')}</p>
            <p className=" uppercase basis-1/6">{t('main.total')}</p>
          </div>
          {cart.map((item) => {
            return (
              <div
                key={item.id}
                className="flex flex-row items-center text-center p-3 sm:text-lg text-[10px]"
              >
                <img
                  className=" w-[16%] basis-1/6"
                  src={item?.images[0]}
                  alt={item?.title}
                />
                <p className='basis-1/6'>{item?.title}</p>
                <p className='basis-1/6'>{item?.price}</p>
                <div className=' basis-1/6 flex flex-row justify-between items-center'>

                <button
                  className=" p-3 rounded bg-slate-500 hover:bg-green-200 hover:text-black disabled:bg-slate-200 transition-all border-none m-3 text-white cursor-pointer w-fit"
                  onClick={(e) =>
                    increaseQuantity(e, item.id)
                  }
                  disabled={item?.count == item?.stock || !item.disabled ? true : false}
                >
                  +
                </button>
                <h5>{item.count > 0 && item.count}</h5>
                <button
                  className=" p-3 rounded bg-slate-500 hover:bg-green-200 hover:text-black disabled:bg-slate-200 transition-all border-none m-3 text-white cursor-pointer w-fit"
                  onClick={(e) => {
                    decreaseQuantity(e, item.id);
                  }}
                  disabled={item?.count == 0 ? true : false}
                  >
                  -
                </button>
                  </div>
                <MdDelete className=' basis-1/6' color="red" cursor="pointer" onClick={() => remove(item.id)} />
                <p className=' basis-1/6'>{item?.total}</p>
              </div>
            );
          })}
          <hr className="m-5" />
          <button onClick={() => clearCart()} className=" p-5 rounded bg-red-500 hover:bg-red-300 hover:text-black disabled:bg-green-400 transition-all border-none m-3 text-white cursor-pointer w-fit">
          {t('main.clearCart')}
          </button>
          <h2 className='p-3'>{t('main.total')}: {subTotal}</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
