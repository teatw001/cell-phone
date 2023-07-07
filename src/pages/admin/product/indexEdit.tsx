import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editProduct, getOneProduct } from '../../../api/product';
import { getAllCategory } from '../../../api/category';

import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { IProduct } from '../../../interface/model';

export const AdminEditProduct = () => {
    const { id } = useParams();
    const [product, setProduct] = useState();
    const [cate, setCate] = useState();
    const navigate = useNavigate();

    const FormItem = Form.Item;

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };

    const validateMessages = {
        required: '${label} không được để trống!',
        types: {
            number: '${label} không phải là một số hợp lệ!',
        },
        number: {
            range: '${label} phải nằm trong khoảng từ ${min} đến ${max}',
            min: '${label} không được nhỏ hơn 1',
        },
    };

    const onFinish = async (values: IProduct) => {
        try {
            const checkEdit = await editProduct(values, values._id)
            if (checkEdit) {
                message.success('Cập nhật sản phẩm thành công!');
                setTimeout(() => {
                    navigate("/admin/product");
                }, 1000);
            } else {
                throw new Error('Cập nhật sản phẩm thất bại!');
            }
        } catch (error: any) {
            message.error(error.message);
        }
    };

    useEffect(() => {
        let getProduct = async () => {
            const { data } = await getOneProduct(id as string);
            setProduct(data);
        };
        getProduct();

        let getCate = async () => {
            const { data } = await getAllCategory();
            setCate(data.map((c: any) => ({ value: c._id, label: c.name })));
        };
        getCate();
    }, []);

    return (
        <div>
            <div className="flex justify-center items-center border-b-[2px]">
                <span className="text-[25px] font-bold mb-5">Cập nhật sản phẩm</span>
            </div>

            <div className='mt-5'>
                {product ? (
                    <Form {...layout} name="nest-messages" onFinish={onFinish} style={{ maxWidth: 950 }} validateMessages={validateMessages} initialValues={product}>
                        <Form.Item name="_id" label="Mã sản phẩm">
                            <Input disabled />
                        </Form.Item>

                        <Form.Item name="name" label="Tên sản phẩm" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name='price' label="Giá bán" rules={[{ required: true, type: 'number', min: 1, max: 999999999 }]}>
                            <InputNumber className='w-full' />
                        </Form.Item>

                        <Form.Item name='original_price' label="Giá gốc" rules={[{ required: true, type: 'number', min: 1, max: 999999999 }]}>
                            <InputNumber className='w-full' />
                        </Form.Item>

                        <Form.Item name='brand' label="Danh mục" rules={[{ required: true }]}>
                            <Select showSearch className='w-[full' placeholder="Chọn danh mục" optionFilterProp="children" filterOption={(input, option) => (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())} options={cate} />
                        </Form.Item>

                        <Form.Item name='short_description' label="Mô tả ngắn" rules={[{ required: true }]}>
                            <Input.TextArea rows={5} />
                        </Form.Item>

                        <Form.Item name='description' label="Mô tả" rules={[{ required: true }]}>
                            <Input.TextArea rows={15} />
                        </Form.Item>

                        <Form.Item label="Images">
                            <Form.List name="images">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field) => (
                                            <div key={field.key} className='flex items-center'>
                                                <FormItem {...field} label="Base url" name={[field.name, 'base_url']} rules={[{ required: true, message: 'Vui lòng nhập base url' }]} className='mt-5' >
                                                    <Input placeholder="Nhập link base url" />
                                                </FormItem>
                                                <button onClick={() => remove(field.name)} className='flex justify-center items-center'>
                                                    <MinusCircleOutlined className='ml-2' />
                                                    <span className='ml-1'>Xóa</span>
                                                </button>
                                            </div>
                                        ))}
                                        <FormItem>
                                            <Button className='flex justify-center items-center' type="dashed" onClick={() => add()} style={{ width: '100%' }}>
                                                <PlusOutlined /> Thêm image
                                            </Button>
                                        </FormItem>
                                    </>
                                )}
                            </Form.List>
                        </Form.Item>

                        <Form.Item name='specifications' label="Specifications">
                            <Form.List name="specifications">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field) => (
                                            <div key={field.key}>
                                                <FormItem {...field} label="Name" name={[field.name, 'name']} rules={[{ required: true, message: 'Vui lòng nhập name' }]} >
                                                    <Input placeholder="Enter name" />
                                                </FormItem>
                                                <FormItem label="Attributes" className='flex'>
                                                    <Form.List name={[field.name, 'attributes']} key={`${field.key} -attributes`} >
                                                        {(attributeFields, { add: addAttribute, remove: removeAttribute }) => (
                                                            <>
                                                                {attributeFields.map((attributeField, index) => (
                                                                    <div key={attributeField.key} >
                                                                        <FormItem {...attributeField} label="Code" name={[attributeField.name, 'code']} rules={[{ required: true, message: 'Vui lòng nhập code' }]} key={`${index}-code`}>
                                                                            <Input placeholder="Enter code" />
                                                                        </FormItem>

                                                                        <FormItem {...attributeField} label="Name" name={[attributeField.name, 'name']} rules={[{ required: true, message: 'Vui lòng nhập name' }]} key={`${index}-name`}>
                                                                            <Input placeholder="Enter name" />
                                                                        </FormItem>

                                                                        <FormItem {...attributeField} label="Value" name={[attributeField.name, 'value']} rules={[{ required: true, message: 'Vui lòng nhập value' }]} key={`${index}-value`}>
                                                                            <Input placeholder="Enter value" />
                                                                        </FormItem>
                                                                        <button className='flex justify-center items-center my-3 ml-20' onClick={() => removeAttribute(attributeField.name)} >
                                                                            <MinusCircleOutlined className='mt-1 ml-14' />
                                                                            <span className='ml-1'>Xóa attributes</span>
                                                                        </button>
                                                                    </div>
                                                                ))}
                                                                <div>
                                                                    <Button type="dashed" className='flex justify-center items-center ml-28 mt-2' onClick={() => addAttribute()}>
                                                                        <PlusOutlined />
                                                                        <span>Thêm attributes</span>
                                                                    </Button>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Form.List>
                                                    <button className='flex justify-center items-center ml-[180px] mt-10 border-b' onClick={() => remove(field.name)}>
                                                        <MinusCircleOutlined />
                                                        <span className='ml-1'>Xóa specifications</span>
                                                    </button>
                                                </FormItem>
                                            </div>
                                        ))}
                                        <FormItem>
                                            <Button className='flex justify-center items-center' type="dashed" onClick={() => add()} style={{ width: '100%' }}>
                                                <PlusOutlined /> Thêm specification
                                            </Button>
                                        </FormItem>
                                    </>
                                )}
                            </Form.List>
                        </Form.Item>

                        <Form.Item className='flex justify-center ml-72' wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button type="primary" ghost htmlType="submit">
                                Cập nhật
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className='flex justify-center'>Đang lấy dữ liệu</div>
                )}
            </div>
        </div >
    )
}