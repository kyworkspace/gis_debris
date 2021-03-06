import React, { createContext, useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import FooterComponent from '../Footer/Footer';
import Site from './Site/Site';
import logo_small from '../../Images/logo_small.png'
import logo_large from '../../Images/logo_large.png'
import NavbarMenu from './NavbarMenu/NavbarMenu';
import TableList from '../List/TableList';
import TableDetail from '../Detail/TableDetail';
import UtilBox from './Map/Section/UtilBox';



const { Header, Content, Footer, Sider } = Layout;

export const MenuTypeContext = createContext({
    prevMenu: {}, //이전메뉴
    menu: "", //지금메뉴
    listDisplay: false, //리스트보여줄건지
    detailDisplay: false, //상세보여줄건지
    dispatch: () => { }, //디스패치
    detailItem: {}, //상세보기 할때 아이템
    searchKeyword : "", //검색어 항목
})
const initialState = {
    prevMenu: { //이전메뉴
        menu: "",
        listDisplay: false,
        detailDisplay: false,
        searchKeyword : ""
    },
    menu: "",
    listDisplay: false,
    detailDisplay: false,
    detailItem: {},
    searchKeyword : "",
}
export const MENU_CHANGE = "MENU_CHANGE";
export const LIST_DISPLAY = "LIST_DISPLAY";
export const DETAIL_DISPLAY = "DETAIL_DISPLAY";
export const MOVE_TO_PREV = "MOVE_TO_PREV";
export const SET_SEARCHKEYWORD = "SET_SEARCHKEYWORD";

const reducer = (state, action) => {
    switch (action.type) {
        case MENU_CHANGE:
            
            let item = {};
            if (action.detailItem) {
                item = action.detailItem
            }
            return {
                ...state,
                prevMenu: {
                    menu: state.menu,
                    listDisplay: state.listDisplay,
                    detailDisplay: state.detailDisplay,
                    detailItem: state.detailItem,
                    searchKeyword : state.searchKeyword
                },
                menu: action.menu,
                listDisplay: true,
                detailDisplay: false,
                detailItem: item,
                searchKeyword : "",
            }
        case LIST_DISPLAY:
            return {
                ...state,
                prevMenu: {
                    menu: state.menu,
                    listDisplay: state.listDisplay,
                    detailDisplay: state.detailDisplay,
                    detailItem: state.detailItem,
                },
                listDisplay: true,
                detailDisplay: false,
                detailItem: {},
            }
        case DETAIL_DISPLAY:
            return {
                ...state,
                prevMenu: {
                    menu: state.menu,
                    listDisplay: state.listDisplay,
                    detailDisplay: state.detailDisplay,
                    detailItem: state.detailItem,
                    searchKeyword : state.searchKeyword
                },
                detailItem: action.item,
                listDisplay: false,
                detailDisplay: true,
                searchKeyword : "",
            }
        case MOVE_TO_PREV:
        
            let prevState = state.prevMenu;// 이전 메뉴 정보 ㅇㅋ?
            let menu, detailItem, listDisplay, detailDisplay, prevKeyword;

            console.log(prevState);
            if (prevState.menu !== "") { //기존 메뉴 정보가 있을때

                menu = prevState.menu;

                if(document.getElementById(menu).classList.contains("ant-menu-item-selected")){
                    
                }else{
                    document.getElementById(state.menu).classList.remove("ant-menu-item-selected");  //지금 메뉴 비활성화
                    document.getElementById(menu).classList.add("ant-menu-item-selected"); //이전 메뉴 활성화
                }
                listDisplay = prevState.listDisplay;
                detailDisplay = prevState.detailDisplay;
                detailItem = prevState.detailItem;
                prevKeyword = state.prevMenu.searchKeyword;
                
            } else if (state.detailDisplay) { // 기존 메뉴 정보가 없는데 상세화면 이라면 해당 메뉴의 리스트로
                menu = state.menu
                listDisplay = true;
                detailDisplay = false;
                detailItem = {}
            } else {//라스트 목록이면 사라지기
                menu = "";
                listDisplay = false;
                detailDisplay = false;
                detailItem = {}
            }
            return {
                ...state,
                menu: menu,
                listDisplay: listDisplay,
                detailDisplay: detailDisplay,
                prevMenu: {menu : ""},
                detailItem: detailItem,
                searchKeyword : prevKeyword

            }
        case SET_SEARCHKEYWORD :
            return {
                ...state,
                searchKeyword : action.keyword
            }
        default:
            break;
    }
}

function MainComponent() {
    const [Collapesd, setCollapesd] = useState(true);
    const [ListPosition, setListPosition] = useState('80px')

    const [state, dispatch] = useReducer(reducer, initialState)
    const { menu, listDisplay, detailDisplay, detailItem, searchKeyword } = state;

    const onCollapse = (collapse) => {//사이드바 접고 펼치는 함수
        collapse ? setListPosition('80px') : setListPosition('200px')
        setCollapesd(collapse)
    }
    const value = { menu, dispatch, detailItem , searchKeyword };
    return (
        <>
            <Layout style={{ minHeight: '100vh' }}>
                <MenuTypeContext.Provider value={value}>
                    <Sider collapsible collapsed={Collapesd} onCollapse={onCollapse}>
                        <div className="logo" >
                            <img src={Collapesd ? logo_small : logo_large} alt="logo"
                                style={{
                                    width: '100%',
                                    maxHeight: '70px',
                                    padding: 10
                                }}
                            />
                        </div>

                        <NavbarMenu />

                    </Sider>
                    {
                        listDisplay && <div className="LeftSideListMenu" style={{ left: ListPosition, minWidth: "420px", maxHeight: "100vh", overflowY: "auto" }}><TableList /></div>
                    }
                    {
                        detailDisplay && <div className="LeftSideListMenu" style={{ left: ListPosition, minWidth: "420px", maxWidth: "420px", maxHeight: "100vh", overflowY: 'auto' }}><TableDetail /></div>
                    }
                </MenuTypeContext.Provider>
                <Layout className="site-layout">
                    <Site />
                    {/* <FooterComponent/> */}
                    <UtilBox />
                </Layout>
            </Layout>

        </>
    )
}

export default MainComponent
