import React, {useState, useEffect, ReactElement} from "react";
import {Row, Col, Typography, Input, Form, Button, message, Select} from 'antd'
import useApi from "../../../helpers/LocalApi";
import { useHistory } from "react-router";
import { CompanyType, UserType } from '../../../types'

const {Title} = Typography

const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 16 },
}

const FormApp = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const [companies, setCompanies] = useState([])
    const [users, setUsers] = useState([])
    const api = useApi()

    useEffect(()=>{
        api.getCompanies()
            .then(res=>{
                setCompanies(res.data)
            })
    }, [])

    useEffect(()=>{
        api.getUsers()
            .then(res=>{
                setUsers(res.data)
            })
    }, [])

    const handleSubmit = (values: any) => {
        setLoading(true)
        api.postUnit(values)
            .then(res=>{
                setLoading(false)
                message.success('Unit Added Successfully!')
                history.push('/units')
            })
            .catch(error => {
                setLoading(false)
                message.error(error)
            })
    }

    const optionsCompanies: ReactElement[] = []

    companies.map((company: CompanyType) => {
        optionsCompanies.push(
            <Select.Option key={company._id} value={company.name} >{company.name }</Select.Option>
        )
    })

    const optionsUsers: ReactElement[] = []

    users.map((user: UserType) => {
        optionsUsers.push(
            <Select.Option key={user._id} value={user.username} >{user.username }</Select.Option>
        )
    })



    return(
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
            Please Fill the Unit Form
            </Title>
        </Col>
        </Row>
        <Row gutter={[40, 0]}>
            <Col span={18}>
                <Form {...layout} onFinish={handleSubmit}>
                    <Form.Item name="name" label="Unit Name" rules={[{
                        required: true,
                        message: 'Please input your Company name'
                    }]} >
                        <Input placeholder="Please enter Unit name" />
                    </Form.Item>
                    <Form.Item name='company' label='Company' rules={[{
                        required:true,
                        message: 'Please select company name'
                    }]}>
                        <Select placeholder="Please select company name" >
                            {optionsCompanies}
                        </Select>
                    </Form.Item>
                    <Form.Item name='owner' label='Owner Name' rules={[{
                        required: true,
                        message:'Please select the owner name'
                    }]} >
                        <Select placeholder="Please select the owner name">
                            {optionsUsers}
                        </Select>
                    </Form.Item>
                    <div style={{textAlign: "right"}} >
                        <Button type="primary" loading={loading} htmlType="submit">Save</Button>{'  '}
                        <Button type="primary" danger htmlType="button" onClick={()=>{history.push('/units')}}>Back</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </div>
  );
}

export default FormApp;