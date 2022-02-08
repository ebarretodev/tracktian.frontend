import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import './style.css'
import SideNav from "../components/layouts/Sidebar"

import User from "../components/pages/Users/User";
import FormUser from "../components/pages/Users/Form";
import FormUserEdit from "../components/pages/Users/FormEdit";
import Companies from "../components/pages/Companies/Companies";
import FormCompanies from "../components/pages/Companies/Form";
import FormCompaniesEdit from "../components/pages/Companies/FormEdit";
import Units from "../components/pages/Units/Units";
import FormUnits from "../components/pages/Units/Form";
import FormUnitsEdit from "../components/pages/Units/FormEdit";
import Assets from "../components/pages/Assets"

const { Header, Sider, Content } = Layout

const ApplicationRoutes = () => {
    const [collapse, setCollapse] = useState(false)

    useEffect(()=>{
        window.innerWidth <=760 ? setCollapse(true) : setCollapse(false)
    }, [])

    const handleToggle = (e: any) => {
        e.preventDefault()
        collapse ? setCollapse(false) : setCollapse(true)
    }

    return(
        <Router>
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapse}>
                    <SideNav collapse={collapse} />
                </Sider>
                <Layout>
                    <Header className="siteLayoutBackground">
                        {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: handleToggle,
                            style: { color: '#fff' }
                        })}
                    </Header>
                    <Content className="content">
                        <Switch>
                            <Route path="/users" exact component={User} />
                            <Route path="/users/add" exact component={FormUser} />
                            <Route path="/users/:id" component={FormUserEdit} />

                            <Route path="/companies" exact component={Companies} />
                            <Route path="/companies/add" exact component={FormCompanies} />
                            <Route path="/companies/:id" component={FormCompaniesEdit} />

                            <Route path="/units" exact component={Units} />
                            <Route path="/units/add" exact component={FormUnits} />
                            <Route path="/units/:id" component={FormUnitsEdit} />

                            <Route path="/assets" exact component={Assets} />

                            <Redirect to="/users" from="/" />
                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        </Router>
    )

}

export default ApplicationRoutes