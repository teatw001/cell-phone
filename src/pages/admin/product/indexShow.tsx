import React, { useEffect, useState } from 'react';
import { Space, Table, Button, Popconfirm, message, Image } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { deleteProduct, getAllProduct } from "../../../api/product";
import { IProduct } from '../../../interface/model';
import { NavLink } from 'react-router-dom';

interface DataType {
    key: string;
    name: string;
    price: number;
    original_price: number;
    short_description: string;
    description: string;
    images: string;
    brand: string;
}

const columns: ColumnsType<DataType> = [
    {
        key: 'name',
        title: 'Tên',
        dataIndex: 'name',
        align: 'center',
        width: '10%'
    },
    {
        key: 'price',
        title: 'Giá',
        dataIndex: 'price',
        align: 'center',
        width: '10%'
    },
    {
        key: 'original_price',
        title: 'Giá gốc',
        dataIndex: 'original_price',
        align: 'center',
        width: '10%'
    },
    {
        key: 'short_description',
        title: 'Mô tả ngắn',
        dataIndex: 'short_description',
        align: 'center',
        width: '15%',
        render: text => (
            <span>
                {text.length > 20 ? `${text.slice(0, 30)}...` : text}
            </span>
        )
    },
    {
        key: 'description',
        title: 'Mô tả',
        dataIndex: 'description',
        align: 'center',
        width: '15%',
        render: text => (
            <span>
                {text.length > 20 ? `${text.slice(0, 30)}...` : text}
            </span>
        )
    },
    {
        key: 'images',
        title: 'Hình ảnh',
        dataIndex: 'images',
        align: 'center',
        width: '20%',
        render: (text: string) => <Image width={100} src={text} />,
    },
    {
        key: 'Danh mục',
        title: 'brand',
        dataIndex: 'brand',
        align: 'center',
        width: '10%'
    },
    {
        key: 'action',
        title: 'Thao tác',
        align: 'center',
        width: '15%',
        render: (_, record) => (
            <Space size="middle">
                <NavLink to={`/admin/product/edit/${record.key}`}>
                    <Button>
                        <div className='flex '>
                            <EditOutlined />
                        </div>
                    </Button>
                </NavLink>

                <Popconfirm
                    placement="topLeft"
                    title="Bạn muốn xóa sản phẩm?"
                    description="Xóa sẽ mất sản phẩm này trong database!"
                    onConfirm={() => {
                        deleteProduct(record.key);
                        message.success('Xóa sản phẩm thành công!');
                    }}
                    okText="Yes"
                    cancelText="No"
                    okButtonProps={{ style: { backgroundColor: '#007bff', color: 'white' } }}
                    cancelButtonProps={{ style: { backgroundColor: '#dc3545', color: 'white' } }}>
                    <Button>
                        <div className='flex '>
                            <DeleteOutlined />
                        </div>
                    </Button>
                </Popconfirm>
            </Space>
        )
    },
];

export const AdminShowProduct: React.FC = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function fetchProduct() {
            let { data } = await getAllProduct();

            setProducts(
                data.map((item: IProduct) => {
                    return {
                        key: item._id,
                        name: item.name,
                        price: item.price,
                        original_price: item?.original_price,
                        short_description: item?.short_description,
                        description: item.description,
                        images: item.images[0].base_url,
                        brand: item.brand?.name
                    }
                }))
        }

        fetchProduct()
    }, [products])

    return (<Table columns={columns} dataSource={products} pagination={{ pageSize: 3 }} />)
}