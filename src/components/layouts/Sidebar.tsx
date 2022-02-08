import React from "react";
import { Menu } from 'antd'
import {useHistory} from 'react-router'
import { UserOutlined, ApartmentOutlined, BankOutlined } from "@ant-design/icons"
import "./style.css"
import Logo from "../../images/logo_white.svg"

type SideNavProps = {
    collapse: boolean,
}

const SideNav = (props: SideNavProps) => {
    const { collapse } = props
    const history = useHistory()

    const handleUserClick = () => {
        history.push('/user')
    }

    const handleVideoClick = () => {
        history.push('/companies')
    }

    const handleFileClick = () => {
        history.push('/units')
    }

    return(
        <div>
            <div className="menu-content">
                { collapse ? <div></div> : <img src={Logo} /> }
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key='1' onClick={handleUserClick} >
                    <UserOutlined />
                    <span>Users</span>
                </Menu.Item>
                <Menu.Item key='2' onClick={handleVideoClick} >
                    <BankOutlined />

                    <span> Companies</span>
                </Menu.Item>
                <Menu.Item key='3' onClick={handleFileClick} >
                    <ApartmentOutlined />
                    <span> Units</span>
                </Menu.Item>
                

            </Menu>

        </div>
    )
}

export default SideNav