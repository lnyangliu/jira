import {useEffect, useState} from 'react'
// import {Project} from 'screens/project-list/list'


export const isFalsy = (value: any): boolean=> value === 0 ? false : !value;

// 不改变函数本身
export const cleanObject = (object: object) => {
    const result = {...object}
    Object.keys(result).forEach((key) => {
        const value = result[key]
        if(isFalsy(value)) {
            delete result[key]
        }
    })
    return result;
}

export const useMount = (callback: () => void) => {
    useEffect(() => {
    callback()
    }, [])
}

export const useDebounce = (value: any, delay?: number) => {
    const [debouncedValue, setdebouncedValue] = useState(value)

    useEffect(() => {
        const timeout = setTimeout(() => setdebouncedValue(value), delay)
        // 每次在上一次useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])
    return debouncedValue;
}