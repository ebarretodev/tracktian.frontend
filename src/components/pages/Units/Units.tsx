import { Row, Col, Typography, Button, Table, message, Space, Popconfirm } from "antd";
import { useHistory } from "react-router";
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import React, {useEffect, useState} from "react";
import useApi from '../../../helpers/LocalApi'

const {Title} = Typography


const Units = () => {
    const history = useHistory()
    const [allData, setAllData] = useState([])
    const [loading, setLoading] = useState(true)
    const api = useApi()


    const getUnits = () => {
        api.getUnits()
            .then(res=>{
                setAllData(res.data)
                console.log(res.data)
                setLoading(false)
            })
    }

    useEffect(()=>{
        getUnits()
    },[])

    const handleClick = () => {
        history.push('/tractian.frontend/units/add')
    }

    const deleteUnit = (unit: any) => {
        api.deleteUnit(unit._id)
            .then(res=>{
                message.success('Unit deleted Successfully!')
                getUnits()
            })
            .catch(error => {
                message.error(error)
            })
    }

    const data = [{}]

    allData.map((unit:any)=>{
        data.push({
            key: unit._id,
            name: unit.name,
            owner: unit.owner,
            company: unit.company,
            actions:<Space>
                        <Button type="default" htmlType="button" onClick={()=>{history.push(`/tractian.frontend/units/${unit._id}`)}}><EditOutlined /></Button>
                        <Popconfirm title="Are you sure to delete this user?" onConfirm={()=>{deleteUnit(unit)}} okText="Yes" cancelText="No" >
                            <Button type="default" danger htmlType="button" ><DeleteOutlined /></Button>
                        </Popconfirm>

                    </Space>,
        })
        return data
    })

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Company',
            dataIndex: 'company'
        },
        {
            title: 'Owner',
            dataIndex: 'owner'
        },
        {
            title: 'Actions',
            dataIndex: 'actions'
        }
    ]

    return(
        <div>
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Title level={2}>
                        Units list { loading ? <LoadingOutlined /> : <div></div>}
                    </Title>
                </Col>
                <Col span={6}>
                    <Button onClick={handleClick} block>Add Unit</Button>
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

export default Units