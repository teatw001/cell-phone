import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, message } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { sendForgotPassword } from '../../../api/forgot';

type ISendForgot = {
    email: string
}

export const SendForgot = () => {
    const navigate = useNavigate();

    const onFinish = async (values: ISendForgot) => {
        try {
            let checkSend = await sendForgotPassword(values);
            if (checkSend) {
                message.success('Vui lòng đăng nhập vào email để lấy mã!');
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            } else {
                throw new Error('Gửi mã thất bại');
            }
        } catch (error: any) {
            message.error(error.message);
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-[#f9fafb]'>
            <Form name="normal_login" className="login-form w-[500px] p-5 bg-[#ffffff] rounded-lg shadow-2xl" onFinish={onFinish} >
                <div className='flex flex-col mb-10'>
                    <h1 className="text-4xl font-medium">Quên mật khẩu</h1>
                    <p className="text-slate-500">Điền vào email để nhận link đổi mật khẩu</p>
                </div>

                <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Vui lòng nhập địa chỉ email hợp lệ!' }]} >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" className='p-3' />
                </Form.Item>

                <Form.Item className='flex justify-center'>
                    <Button type="primary" ghost htmlType="submit" className="login-form-button">
                        Gửi
                    </Button>
                </Form.Item>
                <p className="text-center">Chưa đăng ký? <NavLink to="/register" className="text-blue-500 font-medium inline-flex space-x-1 items-center"><span>Đăng ký ngay </span><span><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg></span></NavLink></p>
            </Form >
        </div >
    )
}