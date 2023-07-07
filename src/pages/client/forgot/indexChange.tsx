import React from 'react';
import { Button, Form, Input, Typography, message } from 'antd';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { changePassword } from '../../../api/forgot';

type IChangePassword = {
    password: string,
    confirmPassword: string,
    randomCode: string,
    randomString: string
}

export const ChangePassword = () => {
    const navigate = useNavigate();
    const { randomString } = useParams<string>();

    const onFinish = async (values: IChangePassword) => {
        let newValues = {
            ...values,
            randomString: randomString
        };

        try {
            let checkSend = await changePassword(newValues);
            if (checkSend) {
                message.success('Đổi mật khẩu thành công!');
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            } else {
                throw new Error('Đổi mật khẩu thất bại');
            }
        } catch (error: any) {
            message.error(error.message);
        }
    };
    return (
        <div className='flex justify-center items-center h-screen bg-[#f9fafb]'>
            <Form name="normal_login" className="login-form w-[500px] p-5 bg-[#ffffff] rounded-lg shadow-2xl" onFinish={onFinish} >
                <Typography.Title className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex justify-center items-center">
                    Đổi mật khẩu
                </Typography.Title>

                <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' },]}>
                    <Input.Password placeholder='Mật khẩu' className='p-3' />
                </Form.Item>

                <Form.Item name="confirmPassword" dependencies={['password']} rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) { return Promise.resolve(); } return Promise.reject(new Error('Hai mật khẩu không khớp!')); }, }),]}>
                    <Input.Password placeholder='Nhập lại mật khẩu' className='p-3' />
                </Form.Item>

                <Form.Item name="randomCode" rules={[{ required: true, message: 'Vui lòng nhập mã bảo mật!' },]}>
                    <Input placeholder='Mã bảo mật' className='p-3' />
                </Form.Item>

                <Form.Item className='flex justify-center'>
                    <Button type="primary" ghost htmlType="submit" className="login-form-button">
                        Đổi mật khẩu
                    </Button>
                </Form.Item>
                <p className="text-center">Bạn muốn đăng nhập? <NavLink to="/register" className="text-blue-500 font-medium inline-flex space-x-1 items-center"><span>Đăng nhập ngay</span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg></span></NavLink></p>
            </Form>
        </div>
    )
}