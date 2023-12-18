import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/Context';
function Hero() {
  const {
    data,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    error
  } = useGlobalContext();
  const {t} = useTranslation()

  return (
    <>
      <h1 className=" flex items-center justify-center p-5 text-[var(--dark-color)]">
        {t('main.products')}
      </h1>
      {error && <h1 className='text-center'>{ error.message}</h1>}
      <div className=" m-3 p-3">
        {data &&
          data
            ?.sort((a, b) => a.id - b.id)
            .map((product) => {
              return (
                <div
                  key={product.id}
                  className=" text-[var(--dark-color)] flex sm:flex-row flex-col  items-center my-3 gap-3 border-2 border-black "
                >
                  <img
                    src={product?.images[0]}
                    alt={product?.title}
                    className=" w-1/2 h-full rounded basis-1/2"
                  />
                  <div className=" flex flex-col justify-between basis-1/2">
                    <div className="">
                      <h2>
                        {product?.brand} {product?.title}
                      </h2>
                      <h4>category: {product?.category}</h4>
                      <p className=" p-3">{product?.description}</p>
                      <h5>
                        discountPercentage:{' '}
                        {product?.discountPercentage}
                      </h5>
                      <h5>price: {product?.price}</h5>
                      <h5>rating: {product?.rating}</h5>
                      <h5>available: {product?.stock}</h5>
                    </div>
                    <div className='flex flex-row justify-center items-center'>
                      <button
                        onClick={(e) => {
                          addToCart(e, product.id);
                        }}
                        disabled={product?.disabled ? true : false}
                        className=" p-3 rounded bg-slate-500 hover:bg-green-300 hover:text-[var(--dark-color)] disabled:bg-green-400 transition-all border-none m-3 text-[var(--light-color)] cursor-pointer w-fit"
                      >
                        {product?.disabled
                          ? t('main.inCart')
                          : t('main.addToCart')}
                      </button>
                      <button
                        className=" p-3 rounded bg-slate-500 hover:bg-green-300 hover:text-[var(--dark-color)] disabled:bg-slate-200 transition-all border-none m-3 text-[var(--light-color)] cursor-pointer w-fit"
                        onClick={(e) =>
                          increaseQuantity(e, product.id)
                        }
                        disabled={product?.count == product?.stock || !product.disabled ? true : false}
                      >
                        +
                      </button>
                      <h5>{product.count > 0 && product.count}</h5>
                      <button
                        className=" p-3 rounded bg-slate-500 hover:bg-green-300 hover:text-[var(--dark-color)] disabled:bg-slate-200 transition-all border-none m-3 text-[var(--light-color)] cursor-pointer w-fit"
                        onClick={(e) => {
                          decreaseQuantity(e, product.id);
                        }}
                        disabled={product?.count == 0 ? true : false}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </>
  );
}

export default Hero;
