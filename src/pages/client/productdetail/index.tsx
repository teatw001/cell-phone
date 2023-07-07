import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import { getOneProduct } from "../../../api/product";

import { ProductInfo } from "./component/product-info";
import { Specifications } from "./component/specifications";

import { IProduct } from "../../../interface/model";
import { CommentProduct } from "./component/comment";

export const ProductDetailPage = () => {
    const { id } = useParams<string>();
    const [product, setProduct] = useState<IProduct | null>(null)

    useEffect(() => {
        const getProduct = async () => {
            let { data } = await getOneProduct(id as string);
            setProduct(data);
        };
        getProduct();
    }, [product]);

    return (
        <main className="w-full flex justify-center">
            <div>
                <div className="border-b-[2px] mt-3 h-[50px] flex items-center">
                    <h1 className="font-bold text-[18px] leading-[30px] text-[#0a263c]">{product?.name}</h1>
                </div>

                <div className="mt-10 flex justify-center items-center">
                    <div className="w-[1200px]">

                        {product && <ProductInfo data={product} />}

                        <div className="mt-10">
                            {product && <Specifications specifications={product.specifications} description={product.description} short_description={product.short_description} />}
                        </div>

                        {product && <CommentProduct comments={product.comments} />}
                    </div>
                </div>
            </div>
        </main>
    )
}