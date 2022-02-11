import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Typography, message, Space, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useHistory } from "react-router";
import useApi from '../../../helpers/LocalApi'

const {Title} = Typography

const User = () => {
    const history = useHistory()
    const [allData, setAllData] = useState([])
    const api = useApi()

    const getAllUsers = async () => {
        const ulist = await api.getUsers()
        setAllData(ulist.data)
        console.log(ulist.data)
    }

    useEffect(()=>{
        getAllUsers()
    },[])

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username'
        },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Gender',
            dataIndex: 'gender'
        },
        {
            title: 'Company',
            dataIndex: 'company'
        },
        {
            title: 'Actions',
            dataIndex: 'actions'
        }
    ]



    const deleteUser = (user: any) => {
        api.deleteUser(user.id)
            .then(res=>{
                message.success('User deleted successfully!')
                getAllUsers()
            })
            .catch(error=>message.error(error))
    }

    const data = [{}]

    allData.map((user:any)=>{
        data.push({
            key: user.id,
            username: user.username,
            email: user.email,
            gender: user.gender,
            company: user.company,
            actions:<Space>
                        <Button type="default" htmlType="button" onClick={()=>{history.push(`/users/${user.id}`)}}><EditOutlined /></Button>
                        <Popconfirm title="Are you sure to delete this user?" onConfirm={()=>{deleteUser(user)}} okText="Yes" cancelText="No" >
                            <Button type="default" danger htmlType="button" ><DeleteOutlined /></Button>
                        </Popconfirm>

                    </Space>,
        })
        return data
    })

    const handleClick = () => {
        history.push('/users/add')
    }

    return(
        <div>
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Title level={2}>
                        User List
                    </Title>
                </Col>
                <Col span={6}>
                    <Button onClick={handleClick} block>Add User</Button>
                </Col>
            </Row>
            <Row gutter={[40, 0]}>
                <Col span={24}>
                    <Table columns={columns} dataSource={data} />
                </Col>
            </Row>
        </div>
    )
}

export default User