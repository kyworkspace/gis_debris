import Search from 'antd/lib/input/Search';
import React, { useState } from 'react'

function ListSearchBar(props) {
    const [SearchTerm, setSearchTerm] = useState("")
    const onSearchHandler =(e)=>{
        setSearchTerm(e.currentTarget.value)
        props.onInputChange(e.currentTarget.value)
    }
    return (
        <div
                style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto', marginRight: 20 }}
            >
                <Search
                    placeholder={props.placeholder ? props.placeholder : "검색어를 입력해주세요"}
                    style={{ width: 300 }}
                    enterButton
                    value={SearchTerm}
                    onChange={onSearchHandler}
                />
            </div>
    )
}

export default ListSearchBar;