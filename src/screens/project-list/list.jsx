import React from "react"

export const List = ({list,users}) => {
    return <table>
        <thead>
            <tr>
                <th>名称</th>
                <th>负责人</th>
            </tr>
        </thead>
        <tbody>
            {
                list.map(project => {
                    return <tr key={project.id}>
                        <td>{project.name}</td>
                        <td>{users.find(users => users.id === project.personId)?.name || '--'}</td>
                    </tr>
                })
            }
        </tbody>
    </table>
}