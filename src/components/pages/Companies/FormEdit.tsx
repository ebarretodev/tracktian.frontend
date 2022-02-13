import React, {useState, useEffect, useReducer} from "react";
import {Row, Col, Typography, Input, Form, Button, Radio, Switch, Slider, Select, message} from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import useApi from "../../../helpers/LocalApi";
import { useHistory, useParams } from "react-router";
import { ParamsTypes } from '../../../types'

const {Title} = Typography

const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 16 },
}

const FormApp = () => {
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const [company, setCompany] = useState({
        _id: '',
        name: '',
        address: '',
        business: '',
    })
    const history = useHistory()
    const api = useApi()
    const { _id } = useParams<ParamsTypes>()

    useEffect(()=>{
        api.getCompany(_id)
            .then(res=>{
                setCompany(res.data)
                setLoadingPage(false)
            }).catch( error =>{
                message.error(error)
                history.push('/users')
            })
    }, [])

    const handleSubmit = (values: any) => {
        setLoading(true)
        api.putCompany(company._id,values)
            .then(res=>{
                setLoading(false)
                message.success('User updated successfully!')
                history.push('/companies')
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
                    <Form.Item name="name" label="Company Name" initialValue={company.name} rules={[{
                        required: true,
                        message: 'Please input your Company name'
                    }]} >
                        <Input placeholder="Please enter your company name" />
                    </Form.Item>
                    <Form.Item name='address' label='Address' initialValue={company.address} rules={[{
                        required:true,
                        message: 'Please input your correct address'
                    }]}>
                        <Input placeholder="Please enter your address" />
                    </Form.Item>
                    <Form.Item name='business' label='Business Segment' initialValue={company.business} rules={[{
                        required: true,
                        message:'Please insert your business segment'
                    }]} >
                        <Input placeholder="Please insert your business segment"/>
                    </Form.Item>
                        <div style={{textAlign: "right"}} >
                            <Button type="primary" loading={loading} htmlType="submit">Save</Button>{'  '}
                            <Button type="primary" danger htmlType="button" onClick={()=>{history.push('/companies/')}}>Back</Button>
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