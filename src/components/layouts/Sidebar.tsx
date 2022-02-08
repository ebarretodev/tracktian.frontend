import React from "react";
import { Menu } from 'antd'
import {useHistory} from 'react-router'
import { UserOutlined, ApartmentOutlined, BankOutlined, SubnodeOutlined, AreaChartOutlined } from "@ant-design/icons"
import "./style.css"
import Logo from "../../images/logo_white.svg"

type SideNavProps = {
    collapse: boolean,
}

const SideNav = (props: SideNavProps) => {
    const { collapse } = props
    const history = useHistory()

    const handleOverviewClick = () => {
        history.push('/overview')
    }

    const handleUserClick = () => {
        history.push('/user')
    }

    const handleCompaniesClick = () => {
        history.push('/companies')
    }

    const handleUnitsClick = () => {
        history.push('/units')
    }

    const handleAssetsClick = () => {
        history.push('/assets')
    }


    return(
        <div>
            <div className="menu-content">
                { collapse ? <div></div> : <img src={Logo} /> }
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key='1' onClick={handleOverviewClick} >
                    <AreaChartOutlined />
                    <span> Overview</span>
                </Menu.Item>
                <Menu.Item key='2' onClick={handleUserClick} >
                    <UserOutlined />
                    <span> Users</span>
                </Menu.Item>
                <Menu.Item key='3' onClick={handleCompaniesClick} >
                    <BankOutlined />
                    <span> Companies</span>
                </Menu.Item>
                <Menu.Item key='4' onClick={handleUnitsClick} >
                    <ApartmentOutlined />
                    <span> Units</span>
                </Menu.Item>
                <Menu.Item key='5' onClick={handleAssetsClick} >
                    <SubnodeOutlined />
                    <span> Assets</span>
                </Menu.Item>
            </Menu>

        </div>
    )
}

export default SideNav