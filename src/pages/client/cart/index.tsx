import React, { useState } from 'react';
import { InputNumber, Space, message } from 'antd';
import { ICart, ICartDetail } from '../../../interface/model';
import { NavLink } from 'react-router-dom';

export const CartPage = () => {
    const formatter = (value: number) => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    const cart: ICart = JSON.parse(sessionStorage.getItem('cart') ?? '{}');
    const cartDetails: ICartDetail[] = JSON.parse(sessionStorage.getItem('cartDetails') ?? '[]');

    const [totalPrice, setTotalPrice] = useState(cart.totalPrice || 0);

    const onChange = (value: number, id: string) => {
        let updatedCart = { ...cart };
        let productIndex = updatedCart.products.findIndex((p) => p.product === id);

        if (productIndex >= 0) {
            updatedCart.products[productIndex].quantity = value;
            const newTotalPrice = updatedCart.products.reduce((total, p) => total + p.price * p.quantity, 0);
            setTotalPrice(newTotalPrice);
            updatedCart.totalPrice = newTotalPrice;
            message.success("Cập nhật thành công!")
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    const removeItem = (id: string) => {
        let updatedCart = { ...cart };
        let updatedCartDetails = cartDetails.filter((item) => item._id !== id);
        let productIndex = updatedCart.products.findIndex((p) => p.product === id);

        if (productIndex >= 0) {
            updatedCart.products.splice(productIndex, 1);
            const newTotalPrice = updatedCart.products.reduce((total, p) => total + p.price * p.quantity, 0);
            setTotalPrice(newTotalPrice);
            updatedCart.totalPrice = newTotalPrice;
            sessionStorage.setItem('cart', JSON.stringify(updatedCart));
            sessionStorage.setItem('cartDetails', JSON.stringify(updatedCartDetails));
        }
    };

    return (
        <main className="bg-gray-100">
            <div className="px-4 py-2 bg-gray-300 text-red-600 flex justify-center items-center">
                <button className="flex items-center space-x-2 w-[70px]">
                    <i className="fas fa-arrow-left"></i>
                    <span className='hidden md:block'>Trở về</span>
                </button>

                <div className='flex-1 flex justify-center'>
                    <span className="text-xl font-semibold mr-20">Giỏ hàng</span>
                </div>
            </div>

            <div className="px-4 py-6 space-y-6">
                {cartDetails.length === 0 ? (
                    <div className='flex flex-col justify-center items-center'>
                        <span className="text-lg text-gray-500 font-semibold flex justify-center">Không có sản phẩm trong giỏ hàng!</span>

                        <NavLink to="/" className='px-8 py-3 text-white bg-red-600 hover:bg-red-700 rounded-md shadow-md md:order-1 md:mt-3'>Mua ngay</NavLink>
                    </div>
                ) : (
                    cartDetails.map((item) => {
                        return (
                            <div key={item._id} className="flex justify-between bg-white border rounded-lg overflow-hidden">
                                <div className="flex flex-col w-screen md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                    <div className="flex justify-center items-center w-full md:w-1/3">
                                        <img src={item.images} className="w-[50%] md:w-[200px]" alt="product" />
                                    </div>

                                    <div className="flex-1 p-4 space-y-2">
                                        <div className="text-lg font-medium">{item.name}</div>

                                        <div className="flex items-center space-x-2 text-red-500 font-medium">
                                            <div>{formatter(item.price)}</div>
                                            {item.price !== item.original_price && (
                                                <div className="line-through text-gray-400">{formatter(item.original_price)}</div>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className="text-gray-500">Số lượng:</div>
                                            <Space>
                                                <InputNumber
                                                    value={cart.products.find((p) => p.product === item._id)?.quantity || 1}
                                                    min={1}
                                                    onChange={(value) => {
                                                        onChange(value as number, item._id);
                                                    }}
                                                />
                                            </Space>
                                        </div>

                                        <div className="text-sm text-gray-500">- Chương trình khuyến mại:</div>

                                        <div className="text-sm text-gray-500">
                                            Dịch vụ phòng chờ hạng thương gia tại sân bay
                                        </div>

                                        <div className="text-sm text-gray-500">
                                            Ưu đãi Galaxy gift lên đến 1.700.000đ (VieON VIP HBO GO, Zing MP3, Phúc Long,
                                            Galaxy Play)
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3'>
                                    <button className='w-[1%] hover:text-red-400' onClick={() => removeItem(item._id)}>
                                        <i className="fa-solid fa-x"></i>
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
                {cartDetails.length === 0 ? (
                    <></>
                ) : (
                    <div className="flex md:flex-col-reverse md:justify-start justify-between items-center my-8 border-t border-gray-300 py-8">
                        <div className="text-lg font-semibold text-gray-900 md:order-2 mb-5">
                            Tổng tiền: <span className='text-red-600'>{formatter(totalPrice ? totalPrice : 0)}</span>
                        </div>

                        <NavLink to="/checkout">
                            <button className="px-8 py-3 text-white bg-red-600 hover:bg-red-700 rounded-md shadow-md md:order-1 md:mt-0">
                                Mua hàng
                            </button>
                        </NavLink>
                    </div>
                )}
            </div>
        </main >
    );
}
