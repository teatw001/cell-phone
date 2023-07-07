import { AxiosError } from "axios";
import instance from "./instance"
import { IComment } from "../interface/model";

export const createComment = async (data: IComment, id: string) => {
    try {
        const response = await instance.post(`/comment/${id}`, data, {
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
            throw new Error('Bạn phải đăng nhập để bình luận');
        }
    }
}