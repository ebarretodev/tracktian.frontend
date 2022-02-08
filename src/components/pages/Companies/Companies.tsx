import { Row, Col, Typography, Button, Table, message } from "antd";
import { useHistory } from "react-router";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import React, {useEffect, useState} from "react";
import axios from "axios";

const {Title} = Typography

const Companies = () => {
    const history = useHistory()
    const [allData, setAllData] = useState([])

    const getCompanies = () => {
        axios.get(`http://localhost:5000/companies/`)
            .then(res=>{
                setAllData(res.data)
                console.log(res.data)
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
        axios.delete(`http://localhost:5000/companies/${company.id}`)
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
            key: company.id,
            name: company.name,
            address: company.address,
            business: company.business,
            actions:<div>
                        <Button type="default" htmlType="button" onClick={()=>{history.push(`/companies/${company.id}`)}}><EditOutlined /></Button>
                        {'   '}
                        <Button type="default" danger htmlType="button" onClick={()=>{deleteCompany(company)}} ><DeleteOutlined /></Button>
                    </div>,
        })
        return data
    })

    const handleClick = () => {
        history.push('/companies/add')
    }

    return(
        <div>
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Title level={2}>
                        Companies list
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