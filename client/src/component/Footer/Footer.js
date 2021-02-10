import React from 'react'
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

function FooterComponent() {
    return (
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    )
}

export default FooterComponent
