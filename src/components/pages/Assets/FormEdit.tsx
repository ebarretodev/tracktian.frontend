import React, {useState, useEffect, ReactElement} from "react";
import {Row, Col, Typography, Input, Form, Button, Radio, Switch, Slider, Select, message} from 'antd'
import useApi from "../../../helpers/LocalApi";
import { useHistory, useParams } from "react-router";
import { UnitType, ParamsTypes } from '../../../types'
import { LoadingOutlined } from '@ant-design/icons'

const {Title} = Typography

const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 16 },
}

const FormApp = () => {
    const [loading, setLoading] = useState(false)
    const [loadingPage, setLoadingPage] = useState(true)
    const history = useHistory()
    const api = useApi()
    const [units, setUnits] = useState([])
    const { _id } = useParams<ParamsTypes>()
    const [asset, setAsset] = useState({
        _id: '',
        name: '',
        model: '',
        description: '',
        owner: '',
        status: '',
        health: '',
    })
    useEffect(()=>{
        api.getAsset(_id)
            .then(res=>{
                setAsset(res.data)
                setLoadingPage(false)
                setLoading(false)
            }).catch( error =>{
                message.error(error)
                history.push('/tractian.frontend/assets')
            })
    }, [])

    useEffect(()=>{
        api.getUnits()
            .then(res=>{
                setUnits(res.data)
            })
    }, [])

    const optionsUnits: ReactElement[] = []

    units.map((unit: UnitType) => {
        optionsUnits.push(
            <Select.Option key={unit._id} value={unit.name} >{unit.name }</Select.Option>
        )
    })

    const handleSubmit = (values: any) => {
        setLoading(true)
        api.putAsset(asset._id, values)
            .then(res=>{
                setLoading(false)
                message.success('Asset updated Successfully!')
                history.push('/tractian.frontend/assets')
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
            Please Fill the Asset Form { loading ? <LoadingOutlined /> : <div></div>}
            </Title>
        </Col>
        </Row>
        <Row gutter={[40, 0]}>
            <Col span={18}>
                <Form {...layout} onFinish={handleSubmit}>
                    <Form.Item name="name" label="Asset Name" initialValue={asset.name} rules={[{
                        required: true,
                        message: 'Please input the Asset name'
                    }]} >
                        <Input placeholder="Please enter the asset name" />
                    </Form.Item>
                    <Form.Item name='model' label='Model' initialValue={asset.model} rules={[{
                        required:true,
                        message: 'Please input the correct model'
                    }]}>
                        <Input placeholder="Please enter the model" />
                    </Form.Item>
                    <Form.Item name='description' label='Description' initialValue={asset.description} rules={[{
                        required: true,
                        message:'Please insert the description'
                    }]} >
                        <Input placeholder="Please insert the description"/>
                    </Form.Item>
                    <Form.Item name='owner' label='Owner Unit' initialValue={asset.owner} rules={[{
                        required: true,
                        message:'Please insert the owner unit'
                    }]} >
                        <Select>
                            {optionsUnits}
                        </Select>
                    </Form.Item>
                    <Form.Item name='health' label='Health Level' initialValue={asset.health} >
                        <Slider />
                    </Form.Item>
                    <Form.Item name='status' label='Status' initialValue={asset.status} rules={[{
                        required: true,
                        message:'Please insert the description'
                    }]} >
                        <Radio.Group >
                            <Radio value="Running">Running</Radio>
                            <Radio value="Alerting">Alerting</Radio>
                            <Radio value="Stopped">Stopped</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <div style={{textAlign: "right"}} >
                        <Button type="primary" loading={loading} htmlType="submit">Save</Button>{'  '}
                        <Button type="primary" danger htmlType="button" onClick={()=>{history.push('/tractian.frontend/assets/')}}>Back</Button>
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