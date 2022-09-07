import React, { useState } from "react";
import { FormControl } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SendMessageForm = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message);
        setMessage("");
      }}
    >
      <InputGroup>
        <FormControl
          placeholder="message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

          <Button className="sendButton" variant="primary" type="submit" disabled={!message}>
            Send
          </Button>
        
      </InputGroup>
      
    </Form>
  );
};

export default SendMessageForm;
