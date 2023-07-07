import { Form, Input, message } from "antd";

import { IComment, IComments } from "../../../../interface/model";
import { createComment } from "../../../../api/comment";
import { useParams } from "react-router-dom";

export const CommentProduct = ({ comments }: IComments) => {
    const { id } = useParams();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
        return formattedDate
    }

    const onFinish = async (values: IComment) => {
        try {
            let checkComment = await createComment(values, id as string);
            if (checkComment) {
                message.success('Bình luận thành công!');
            } else {
                throw new Error('Bình luận thất bại!');
            }
        } catch (error: any) {
            message.error(error.message);
        }
    };

    return (
        <div className="bg-gray-100 px-4 py-2 rounded-lg mt-5">
            <h2 className="text-lg font-bold mb-4">Các đánh giá về sản phẩm</h2>
            <ul className="divide-y divide-gray-200">
                {comments && comments.length > 0 ? (
                    comments.map((comment: any) => (
                        <li className="py-4">
                            <div className="flex space-x-3">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/150" alt="" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-900">
                                        {comment.user?.name}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        <time dateTime="2023-04-12 T19:20">{formatDate(comment.createdAt)}</time>
                                    </div>
                                    <div className="mt-1 text-sm text-gray-700">
                                        {comment.content}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <div className="flex justify-center">Không có bình luận</div>
                )}
            </ul>


            <Form onFinish={onFinish} className="mt-8">
                <label className="block text-gray-700 font-bold mb-2">
                    Nhập bình luận của bạn
                </label>
                <Form.Item className="mb-4" name="content" rules={[{ required: true, message: 'Vui lòng nhập bình luận!' }, { min: 30, message: "Độ dài rối thiểu là 30 kí tự!" }]}>
                    <Input.TextArea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="comment" name="comment"></Input.TextArea>
                </Form.Item>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Gửi bình luận
                    </button>
                </div>
            </Form>
        </div >

    )
}