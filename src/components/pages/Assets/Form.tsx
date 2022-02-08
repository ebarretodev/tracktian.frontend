import React, {useState, useEffect, ReactElement} from "react";
import {Row, Col, Typography, Input, Form, Button, Radio, Switch, Slider, Select, message} from 'antd'
import useApi from "../../../helpers/LocalApi";
import { useHistory } from "react-router";
import { UnitType } from '../../../types'

const {Title} = Typography

const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 16 },
}

const FormApp = () => {
    const [loading, setLoading] = useState(false)
    const history = useHistory()
    const api = useApi()
    const [units, setUnits] = useState([])

    useEffect(()=>{
        api.getUnits()
            .then(res=>{
                setUnits(res.data)
            })
    }, [])

    const optionsUnits: ReactElement[] = []

    units.map((unit: UnitType) => {
        optionsUnits.push(
            <Select.Option key={unit.id} value={unit.name} >{unit.name }</Select.Option>
        )
    })

    const handleSubmit = (values: any) => {
        setLoading(true)
        api.postAsset(values)
            .then(res=>{
                setLoading(false)
                message.success('Asset Added Successfully!')
                history.push('/assets')
            })
            .catch(error => {
                setLoading(false)
                message.error(error)
            })
    }
    return(
    <div>
        <Row gutter={[40, 0]}>
          <Col span={23}>
            <Title style={{textAlign: 'center'}} level={2}>
            Please Fill the Asset Form
            </Title>
        </Col>
        </Row>
        <Row gutter={[40, 0]}>
            <Col span={18}>
                <Form {...layout} onFinish={handleSubmit}>
                    <Form.Item name="name" label="Asset Name" rules={[{
                        required: true,
                        message: 'Please input the Asset name'
                    }]} >
                        <Input placeholder="Please enter the asset name" />
                    </Form.Item>
                    <Form.Item name='model' label='Model' rules={[{
                        required:true,
                        message: 'Please input the correct model'
                    }]}>
                        <Input placeholder="Please enter the model" />
                    </Form.Item>
                    <Form.Item name='description' label='Description' rules={[{
                        required: true,
                        message:'Please insert the description'
                    }]} >
                        <Input placeholder="Please insert the description"/>
                    </Form.Item>
                    <Form.Item name='owner' label='Owner Unit' rules={[{
                        required: true,
                        message:'Please insert the owner unit'
                    }]} >
                        <Select>
                            {optionsUnits}
                        </Select>
                    </Form.Item>
                    <Form.Item name='health' label='Health Level' initialValue="100" >
                        <Slider />
                    </Form.Item>
                    <Form.Item name='status' label='Status' initialValue="Stopped" rules={[{
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
                        <Button type="primary" danger htmlType="button" onClick={()=>{history.push('/assets/')}}>Back</Button>
                    </div>
                </Form>
            </Col>
        </Row>
    </div>
  );
}

export default FormApp;