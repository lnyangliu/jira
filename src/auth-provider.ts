import {User} from 'screens/project-list/search-panel'

const localStorageKey = '__auth_provider_token__'

const apiUrl = process.env.REACT_APP_API_URL

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({user}: {user: User}) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user;
}

export const login = async (data: {username: string, password: string}) => {
    const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        return handleUserResponse(await response.json())
    } else {
        return Promise.reject(data)
    }
}
export const register = async (data: {username: string, password: string}) => {
    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            "content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        return handleUserResponse(await response.json())
    } else {
        return Promise.reject(data)
    }
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)