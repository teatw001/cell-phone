import { AxiosError } from "axios";
import instance from "./instance"

export const sendForgotPassword = async (data) => {
    try {
        const response = await instance.post('/forgotpassword', data)
        if (response.status === 200) {
            localStorage.setItem('code', response.data.accessCode)
            return true;
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
        } else {
            console.log(error);
            throw new Error('Đã xảy ra lỗi khi gửi!');
        }
    }
}

export const changePassword = async (data) => {
    try {
        const response = await instance.post('/reset-password', data, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('code')
            }
        })
        if (response.status === 200) {
            localStorage.removeItem('code');
            return true;
        }
    } catch (error: unknown) {
        if (error instanceof AxiosError && error.response && error.response.status === 400) {
            throw new Error(error.response.data.message);
        } else {
            console.log(error);
            throw new Error('Đã xảy ra lỗi khi đổi mật khẩu!');
        }
    }
}