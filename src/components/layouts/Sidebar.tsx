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

    const handleDashboardClick = () => {
        history.push('/tractian.frontend/dashboard')
    }

    const handleUserClick = () => {
        history.push('/tractian.frontend/users')
    }

    const handleCompaniesClick = () => {
        history.push('/tractian.frontend/companies')
    }

    const handleUnitsClick = () => {
        history.push('/tractian.frontend/units')
    }

    const handleAssetsClick = () => {
        history.push('/tractian.frontend/assets')
    }


    return(
        <div>
            <div className="menu-content">
                { collapse ? <div></div> : <img src={Logo} /> }
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key='1' onClick={handleDashboardClick} >
                    <AreaChartOutlined />
                    <span> Dashboard</span>
                </Menu.Item>
                <Menu.Item key='2' onClick={handleCompaniesClick} >
                    <BankOutlined />
                    <span> Companies</span>
                </Menu.Item>
                <Menu.Item key='3' onClick={handleUserClick} >
                    <UserOutlined />
                    <span> Users</span>
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