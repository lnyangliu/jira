import React from "react"
import { SearchPanel } from "./search-panel"
import { List } from "./list"
import { useState, useEffect } from "react"
import {cleanObject} from "../../utils"
import * as qs from "qs"

// const apiUrl = 'http://localhost:3001'
const apiUrl = process.env.REACT_APP_API_URL
export const ProjectListScreen = () => {
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])
    const [param, setParam] = useState({
        name: '',
        personId: ''
    })
    const debounceParam = useDebounce(param, 2000)
    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debounceParam])
    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })
    return <div>
        <SearchPanel users={users || []} param={param} setParam={setParam}></SearchPanel>
        <List users={users} list={list}></List>
    </div>
}

export const useMount = (callback) => {
    useEffect(() => {
    callback()
    }, [])
}

export const useDebounce = (value, delay) => {
    const [debouncedValue, setdebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setdebouncedValue(value), delay)
        // 每次在上一次useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debouncedValue;
}