import React, { useState, useEffect } from "react";
import { Table, Row, Col, Button, Typography, message, Space, Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import { useHistory } from "react-router";
import useApi from '../../../helpers/LocalApi'

const {Title} = Typography

const User = () => {
    const history = useHistory()
    const [allData, setAllData] = useState([])
    const [loading, setLoading] = useState(true)
    const api = useApi()

    const getAllUsers = async () => {
        const ulist = await api.getUsers()
        setAllData(ulist.data)
        setLoading(false)
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
        api.deleteUser(user._id)
            .then(res=>{
                message.success('User deleted successfully!')
                getAllUsers()
            })
            .catch(error=>message.error(error))
    }

    const data = [{}]

    allData.map((user:any)=>{
        data.push({
            key: user._id,
            username: user.username,
            email: user.email,
            gender: user.gender,
            company: user.company,
            actions:<Space>
                        <Button type="default" htmlType="button" onClick={()=>{history.push(`/tractian.frontend/users/${user._id}`)}}><EditOutlined /></Button>
                        <Popconfirm title="Are you sure to delete this user?" onConfirm={()=>{deleteUser(user)}} okText="Yes" cancelText="No" >
                            <Button type="default" danger htmlType="button" ><DeleteOutlined /></Button>
                        </Popconfirm>

                    </Space>,
        })
        return data
    })

    const handleClick = () => {
        history.push('/tractian.frontend/users/add')
    }

    return(
        <div>
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Title level={2}>
                        User List { loading ? <LoadingOutlined /> : <div></div>}
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