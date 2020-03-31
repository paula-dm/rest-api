import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText } from '@material-ui/core';
import mapObjectsToArray from './mapObjectToArray';
import moment from 'moment';
import { render } from '@testing-library/react';

const API_URL = 'https://isa-dm.firebaseio.com/messages/.json';

const Chat = (props) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        const newMessageObject = {
            text: newMessage,
            timestamp: moment().calendar()
        }
        return fetch(
            API_URL,
            {
                method: 'POST',
                body: JSON.stringify(newMessageObject)
            }
        )
        
    }
    const getMessages = () => {

        return fetch(API_URL)
            .then((r) => r.json())
            .then((messagesObject) => {
                const messagesArray = mapObjectsToArray(messagesObject)

                setMessages(messagesArray)
            })
    }

    useEffect(() => {
        getMessages()

    }, [])

    
    return (

        <div>
            <List>
                {
                    messages && messages.map((message) => {
                        return (<ListItem key={message.key}>
                            <ListItemText primary={message.text}
                                secondary={message.timestamp} />
                        </ListItem>
                        )
                    })
                }
            </List>
            <TextField
                fullWidth={true}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}

            />
            <Button
                fullWidth={true}
                onClick={sendMessage}
            >
                SEND MESSAGE
        </Button>
        </div>
    )
}
export default Chat;
