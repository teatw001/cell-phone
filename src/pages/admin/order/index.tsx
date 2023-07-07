import React, { useEffect, useState } from 'react';
import { Form, Input, Popconfirm, Table, Typography, Select, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { editOrder, getAllOrder } from '../../../api/order';
import { IOrder, IOrderProduct } from '../../../interface/model';
const { Option } = Select;

const formatter = (value: number) => `${value} ₫`.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
interface Item {
    key: string;
    user: string;
    products: IOrderProduct[];
    total_price: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text' | 'select';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'text' ? <Input /> : (
        <Select>
            <Option value="Đang chờ xử lý">Đang chờ xử lý</Option>
            <Option value="Đang xử lý">Đang xử lý</Option>
            <Option value="Đang giao hàng">Đang giao hàng</Option>
            <Option value="Đã giao hàng">Đã giao hàng</Option>
            <Option value="Đã hủy">Đã hủy</Option>
            <Option value="Đã hoàn tiền">Đã hoàn tiền</Option>
            <Option value="Đã hoàn thành">Đã hoàn thành</Option>
        </Select>
    );

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Vui lòng nhập ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export const AdminOrder: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<Item[]>([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        async function fetchProduct() {
            let { data } = await getAllOrder();

            setData(
                data.map((item: IOrder) => {
                    return {
                        key: item._id,
                        user: item.user._id,
                        products: item.products,
                        total_price: item.totalPrice,
                        address: item.user.address,
                        status: item.status,
                        createdAt: item.createdAt,
                        updatedAt: item.updatedAt
                    }
                }))
        }

        fetchProduct()
    }, [])

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ products: record.products, total_price: record.total_price, createdAt: record.createdAt, updatedAt: record.updatedAt, status: record.status });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields());

            const newData = [...data];
            const index = newData.findIndex((item: Item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, { ...item, ...row, });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }

            await editOrder({ status: row.status }, key as string);
            message.success("Chỉnh sửa trạng thái thành công!");
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'products',
            width: '30%',
            render: (products: IOrderProduct[]) => (
                products.map((prod, index) => (
                    <div key={index} className='flex justify-start items-center' >
                        <img src={prod.product.images?.[0].base_url} className='w-[80px] rounded-[10px]' alt="product" />
                        <div className='flex flex-col'>
                            <span className='text-[14px] font-normal px-3'>{prod.product.name}</span>
                            <span className='text-[14px] font-normal px-3'>x{prod.quantity}</span>
                            <span className='text-[14px] font-normal px-3'>{formatter(prod.price)}</span>
                        </div>
                    </div >
                )
                )),
        },
        {
            title: 'Tổng đơn hàng',
            dataIndex: 'total_price',
            align: 'center',
            width: '15%',
            editable: false,
            render: (text: number) => formatter(text)
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            align: 'center',
            width: '15%',
            editable: false,
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            align: 'center',
            width: '10%',
            editable: false,
        },
        {
            title: 'Ngày sửa',
            dataIndex: 'updatedAt',
            align: 'center',
            width: '10%',
            editable: false,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'center',
            width: '10%',
            editable: true,
        },
        {
            title: 'Thao tác',
            dataIndex: 'key',
            align: 'center',
            width: '10%',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} className='mr-3'>
                            Lưu
                        </Typography.Link>
                        <Popconfirm
                            title="Bạn có muốn hủy?"
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ style: { backgroundColor: '#007bff', color: 'white' } }}
                            onConfirm={cancel}>
                            <button>Hủy</button>
                        </Popconfirm>
                    </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        <EditOutlined />
                    </Typography.Link>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'status' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                    pageSize: 3
                }}
            />
        </Form>
    );
};