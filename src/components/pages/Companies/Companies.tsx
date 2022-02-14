import { Row, Col, Typography, Button, Table, message, Space, Popconfirm } from "antd";
import { useHistory } from "react-router";
import { DeleteOutlined, EditOutlined, LoadingOutlined } from '@ant-design/icons'
import React, {useEffect, useState} from "react";
import useApi from '../../../helpers/LocalApi'

const {Title} = Typography

const Companies = () => {
    const history = useHistory()
    const [allData, setAllData] = useState([])
    const [loading, setLoading] = useState(true)
    const api = useApi()

    const getCompanies = () => {
        api.getCompanies()
            .then(res=>{
                setAllData(res.data)
                console.log(res.data)
                setLoading(false)
            })
    }

    useEffect(()=>{
        getCompanies()
    },[])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Address',
            dataIndex: 'address'
        },
        {
            title: 'Business Segment',
            dataIndex: 'business'
        },
        {
            title: 'Actions',
            dataIndex: 'actions'
        }
    ]

    const deleteCompany = (company: any) => {
        api.deleteCompany(company._id)
            .then(res=>{
                message.success('Company deleted Successfully!')
                getCompanies()
            })
            .catch(error => {
                message.error(error)
            })
    }

    const data = [{}]

    allData.map((company:any)=>{
        data.push({
            key: company._id,
            name: company.name,
            address: company.address,
            business: company.business,
            actions:<Space>
                        <Button type="default" htmlType="button" onClick={()=>{history.push(`/tractian.frontend/companies/${company._id}`)}}><EditOutlined /></Button>
                        <Popconfirm title="Are you sure to delete this user?" onConfirm={()=>{deleteCompany(company)}} okText="Yes" cancelText="No" >
                            <Button type="default" danger htmlType="button" ><DeleteOutlined /></Button>
                        </Popconfirm>

                    </Space>,
        })
        return data
    })

    const handleClick = () => {
        history.push('/tractian.frontend/companies/add')
    }

    return(
        <div>
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Title level={2}>
                        Companies list { loading ? <LoadingOutlined /> : <div></div>}
                    </Title>
                </Col>
                <Col span={6}>
                    <Button onClick={handleClick} block>Add Company</Button>
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

export default Companies