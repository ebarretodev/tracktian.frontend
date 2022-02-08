import React, {useState, useEffect, ReactElement} from "react";
import {Row, Col, Typography, Input, Form, Button, message, Select} from 'antd'
import useApi from "../../../helpers/LocalApi";
import { useHistory, useParams } from "react-router";
import { CompanyType, UserType } from '../../../types'


type ParamsTypes = {
    id: string,
}

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

    const [loadingPage, setLoadingPage] = useState(true)
    const [unit, setUnit] = useState({
        id: 0,
        name: '',
        owner: '',
        company: '',
    })


    const { id } = useParams<ParamsTypes>()

    useEffect(()=>{
        api.getUnit(id)
            .then(res=>{
                setUnit(res.data)
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
        api.putUnit(unit.id, values)
            .then(res=>{
                setLoading(false)
                message.success('Unit Edited Successfully!')
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
            <Select.Option key={company.id} value={company.name} >{company.name }</Select.Option>
        )
    })

    const optionsUsers: ReactElement[] = []

    users.map((user: UserType) => {
        optionsUsers.push(
            <Select.Option key={user.id} value={user.username} >{user.username }</Select.Option>
        )
    })



    return(
    <div>
        { loadingPage ?
        <div></div> :
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
                    <Form.Item name="name" label="Unit Name" initialValue={unit.name} rules={[{
                        required: true,
                        message: 'Please input the unit name'
                    }]} >
                        <Input placeholder="Please enter Unit name" />
                    </Form.Item>
                    <Form.Item name='company' label='Company' initialValue={unit.company} rules={[{
                        required:true,
                        message: 'Please select company name'
                    }]}>
                        <Select placeholder="Please select company name" >
                            {optionsCompanies}
                        </Select>
                    </Form.Item>
                    <Form.Item name='owner' label='Owner Name' initialValue={unit.owner} rules={[{
                        required: true,
                        message:'Please select the owner name'
                    }]} >
                        <Select placeholder="Please select the owner name">
                            {optionsUsers}
                        </Select>
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