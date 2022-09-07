import React from 'react'

const ConnectedUsers = ({users}) => {
  return (
    <div className='user-list'>
        <h4>Connected Users</h4>
        {users.map((user,index)=>(
            <h6 key={index}> {user} </h6>
        ))}
    </div>
  )
}

export default ConnectedUsers