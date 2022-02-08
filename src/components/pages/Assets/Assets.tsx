import { Row, Col, Typography, Button, Table, message } from "antd";
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
                console.log(res.data)
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
        api.deleteAsset(company.id)
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
            key: asset.id,
            name: asset.name,
            model: asset.model,
            description: asset.description,
            owner: asset.owner,
            status: asset.status,
            health: `${asset.health}%`,
            actions:<div>
                        <Button type="default" htmlType="button" onClick={()=>{history.push(`/assets/${asset.id}`)}}><EditOutlined /></Button>
                        {'   '}
                        <Button type="default" danger htmlType="button" onClick={()=>{deleteAsset(asset)}} ><DeleteOutlined /></Button>
                    </div>,
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