import { AxiosError } from 'axios';
import { IProduct } from "../interface/model";
import instance from "./instance"

export const getAllProduct = () => {
    return instance.get('/product')
}

export const getOneProduct = async (id: string) => {
    const res = await instance.get(`/product/${id}`);
    return res;
}

export const createProduct = async (data: IProduct) => {
    try {
        const response = await instance.post(`/product/`, data, {
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
            throw new Error('Đã xảy ra lỗi khi thêm mới!');
        }
    }
}

export const editProduct = async (data: IProduct, id: string) => {
    try {
        const response = await instance.put(`/product/${id}`, data, {
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

export const deleteProduct = async (id: string) => {
    await instance.delete(`/product/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    })
}