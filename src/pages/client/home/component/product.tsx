import { NavLink } from "react-router-dom";
import { IProduct } from "../../../../interface/model"

type Props = {
    data: IProduct[],
}

export const BestProduct = ({ data }: Props) => {
    const formatter = (value: number) => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 shadow-2xl place-items-center rounded-lg p-1">
            {data && data.length > 0 ? (
                data.map((product: IProduct) => (
                    <NavLink key={product._id} to={`productdetail/${product._id}`}>
                        <div key={product._id} className="group relative border shadow rounded-[10px] p-3 w-[250px]">
                            <div className="flex justify-center items-center min-h-80 aspect-h-1 aspect-w-1 w-[200px] overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-50">
                                <img src={product.images[0].base_url} className="h-full w-full object-cover object-center lg:h-full lg:w-full" />
                            </div>

                            <div className="mt-4">
                                <h3 className="text-gray-700 font-bold text-[14px]">
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                </h3>
                            </div>

                            <div className="flex items-center mt-4">
                                <span className="text-[#d70018] font-bold text-[16px]">{formatter(product.price)}</span>
                                <del className="ml-3 text-[14px] font-semibold text-[#707070]">{formatter(product.original_price)}</del>
                            </div>

                            <div className="mt-4 text-[#f59e0b] text-[13px]">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>

                            <div className="flex justify-end items-center">
                                <span className="text-[#777] text-[12px]">Yêu thích</span>
                                <i className="fa-regular fa-heart text-red-400 ml-1 mt-1"></i>
                            </div>
                        </div>
                    </NavLink>
                ))
            ) : (
                <div>
                    Không có dữ liệu
                </div>
            )}
        </div>
    )
}