import { AxiosError } from "axios";
import { ICart, IEditOrder } from "../interface/model";
import instance from "./instance"

export const getAllOrder = () => {
    return instance.get('/order')
}

export const getOneOrder = async (id: string) => {
    const res = await instance.get(`/order/${id}`);
    return res;
}

export const editOrder = async (data: IEditOrder, id: string) => {
    try {
        const response = await instance.put(`/order/${id}`, data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        if (response.status === 200) {
            return true;
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
        } else {
            console.log(error);
            throw new Error('Đã xảy ra lỗi khi chỉnh sửa!');
        }
    }
}

export const createOrder = async (data: ICart) => {
    try {
        const response = await instance.post('/order', data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
        if (response.status === 200) {
            return true;
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
        } else {
            console.log(error);
            throw new Error('Đã xảy ra lỗi khi mua hàng!');
        }
    }
}