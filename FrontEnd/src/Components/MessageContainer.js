import React, {useEffect, useRef} from 'react'

const MessageContainer = ({messages, currentUser}) => {
    const messageRef = useRef();
    console.log(currentUser);
    useEffect(()=>{
        if(messageRef && messageRef.current){
            const  {scrollHeight, clientHeight} = messageRef.current;
            messageRef.current.scrollTo({left:0, top:scrollHeight-clientHeight, behavior:'smooth'});
        }
    }, [messages])
    
  return (
    <div ref={messageRef} className='message-container'>
        {
            messages.map((m, index)=>(
                currentUser === m.user ? (
                    <div key={index} className='user-message-self'>
                        <div className='message bg-primary'>{m.message}</div>
                        <div className='from-user'>{m.user}</div>
                    </div>
                ) : m.user === "ChatBot" ? (
                    <div key={index} >
                        <div className='message-bot bg-secondary'>{m.message}</div>
                        {/* <div className='from-user'>{m.user}</div> */}
                    </div>
                ) : (
                    <div key={index} className='user-message'>
                        <div className='message bg-secondary'>{m.message}</div>
                        <div className='from-user'>{m.user}</div>
                    </div>
                )
                

            ))
        }
    </div>
  )
}

export default MessageContainer