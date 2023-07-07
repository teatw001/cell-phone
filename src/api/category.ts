import { AxiosError } from "axios";
import { ICategory } from "../interface/model";
import instance from "./instance"

export const getAllCategory = () => {
    return instance.get('/category')
}

export const getOneCategory = async (id: string) => {
    const res = await instance.get(`/category/${id}`);
    return res;
}

export const createCategory = async (data: ICategory) => {
    try {
        const response = await instance.post(`/category/`, data, {
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

export const editCategory = async (data: ICategory, id: string) => {
    try {
        const response = await instance.put(`/category/${id}`, data, {
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

export const deleteCategory = async (id: string) => {
    await instance.delete(`/category/${id}`, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
        }
    })
}
