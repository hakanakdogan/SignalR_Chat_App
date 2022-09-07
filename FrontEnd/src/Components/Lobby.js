
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

export const Lobby = ({joinRoom}) => {
    const [user, setUser] = useState();
    const [room, setRoom] = useState();
  return (
    <Form className='lobby' onSubmit={e=>{
        e.preventDefault();
        joinRoom(user, room);
    }}>
        <Form.Group>
            <Form.Control className='mb-1' placeholder='name' onChange={(e)=>setUser(e.target.value)} />
            <Form.Control placeholder='room' onChange={(e)=> setRoom(e.target.value)} />
        </Form.Group>
        <Button className='mt-4' variant='success' type='submit' onClick={()=>{}} disabled={!user || !room} >Join</Button>
    </Form>
  )
}
