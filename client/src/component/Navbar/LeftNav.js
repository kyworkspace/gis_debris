import React, { useCallback, useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { Layout} from 'antd';
import FooterComponent from '../Footer/Footer';
import Site from '../Site/Site';
import logo_small from '../../Images/logo_small.png'
import logo_large from '../../Images/logo_large.png'
import NavbarMenu from '../NavbarMenu/NavbarMenu';
import TableList from '../List/TableList';
import TableDetail from '../Detail/TableDetail';
import UtilBox from '../../component/Map/Section/UtilBox';



const { Header, Content, Footer, Sider } = Layout;

function LeftNav() {
    const [Collapesd, setCollapesd] = useState(true);
    const [GridDisplay, setGridDisplay] = useState(false)
    const [DetailDisplay, setDetailDisplay] = useState(false);
    const [DetailItem, setDetailItem] = useState({});
    const [ListPosition, setListPosition] = useState('80px')
    const [Type, setType] = useState("");

    const onCollapse = (collapse) =>{//사이드바 접고 펼치는 함수
        collapse ? setListPosition('80px'):setListPosition('200px')
        setCollapesd(collapse)
    }
    const onSelectMenu =(type)=>{
        setGridDisplay(true)
        setDetailDisplay(false);
        setType(type);
        //테이블 데이터 소스 바꿔줄것
    }
    const onDetailMenu = useCallback(
        (item) => {
        //리스트 표출 여부
        setGridDisplay(false);
        //상세 창 표출 여부
        setDetailDisplay(true)
        setDetailItem(item);
        },
        [],
    )
    const onDetailSectionHide = useCallback(
        () => {
            setDetailDisplay(false);
            setGridDisplay(true);
        },
        [],
    )

    return (
        <>
        <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={Collapesd} onCollapse={onCollapse}>
            {/* <div className="logo" >
                <img src={Collapesd ? logo_small : logo_large} alt="logo"
                    style={{
                        width:'100%',
                        maxHeight:'70px',
                        padding: 10
                    }}
                />
            </div> */}
        <NavbarMenu menuSelect={onSelectMenu}/>
        
        </Sider>
        {
            GridDisplay && <div className="LeftSideListMenu" style={{left:ListPosition,minWidth:"420px", maxHeight:"100vh", overflowY:"auto"}}><TableList type={Type} detailDisplay={onDetailMenu} listHide={setGridDisplay}/></div>
        }
        {
            DetailDisplay && <div className="LeftSideListMenu" style={{left:ListPosition,minWidth:"420px",maxWidth:"420px", maxHeight:"100vh", overflowY:'auto'}}><TableDetail type={Type} detailItem={DetailItem} listHide={onDetailSectionHide}/></div>
        }
        <Layout className="site-layout">
            <Site/>
            {/* <FooterComponent/> */}
            <UtilBox/>
        </Layout>
      </Layout>
      
      </>
    )
}

export default LeftNav
