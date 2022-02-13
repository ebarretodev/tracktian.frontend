import { Row, Col, Typography, Button, Table, message, Space, Popconfirm } from "antd";
import { useHistory } from "react-router";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React, {useEffect, useState} from "react";
import useApi from '../../../helpers/LocalApi'

const {Title} = Typography

const Assets = () => {
    const history = useHistory()
    const [allData, setAllData] = useState([])
    const api = useApi()

    const getAssets = () => {
        api.getAssets()
            .then(res=>{
                setAllData(res.data)
            })
    }

    useEffect(()=>{
        getAssets()
    },[])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Model',
            dataIndex: 'model'
        },
        {
            title: 'Owner',
            dataIndex: 'owner'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Health level',
            dataIndex: 'health'
        },
        {
            title: 'Actions',
            dataIndex: 'actions'
        }
    ]

    const deleteAsset = (company: any) => {
        api.deleteAsset(company._id)
            .then(res=>{
                message.success('Company deleted Successfully!')
                getAssets()
            })
            .catch(error => {
                message.error(error)
            })
    }

    const data = [{}]

    allData.map((asset:any)=>{
        data.push({
            key: asset._id,
            name: asset.name,
            model: asset.model,
            description: asset.description,
            owner: asset.owner,
            status: asset.status,
            health: `${asset.health}%`,
            actions:<Space>
                        <Button type="default" htmlType="button" onClick={()=>{history.push(`/assets/${asset._id}`)}}><EditOutlined /></Button>
                        <Popconfirm title="Are you sure to delete this user?" onConfirm={()=>{deleteAsset(asset)}} okText="Yes" cancelText="No" >
                            <Button type="default" danger htmlType="button" ><DeleteOutlined /></Button>
                        </Popconfirm>
                    </Space>,
        })
        return data
    })

    const handleClick = () => {
        history.push('/assets/add')
    }

    return(
        <div>
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Title level={2}>
                        Assets list
                    </Title>
                </Col>
                <Col span={6}>
                    <Button onClick={handleClick} block>Add Asset</Button>
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

export default Assets