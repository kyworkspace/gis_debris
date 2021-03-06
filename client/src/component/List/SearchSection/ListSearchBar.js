import Search from 'antd/lib/input/Search';
import React, { useContext, useState } from 'react'
import { MenuTypeContext } from '../../main/MainComponent';

function ListSearchBar(props) {
    const {searchKeyword} = useContext(MenuTypeContext);
    const [SearchTerm, setSearchTerm] = useState(searchKeyword)
    const onSearchHandler =(e)=>{
        setSearchTerm(e.currentTarget.value)
        props.onInputChange(e.currentTarget.value)
    }
    const onSearchButtonHandler=()=>{
        if(props.searchButtonHandler){
            props.searchButtonHandler();
        }
    }
    return (
        <div
                style={{ display: 'flex', justifyContent: 'center', margin: '1rem auto'}}
            >
                <Search
                    placeholder={props.placeholder ? props.placeholder : "검색어를 입력해주세요"}
                    style={{ width: 300 }}
                    enterButton
                    value={SearchTerm}
                    onChange={onSearchHandler}
                    onSearch={onSearchButtonHandler}
                />
            </div>
    )
}

export default ListSearchBar;