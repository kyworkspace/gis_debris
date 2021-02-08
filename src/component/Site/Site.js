import React from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import MainMap from '../../Map/MainMap';

const { Content } = Layout;

function Site() {
    return (
        <div>
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{minHeight: 360 }}>
              <MainMap/>
            </div>
          </Content>
        </div>
    )
}

export default Site
