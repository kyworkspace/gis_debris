import Search from 'antd/lib/input/Search';
import React, { useState } from 'react'

function ListSearchBar(props) {
    const [SearchTerm, setSearchTerm] = useState("")
    const onSearchHandler =(e)=>{
        setSearchTerm(e.currentTarget.value)
        props.onInputChange(e.currentTarget.value)
    }
    const onSearchButtonHandler=()=>{
        //props.searchButtonHandler();
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