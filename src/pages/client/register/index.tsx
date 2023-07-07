import { Form, Input, Checkbox, Button, Typography, message } from 'antd';
import { createUser } from "../../../api/user";
import { IRegister } from '../../../interface/model';
import { NavLink, useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const navigate = useNavigate()

    const onFinish = async (values: IRegister) => {
        try {
            let checkRegister = await createUser(values);
            if (checkRegister) {
                message.success('Đăng ký thành công!');
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            } else {
                throw new Error('Đăng ký thất bại!');
            }
        } catch (error: any) {
            message.error(error.message);
        }
    };

    return (
        <main className='flex justify-center items-center h-screen bg-[#f9fafb]'>
            <Form name="register" onFinish={onFinish} className="login-form w-[500px] p-5 bg-[#ffffff] rounded-lg shadow-2xl" autoComplete='off'>
                <Typography.Title className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex justify-center items-center">
                    Đăng ký
                </Typography.Title>

                <Form.Item name="name" rules={[{ required: true, message: 'Vui lòng nhập tên!', whitespace: true }]}>
                    <Input placeholder="Tên" />
                </Form.Item>

                <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }, { type: 'email', message: 'Vui lòng nhập địa chỉ email hợp lệ!' }]} >
                    <Input placeholder="Email" />
                </Form.Item>

                <Form.Item name="phone" rules={[{ required: true, message: 'Vui lòng số điện thoại!', whitespace: true }]}>
                    <Input placeholder="Số điện thoại" />
                </Form.Item>

                <Form.Item name="address" rules={[{ required: true, message: 'Vui lòng địa chỉ!', whitespace: true }]}>
                    <Input placeholder="Địa chỉ" />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' },]}>
                    <Input.Password placeholder='Mật khẩu' />
                </Form.Item>

                <Form.Item name="confirmPassword" dependencies={['password']} rules={[{ required: true, message: 'Vui lòng nhập lại mật khẩu!' }, ({ getFieldValue }) => ({ validator(_, value) { if (!value || getFieldValue('password') === value) { return Promise.resolve(); } return Promise.reject(new Error('Hai mật khẩu không khớp!')); }, }),]}>
                    <Input.Password placeholder='Nhập lại mật khẩu' />
                </Form.Item>

                {/* <Form.Item name="agreement" valuePropName="checked">
                    <Checkbox>
                        Tôi đã đọc <NavLink to="#" className='font-normal text-blue-400 hover:text-red-500'>Thỏa thuận</NavLink>
                    </Checkbox>
                </Form.Item> */}

                <Form.Item className='flex justify-center items-center'>
                    <Button type="primary" ghost htmlType="submit"> Đăng ký </Button>
                </Form.Item>

                <span className='flex justify-center'>
                    Bạn đã có tài khoản?<NavLink className='font-normal text-blue-400 hover:text-red-500 ml-1' to="/login">Đăng nhập!</NavLink>
                </span>
            </Form>
        </main>
    )
}
