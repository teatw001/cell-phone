import { useEffect, useState } from "react"
import { getAllProduct } from "../../../api/product"
import { BestProduct } from "./component/product"
import { IProduct } from "../../../interface/model"
import { Scrolling } from "./component/scrolling"

export const HomePage = () => {
    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {
        async function fetchProduct() {
            let { data } = await getAllProduct();
            setProducts(data);
        }
        fetchProduct()
    }, [])

    return (
        <main>

            <Scrolling />

            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">ĐIỆN THOẠI NỔI BẬT NHẤT</h2>

                    <BestProduct data={products} />
                </div>
            </div>
        </main>
    )
}