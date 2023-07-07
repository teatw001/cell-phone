import { AxiosError } from "axios";

import { ILogin, IRegister } from "../interface/model";
import instance from "./instance";

export const getAllUser = () => {
    return instance.get('/user')
}

export const loginUser = async (user: ILogin) => {
    try {
        const response = await instance.post("/login", user)
        if (response.status === 200) {
            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            return true;
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
        } else {
            console.log(error);
            throw new Error('Đã xảy ra lỗi khi đăng nhập!');
        }
    }
};

export const createUser = async (user: IRegister) => {
    try {
        const response = await instance.post('/register', user)
        if (response.status === 200) {
            return true;
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
        } else {
            console.log(error);
            throw new Error('Đã xảy ra lỗi khi đăng ký!');
        }
    }
};