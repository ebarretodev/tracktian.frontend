import React, { ReactElement, useState, useEffect } from "react";
import {Row, Col, Typography, Input, Form, Button, Radio, Select, message} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import useApi from "../../../helpers/LocalApi";
import { useHistory, useParams } from "react-router";
import { ParamsTypes, CompanyType } from '../../../types'


const {Title} = Typography

const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 16 },
}

const FormApp = () => {
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [companies, setCompanies] = useState([])
    const [user, setUser] = useState({
        id: 0,
        username: '',
        email: '',
        gender: '',
        company: '',

    })
    const history = useHistory()
    const api = useApi()

    const { id } = useParams<ParamsTypes>()

    useEffect(()=>{
        api.getUser(id)
            .then(res=>{
                setUser(res.data)
                setLoadingPage(false)
            }).catch( error =>{
                message.error(error)
                history.push('/users')
            })
    }, [])

    useEffect(()=>{
        api.getCompanies()
            .then(res=>{
                setCompanies(res.data)
                setLoadingPage(false)
            })
    }, [])

    const options: ReactElement[] = []

    companies.map((company: CompanyType) => {
        options.push(
            <Select.Option key={company.id} value={company.name} >{company.name }</Select.Option>
        )
    })

    const handleSubmit = (values: any) => {
        setLoading(true)
        api.putUser(user.id, values)
            .then(res=>{
                setLoading(false)
                message.success('User updated successfully!')
                history.push('/users')
            })
            .catch(error => {
                setLoading(false)
                message.error(error)
            })
    }
    return(
    <div>
        { loadingPage ?
        <div></div> :
    	<div>
            <Row gutter={[40, 0]}>
            <Col span={23}>
                <Title style={{textAlign: 'center'}} level={2}>
                Please updated the User info
                { loadingPage ? <LoadingOutlined /> : <div></div>}
                </Title>
            </Col>
            </Row>
            <Row gutter={[40, 0]}>
                <Col span={18}>
                    <Form {...layout} onFinish={handleSubmit}>
                        <Form.Item name="username" label="Username" initialValue={user.username} rules={[{
                            required: true,
                            message: 'Please input your name'
                        }]} >
                            <Input placeholder="Please enter your username" />
                        </Form.Item>
                        <Form.Item name='email' label='Email' initialValue={user.email} rules={[{
                            required:true,
                            message: 'Please input your correct email',
                            type: 'email'
                        }]}>
                            <Input placeholder="Please enter your email" />
                        </Form.Item>
                        <Form.Item name='gender' label='Gender' initialValue={user.gender} rules={[{
                            required: true,
                            message:'Please select your gender'
                        }]} >
                            <Radio.Group>
                                <Radio value="male">Male</Radio>
                                <Radio value="female">Female</Radio>
                                <Radio value="others">Others</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name='company' label='Company' initialValue={user.company} rules={[{
                            required:true,
                            message:'Please select your company'
                        }]}>
                            <Select placeholder="Please select your Company">
                                {options}
                            </Select>
                        </Form.Item>
                        <div style={{textAlign: "right"}} >
                            <Button type="primary" loading={loading} htmlType="submit">Save</Button>{'  '}
                            <Button type="primary" danger htmlType="button" onClick={()=>{history.push('/users')}}>Back</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </div>
        }
    </div>
  );
}

export default FormApp;