import React, { useState, useEffect, ReactElement } from "react";
import { Row, Col, Typography, Select, Divider, Table  } from "antd";
import { ApartmentOutlined as UnitIcon, BankOutlined as CompanyIcon, SubnodeOutlined as AssetIcon, AreaChartOutlined, ArrowDownOutlined } from "@ant-design/icons"
import useApi from "../../../helpers/LocalApi";
import { CompanyType, UnitType, AssetType, DataDashboardType } from '../../../types'
import './style.css'
import SolidChart from "./SolidGaugeChart";
import MultipleSolidGauge from './MultipleSolidGauge'

const { Title, Text } = Typography

const layout = {
    labelCol: { span: 8},
    wrapperCol: { span: 16 },
}

const Dashboard = () =>{
    const [companies, setCompanies] = useState([{
        name: '',
        _id: '',
        address: '',
        business: ''
    }])
    const [units, setUnits] = useState([])
    const [assets, setAssets] = useState([])
    const [users, setUsers] = useState([])
    const api = useApi()

    const [loadingPage, setLoadingPage] = useState(true)
    const [loadingCompanies, setLoadingCompanies] = useState(false)
    const [loadingUnits, setLoadingUnits] = useState(false)
    const [loadingAssets, setLoadingAssets] = useState(false)
    const [loadingUsers, setLoadingUsers] = useState(false)
    const [loadingCharts, setLoadingCharts] = useState(false)

    const [companySelected, setCompanySelected] = useState<string|undefined>()
    const [unitSelected, setUnitSelected] = useState<string|undefined>()
    const [assetSelected, setAssetSelected] = useState<string|undefined>()
    const [dataTable, setDataTable] = useState<{}[]>([])

    const [dataDashboard, setDataDasaboard] = useState<DataDashboardType>()

    const [selectEnableUnit, setSelectEnableUnit] = useState(true)
    const [selectEnableAsset, setSelectEnableAsset] = useState(true)

    useEffect(()=>{
        api.getCompanies()
            .then(res=>{
                setCompanies(res.data)
                setCompanySelected(res.data[0].name)
                setSelectEnableUnit(false)
                setLoadingCompanies(true)
            })
        api.getUnits()
            .then(res=>{
                setUnits(res.data)
                setLoadingUnits(true)
            })
        api.getAssets()
            .then(res=>{
                setAssets(res.data)
                setLoadingAssets(true)
            })
        api.getUsers()
            .then(res=>{
                setUsers(res.data)
                setLoadingUsers(true)
            })
    },[])

    useEffect(()=>{
        if(loadingAssets && loadingCompanies && loadingUnits && loadingUsers){
            setLoadingCharts(true)
        }
    },[loadingAssets, loadingCompanies, loadingUnits, loadingUsers])

    const optionsCompanies: ReactElement[] = []
    companies.map((company: CompanyType, index) => {
        optionsCompanies.push(
            <Select.Option key={company._id} value={company.name} > <CompanyIcon /> {company.name }</Select.Option>
        )})

    const selectCompanyChange = (newValue: any) => {
            setCompanySelected(newValue)
            if(newValue !== undefined){
                setUnitSelected(undefined)
                setAssetSelected(undefined)
                setSelectEnableUnit(false)
            } else {
                setSelectEnableUnit(true)
            }
    }

    useEffect(()=>{
        setUnitSelected(undefined)
        setAssetSelected(undefined)
    },[companySelected])

    useEffect(()=>{
        setAssetSelected(undefined)
        if(unitSelected===undefined){
            setSelectEnableAsset(true)
        }
    },[unitSelected])

    const optionsUnits: ReactElement[] = []
    units.map((unit: UnitType) => {
        if(unit.company === companySelected){
            optionsUnits.push(
                <Select.Option key={unit._id} value={unit.name} ><UnitIcon /> {unit.name}</Select.Option>
            )
        }
    })

    const selectUnitChange = (newValue: any) => {
        setUnitSelected(newValue)
        setAssetSelected(undefined)
        if(newValue !== undefined){
            setSelectEnableAsset(false)
        } else {
            setSelectEnableAsset(true)
        }
    }

    const optionsAssets: ReactElement[] = []

    assets.map((asset: AssetType) => {
        if(asset.owner === unitSelected){
            optionsAssets.push(
                <Select.Option key={asset._id} value={asset.name} ><AssetIcon /> {asset.name }</Select.Option>
            )
        }
    })

    const selectAssetChange = (newValue: any) => {
        setAssetSelected(newValue)
    }

    useEffect(()=>{
        let allAssetsFromSelection: Array<AssetType> = []
        let allUnitsFromSelection: Array<UnitType> = []
        if(companySelected === undefined){
            setLoadingPage(true)
        } else {
            setLoadingPage(false)
            if(unitSelected === undefined){
                allUnitsFromSelection = units.filter((unit: UnitType) => unit.company === companySelected)
                let namesAllUnits = allUnitsFromSelection.map((unit: UnitType) => unit.name)
                allAssetsFromSelection = assets.filter((asset: AssetType) => namesAllUnits.includes(asset.owner))
            } else {
                if(assetSelected === undefined){
                    allAssetsFromSelection = assets.filter((asset: AssetType) => asset.owner === unitSelected )
                } else {
                    allAssetsFromSelection = assets.filter((asset: AssetType)=> asset.name === assetSelected)
                }
            }
        }
        let totalAssets = allAssetsFromSelection.length
        let totalUnits = allUnitsFromSelection.length != 0 ? allUnitsFromSelection.length : 1
        let stoppedCount = allAssetsFromSelection.filter((asset: AssetType) => asset.status.toLowerCase() === 'stopped').length
        let alertingCount = allAssetsFromSelection.filter((asset: AssetType) => asset.status.toLowerCase() === 'alerting').length
        let runningCount = allAssetsFromSelection.filter((asset: AssetType) => asset.status.toLowerCase() === 'running').length
        let healthRatio = Math.round(allAssetsFromSelection.length != 0 ? allAssetsFromSelection.map((asset: AssetType) => parseInt(asset.health)).reduce((acc, cur) => acc + cur) / allAssetsFromSelection.length : 0)

        setDataDasaboard({
            totalAssets,
            totalUnits,
            stoppedCount,
            alertingCount,
            runningCount,
            healthRatio,
            assets: allAssetsFromSelection
        })

        const data = [{}]

        allAssetsFromSelection.map((asset:any)=>{
            data.push({
                key: asset._id,
                name: asset.name,
                model: asset.model,
                description: asset.description,
                owner: asset.owner,
                status: asset.status.toLowerCase() === 'running' ?
                    <Text type='success'>{asset.status}</Text> :
                    asset.status.toLowerCase() === 'alerting' ?
                    <Text type='warning'>{asset.status}</Text> :
                    <Text type='danger'>{asset.status}</Text>,
                health: asset.health >= 80 ?
                    <Text type='success'>{asset.health}%</Text> :
                    asset.health >= 50 ?
                    <Text type='warning'>{asset.health}%</Text> :
                    <Text type='danger'>{asset.health}%</Text>,
            })
            return data
        })
        setDataTable(data)
    },[ companySelected, unitSelected, assetSelected, loadingCharts])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Description',
            dataIndex: 'description'
        },
        {
            title: 'Model',
            dataIndex: 'model'
        },
        {
            title: 'Owner',
            dataIndex: 'owner'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Health level',
            dataIndex: 'health'
        },
    ]

    return(
        <div>
            <div>
                <Row gutter={[40, 0]}>
                    <Col span={18}>
                        <Title level={2}>
                            Select below to monitor:
                        </Title>
                    </Col>
                </Row>
                <Row gutter={[40, 0]}>
                    <div className="div-info">
                        <div className="div-center-item" >
                            <Select style={{width: 300 }}
                            allowClear
                            placeholder="Select Company"
                            optionFilterProp="children"
                            showSearch
                            value={companySelected}
                            onChange={selectCompanyChange}
                            >
                                {optionsCompanies}
                            </Select>
                        </div>
                        <div className="div-center-item" >
                            <Select style={{width: 300 }}
                            allowClear
                            disabled={selectEnableUnit}
                            placeholder="Select Unit"
                            optionFilterProp="children"
                            showSearch
                            value={unitSelected}
                            onChange={selectUnitChange}
                            >
                                {optionsUnits}
                            </Select>
                        </div>
                        <div className="div-center-item" >
                            <Select style={{width: 300 }}
                            allowClear
                            disabled={selectEnableAsset}
                            placeholder="Select Asset"
                            optionFilterProp="children"
                            value={assetSelected}
                            onChange={selectAssetChange}
                            showSearch>
                                {optionsAssets}
                            </Select>
                        </div>
                    </div>
                </Row>
                <Divider />
                {loadingPage ? <div>
                    </div> : <div>
                        <Row gutter={[40, 0]}>
                            <div className="div-dashboard">
                                <div className="div-info-data">
                                    <div className="div-info-data-item">
                                        <span>Total Units: </span>
                                        {dataDashboard?.totalUnits}
                                    </div>
                                    <div className="div-info-data-item">
                                        <span>Total Assets: </span>
                                        {dataDashboard?.totalAssets}
                                    </div>
                                </div>
                                <div className="div-chart">
                                    <h2>Health</h2>
                                    <SolidChart data={dataDashboard?.healthRatio} />
                                </div>
                                <div className="div-chart">
                                    <MultipleSolidGauge
                                        dataRun={dataDashboard?.runningCount}
                                        dataAlert={dataDashboard?.alertingCount}
                                        dataStopped={dataDashboard?.stoppedCount}
                                            />
                                </div>
                            </div>
                        </Row>
                        <Row gutter={[40, 0]}>
                            <Col span={24}>
                                <Table columns={columns} dataSource={dataTable} />
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        </div>
    )
}

export default Dashboard