import React, {ReactElement, useEffect, useState} from "react";
import {Row, Col, Typography, Input, Form, Button, Radio, Select, message} from 'antd'
import useApi from '../../../helpers/LocalApi'
import { useHistory } from "react-router";
import { CompanyType } from '../../../types'

const {Title} = Typography

const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 16 },
}

const FormApp = () => {
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const history = useHistory()
    const [companies, setCompanies] = useState([])
    const api = useApi()

    useEffect(()=>{
        api.getCompanies()
            .then(res=>{
                setCompanies(res.data)
                setLoadingPage(false)
            })
    }, [])

    const handleSubmit = (values: any) => {
        setLoading(true)
        api.postUser(values)
            .then(res=>{
                setLoading(false)
                message.success('User Added Successfully!')
                history.push('/list')
            })
            .catch(error => {
                setLoading(false)
                message.error(error)
            })
    }

    const options: ReactElement[] = []

    companies.map((company: CompanyType) => {
        options.push(
            <Select.Option key={company.id} value={company.name} >{company.name }</Select.Option>
        )
    })

    return(
    <div>
        {loadingPage ? <div></div> : <div>
            <Row gutter={[40, 0]}>
            <Col span={23}>
                <Title style={{textAlign: 'center'}} level={2}>
                Please Fill the User Form
                </Title>
            </Col>
            </Row>
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Form {...layout} onFinish={handleSubmit}>
                        <Form.Item name="username" label="Username" rules={[{
                            required: true,
                            message: 'Please input your name'
                        }]} >
                            <Input placeholder="Please enter your username" />
                        </Form.Item>
                        <Form.Item name='email' label='Email' rules={[{
                            required:true,
                            message: 'Please input your correct email',
                            type: 'email'
                        }]}>
                            <Input placeholder="Please enter your email" />
                        </Form.Item>
                        <Form.Item name='gender' label='Gender' rules={[{
                            required: true,
                            message:'Please select your gender'
                        }]} >
                            <Radio.Group>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="others">Others</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name='company' label='Company' rules={[{
                            required:true,
                            message:'Please select your company'
                        }]}>
                            <Select placeholder="Please select your Company">
                                {options}
                            </Select>
                        </Form.Item>
                        <div style={{textAlign: "right"}} >
                            <Button type="primary" loading={loading} htmlType="submit">Save</Button>{'  '}
                            <Button type="primary" danger htmlType="button" onClick={()=>{history.push('/list')}}>Back</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>}
    </div>
  );
}

export default FormApp;