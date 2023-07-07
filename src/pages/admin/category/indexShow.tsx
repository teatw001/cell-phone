import React, { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Select, message, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { createCategory, deleteCategory, editCategory, getAllCategory } from '../../../api/category';
import { ICategory } from '../../../interface/model';

interface Item {
    key: string;
    name: string;
    slug: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: string;
    inputType: 'number' | 'text';
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
    const inputNode = inputType === 'text' ? <Input /> : <InputNumber />;

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

export const AdminShowCategory = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState<Item[]>([]);
    const [editingKey, setEditingKey] = useState('');

    useEffect(() => {
        async function fetchProduct() {
            let { data } = await getAllCategory();

            setData(
                data.map((item: ICategory) => {
                    return {
                        key: item._id,
                        name: item.name,
                        slug: item.slug,
                    }
                }))
        }

        fetchProduct()
    }, [data])

    const isEditing = (record: Item) => record.key === editingKey;

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: record.name, slug: record.slug });
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

            await editCategory(row, key as string);
            message.success("Chỉnh sửa danh mục thành công!");
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            align: 'center',
            width: '33%',
            editable: true,
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            align: 'center',
            width: '33%',
            editable: true,
        },
        {
            title: 'Thao tác',
            dataIndex: 'key',
            align: 'center',
            width: '33%',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return (
                    <div className='flex justify-center items-center'>
                        {editable ? (
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
                        )}
                        <div className='text-blue-500 ml-3'>
                            <Popconfirm
                                title="Bạn có muốn xóa?"
                                okText="Yes"
                                cancelText="No"
                                okButtonProps={{ style: { backgroundColor: '#007bff', color: 'white' } }}
                                onConfirm={() => {
                                    message.success("Xóa danh mục thành công!")
                                    deleteCategory(record.key)
                                }}>
                                <DeleteOutlined />
                            </Popconfirm>
                        </div>
                    </div>
                )
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
                inputType: col.dataIndex === 'number' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const handleAdd = async () => {
        const newCate: any = {
            name: 'Default',
            slug: 'Default',
        }
        try {
            const checkCreate = await createCategory(newCate)
            if (checkCreate) {
                message.success('Thêm mới danh mục thành công!');
            } else {
                throw new Error('Thêm mới danh mục  thất bại!');
            }
        } catch (error: any) {
            message.error(error.message);
        }
    };

    return (
        <Form form={form} component={false}>
            <Button type="primary" onClick={handleAdd} ghost style={{ marginBottom: 16 }}>
                Thêm danh mục
            </Button>
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
                    pageSize: 10
                }}
            />
        </Form>
    )
}