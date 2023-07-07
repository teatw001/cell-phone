import { message } from "antd";
import { ICart, ICartDetail, ICartItem, IProduct } from "../../../../interface/model";
import '../css/css.css';

type IProps = {
    data: IProduct,
}

export const ProductInfo: React.FC<IProps> = ({ data }) => {
    const formatter = (value: number): string => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const addCart = (product: IProduct) => {
        const user = JSON.parse(localStorage.getItem('user') as string);
        if (!user) {
            message.error('Bạn chưa đăng nhập!');
            return;
        }

        let cart: ICart | null = JSON.parse(sessionStorage.getItem('cart') as string) || null;
        let cartDetails: ICartDetail[] = JSON.parse(sessionStorage.getItem('cartDetails') as string) || [];

        if (!cart) {
            cart = {
                user: user._id,
                products: [],
                totalPrice: 0
            };      
        }

        const existingProduct = cart.products.find((p: ICartItem) => p.product === product._id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                product: product._id,
                quantity: 1,
                price: product.price
            });

            // thêm sản phẩm mới vào cartDetails nếu chưa tồn tại
            let existingCartDetails = cartDetails.find((p) => p._id === product._id);
            if (!existingCartDetails) {
                cartDetails.push({
                    _id: product._id,
                    name: product.name,
                    images: product.images?.[0].base_url,
                    price: product.price,
                    original_price: product.original_price
                });
                sessionStorage.setItem('cartDetails', JSON.stringify(cartDetails));
            }
        }

        cart.totalPrice = cart.products.reduce((total: number, p: ICartItem) => {
            return total + p.price * p.quantity;
        }, 0);

        sessionStorage.setItem('cart', JSON.stringify(cart));

        return message.success('Thêm sản phẩm vào giỏ hàng thành công!');
    };

    return (
        <div className="flex">
            <div className="w-[350px]">
                <div className="bg-gradient-to-r from-pink-500 to-[#f7bb97] rounded-[10px] text-white">
                    <div className="flex justify-center items-center pt-5">
                        <img src={data.images?.[0].base_url} className="w-[120px] rounded-[10px]" alt="product" />
                    </div>

                    <div id="scrolling" className="overflow-auto text-[14px] leading-5 text-justify p-5 max-h-[200px]">
                        <p>{data.short_description}</p>
                    </div>
                </div>

                <div className="flex mt-3">
                    {data.images?.slice(0, 4).map((image, index) => (
                        <div key={index} className="border rounded-[10px] m-1">
                            <img key={index} className="rounded-[10px] w-16" src={image.base_url} alt="mini-product" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex">
                <div className="pl-3">
                    <div className="flex items-center gap-3">
                        <p className="text-[#d70018] font-bold text-[18px]">{formatter(data.price)}</p>
                        <p className="text-[#707070] font-semibold text-[14px] ">
                            <del>{formatter(data.original_price)}</del>
                        </p>
                    </div>

                    <div className="border border-[#fee2e2] rounded-[10px]">
                        <div className="bg-[#fee2e2] text-[#d70018] p-2 rounded-t-[10px]">
                            <i className="fa-solid fa-gift text-[20px]"></i>
                            <span className="font-semibold ml-3">Khuyến mại</span>
                        </div>

                        <div className="p-2 flex justify-center items-center">
                            <div className="flex justify-center items-center border rounded-[50%] font-semibold h-[20px] w-[20px] bg-[#d70018]">
                                <span className="text-[12px] text-white">1</span>
                            </div>

                            <div className="max-w-[350px]">
                                <span className="flex overflow-auto ml-2 text-[14px] text-justify leading-5">Giảm ngay 4.000.000đ khi tham gia thu cũ đổi mới - Giá thu tốt nhất thị trường giảm ngay</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-x-5 mt-5 text-[14px]">
                        <button className="text-white rounded-[10px] h-[60px] bg-gradient-to-r from-[#f52f32] to-[#e11b1e] w-[200px]">
                            <span className="font-bold text-[16px]">Mua ngay</span>
                        </button>

                        <button className="grid place-items-center border-[2px] border-[#e11b1e] rounded-[10px] p-1 text-[#e04040]" onClick={() => addCart(data)}>
                            <i className="fa-sharp fa-solid fa-cart-shopping text-[22px]"></i>
                            <span className="text-[7px] font-semibold">Thêm vào giỏ hàng</span>
                        </button>
                    </div>
                </div>

                <div className="pl-3">
                    <div className="border max-w-[350px] p-3 rounded-[10px]">
                        <div className="mb-5">
                            <span className="text-[#444] font-bold">Thông tin sản phẩm</span>
                        </div>

                        <div className="mb-5 flex items-center text-[#4a4a4a]">
                            <i className='mr-3 fa fa-mobile-phone text-[24px]'></i>
                            <span className="flex text-justify leading-5">Mới, đầy đủ phụ kiện từ nhà sản xuất</span>
                        </div>

                        <div className="mb-5 flex items-center text-[#4a4a4a]">
                            <i className="mr-3 fa-solid fa-gift"></i>
                            <span className="flex text-justify leading-5">Samsung Galaxy S23 Ultra, cáp sạc, sách HDSD</span>
                        </div>

                        <div className="mb-5 flex items-center text-[#4a4a4a]">
                            <i className="mr-3 fa-solid fa-shield"></i>
                            <span className="flex text-justify leading-5">Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

