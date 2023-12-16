import axios  from "axios"
import { useEffect, useState } from "react"
const URL = 'https://dummyjson.com/products'
function Hero() {

  const [data,setData] = useState(null)
  console.log(data)
  const fetchData = async () => {
    const res = await axios.get(URL)
    setData(res.data)
}

  useEffect(() => {
    fetchData()
  },[])
  
    return (
        <>
            <h1 className=" flex items-center justify-center p-5">Products</h1>
    <div className=" m-3 p-3">
      {data && data?.products.map(product => {
        return (
          <div key={product.id} className=" text-[var(--dark-color)] flex flex-row my-3 gap-3 " >
                <img src={product?.images[0]} alt={product?.title} className=" rounded" />
                <div className=" flex flex-col justify-between">

                <div className="">
                    <h2>{product?.brand} {product?.title}</h2>
                    <h4>category: {product?.category}</h4>
                    <p className=" p-3">{product?.description}</p>
                    <h5>discountPercentage: {product?.discountPercentage}</h5>
                    <h5>price: {product?.price}</h5>
                    <h5>rating: {product?.rating}</h5>
                    <h5>available: {product?.stock}</h5>
                </div>
                    <button className=" p-3 rounded bg-slate-500 hover:bg-slate-200 hover:text-black transition-all border-none m-3 text-white cursor-pointer w-fit">add to cart</button>
                </div>
          </div>
        )
    })}
    </div>
    </>
  )
  
}

export default Hero
