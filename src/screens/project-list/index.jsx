import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState, useEffect } from "react"


export const ProjectListScreen = () => {
    const [list, setList] = useState([])
    const [param, setParam] = useState({
        name: '',
        personid: ''
    })
    useEffect(() => {
        fetch('').then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [param])
    return <div>
        <SearchPanel param={param} setParam={setParam}></SearchPanel>
        <List list={list}></List>
    </div>
}