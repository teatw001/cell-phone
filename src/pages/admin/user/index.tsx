import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { getAllUser } from '../../../api/user';
import { IUser } from '../../../interface/model';

interface DataType {
    key: string;
    email: string;
    password: string;
    role: string
}

const columns: ColumnsType<DataType> = [
    {
        key: 'name',
        title: 'Tên người dùng',
        dataIndex: 'name',
        align: 'center',
        width: '10%'
    },
    {
        key: 'email',
        title: 'Email',
        dataIndex: 'email',
        align: 'center',
        width: '10%'
    },
    {
        key: 'phone',
        title: 'Số điện thoại',
        dataIndex: 'phone',
        align: 'center',
        width: '10%'
    },
    {
        key: 'address',
        title: 'Địa chỉ',
        dataIndex: 'address',
        align: 'center',
        width: '10%'
    },
    {
        key: 'password',
        title: 'Mật khẩu',
        dataIndex: 'password',
        align: 'center',
        width: '10%',
        render: (text: string) => '********'
    },
    {
        key: 'role',
        title: 'Vai trò',
        dataIndex: 'role',
        align: 'center',
        width: '15%',
    }
];

export const AdminUser: React.FC = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchProduct() {
            let { data } = await getAllUser();
            setUsers(
                data.map((item: IUser) => {
                    return {
                        key: item._id,
                        name: item.name,
                        email: item.email,
                        phone: item.phone,
                        address: item.address,
                        password: item.password,
                        role: item.role
                    }
                }))
        }

        fetchProduct()
    }, [])

    return (
        <Table columns={columns} dataSource={users} pagination={{ pageSize: 3 }} />
    )
}