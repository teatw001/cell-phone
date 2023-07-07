import { message } from "antd";
import { createOrder } from "../../../api/order";
import { ICart, ICartDetail } from "../../../interface/model";
import { NavLink, useNavigate } from "react-router-dom";

export const CheckOut = () => {
    const formatter = (value: number) => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('user') as string);

    const cart: ICart = JSON.parse(sessionStorage.getItem('cart') ?? '{}');
    const cartDetails: ICartDetail[] = JSON.parse(sessionStorage.getItem('cartDetails') ?? '[]');

    const submitOrder = async () => {
        try {
            let checkOrder = await createOrder(cart);
            if (checkOrder) {
                message.success('Mua hàng thành công!');
                sessionStorage.removeItem('cart');
                sessionStorage.removeItem('cartDetails');
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            } else {
                throw new Error('Mua hàng thất bại!');
            }
        } catch (error: any) {
            message.error(error.message);
        }
    }

    return (
        <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-8">
                <span className="block font-medium text-lg text-red-600 border-b-2 border-red-600">Địa Chỉ</span>
                <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 py-3 mt-4">
                    <div className="flex items-center">
                        <div className="flex items-center mt-3">
                            <p className="font-medium text-base">{user?.name}</p>
                            <p className="text-gray-500 text-sm ml-1">{user?.phone}</p>
                            <p className="text-gray-500 text-sm ml-3">{user?.address}</p>
                        </div>
                        <NavLink to="#" className="text-red-500 border p-1 text-[10px] border-red-500 ml-3">mặc định</NavLink>
                    </div>
                    <button className="md:text-blue-500 md:text-sm md:hover:text-green-700 md:mt-2 pl-3 text-blue-500 hover:text-green-700 text-[10px]">Thay đổi</button>
                </div>
            </div>

            <div className="mb-8 border rounded-[10px]">
                <table className="min-w-full divide-y divide-gray-200 shadow-lg">
                    <thead>
                        <tr>
                            <th scope="col" className="py-3 font-medium text-center text-sm text-red-600 border-b-2 border-red-600">Sản phẩm</th>
                            <th scope="col" className="py-3 font-medium text-center text-sm text-red-600 border-b-2 border-red-600">Giá</th>
                            <th scope="col" className="py-3 font-medium text-center text-sm text-red-600 border-b-2 border-red-600">Số lượng</th>
                            <th scope="col" className="py-3 font-medium text-center text-sm text-red-600 border-b-2 border-red-600">Thành tiền</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {cartDetails.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="md:py-4 md:flex md:space-x-4">
                                        <img src={item.images} alt="" className="w-16 h-16 object-cover rounded-lg ml-5 mr-2" />
                                        <div className="flex flex-col justify-center">
                                            <span className="md:font-medium md:text-sm text-xs ml-7 overflow-hidden">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 font-medium text-center text-sm">{formatter(item.price)}</td>
                                    <td className="py-4 font-medium text-center text-sm">{cart.products.find((p) => p.product === item._id)?.quantity || 1}</td>
                                    <td className="py-4 font-medium text-center text-sm">{formatter((cart.products.find((p) => p.product === item._id)?.quantity || 1) * item.price)}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <div className="mb-8 flex justify-end">
                <span className="block text-gray-500 text-sm">Tổng số tiền: <span className="text-red-500 text-lg ml-2">{formatter(cart.totalPrice ? cart.totalPrice : 0)}</span></span>
            </div>
            <div className="mb-8">
                <span className="block font-medium text-lg text-red-600 border-b-2 border-red-600">Phương thức thanh toán</span>
                <div className="mt-4 space-x-2">
                    <button className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600">Số dư</button>
                    <button className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600">Ngân hàng</button>
                    <button className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-600">Tiền mặt</button>
                </div>
            </div>
            <div className="mb-8">
                <div className="grid justify-end gap-2 mb-2">
                    <div>
                        <span className="font-medium text-lg">Tổng tiền hàng:</span>
                        <span className="text-gray-500 text-lg pl-2">{formatter(cart.totalPrice ? cart.totalPrice : 0)}</span>
                    </div>
                    <div>
                        <span className="font-medium text-lg">Phí vận chuyển:</span>
                        <span className="text-gray-500 text-lg pl-2">{formatter(50000)}</span>
                    </div>
                    <div>
                        <span className="font-medium text-lg">Tổng thanh toán:</span>
                        <span className="text-red-500 text-lg pl-2">{formatter((cart.totalPrice ? cart.totalPrice : 0) + 50000)}</span>
                    </div>
                </div>
            </div>
            <div className="mb-8 flex justify-between items-center">
                <span className="text-sm">Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuân theo Điều khoản!</span>
                <button className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={submitOrder}>Đặt hàng</button>
            </div>
        </main>
    )
}