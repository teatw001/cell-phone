import React from 'react';

import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Divider, Typography, message } from 'antd';

import { loginUser } from '../../../api/user'
import { ILogin } from '../../../interface/model';
import { NavLink, useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate()

    const onFinish = async (values: ILogin) => {
        try {
            let checkLogin = await loginUser(values);
            if (checkLogin) {
                message.success('Đăng nhập thành công!');
                setTimeout(() => {
                    navigate('/')
                }, 1000);
            } else {
                throw new Error('Đăng nhập thất bại!');
            }
        } catch (error: any) {
            message.error(error.message);
        }
    };

    return (
        <main className='flex justify-center items-center h-screen bg-[#f9fafb]'>
            <Form name="normal_login" className="login-form w-[500px] p-5 bg-[#ffffff] rounded-lg shadow-2xl" onFinish={onFinish} autoComplete="off">
                <Typography.Title className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex justify-center items-center">
                    Đăng nhập
                </Typography.Title>

                <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }, { type: 'email', message: 'Vui lòng nhập địa chỉ email hợp lệ!' }]} >
                    <Input prefix={<UserOutlined className="site-form-item-icon p-2" />} placeholder="Email" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]} >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon p-2" />} type="password" placeholder="Mật khẩu" iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Form.Item>

                <Form.Item className='flex justify-end'>
                    {/* <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Ghi nhớ mật khẩu</Checkbox>
                    </Form.Item> */}

                    <NavLink className="login-form-forgot font-normal text-blue-400 hover:text-red-500" to="/sendforgot">
                        Quên mật khẩu
                    </NavLink>
                </Form.Item>

                <Form.Item className='flex justify-center'>
                    <Button type="primary" ghost htmlType="submit" className="login-form-button" block> Đăng nhập </Button>
                </Form.Item>

                <Divider>Hoặc</Divider>

                <div className="flex justify-center items-center">
                    <NavLink to='#'><i className="fa-brands fa-facebook text-[33px] text-blue-600"></i></NavLink>

                    <NavLink to='#'><img src="http://localhost:5173/image/google.png" className="w-[33px] h-[33px] ml-3" alt="google" /></NavLink>
                </div>

                <span className='flex justify-center mt-5'>
                    Bạn chưa có tài khoản?<NavLink className='ml-1 font-normal text-blue-400 hover:text-red-500' to="/register">Đăng ký ngay!</NavLink>
                </span>
            </Form>
        </main>
    )
}