import React, { useState, useEffect } from 'react';
import { TextField, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { Delete } from '@material-ui/icons'

import mapObjectsToArray from './mapObjectToArray';


import moment from 'moment';
import { fetchWithToken, logOut } from './firebaseAuth';

const API_URL = 'https://isa-dm.firebaseio.com/messages/';
const REFRESH_INTERVAL = 1000;

const Chat = (props) => {
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);


    const deleteMessage = (messageKey) => {
        return fetchWithToken(
            API_URL + messageKey + '.json',
            {
                method: 'DELETE',
            }
        )
            .then(() => {
                return getMessages()
            })
    }

    const sendMessage = () => {
        const newMessageObject = {
            text: newMessage,
            timestamp: Date.now(),
            uuid: localStorage.getItem('localId'),
            email: localStorage.getItem('email'),
        }

        return fetchWithToken(
            API_URL + '.json',
            {
                method: 'POST',
                body: JSON.stringify(newMessageObject)
            }
        )
            .then(() => {
                setNewMessage('')

                return getMessages()
            })
    }
    const getMessages = () => {
        setError(false)

        return fetchWithToken(API_URL + '.json')
            .then((r) => r.json())
            .then((messagesObject) => {
                const messagesArray = mapObjectsToArray(messagesObject)

                setMessages(messagesArray)

            })
            .catch(() => {
                setError(true)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    useEffect(() => {
        getMessages()

        const id = setInterval(
            () => {
                getMessages()
            },
            REFRESH_INTERVAL
        )

        return () => {
            clearInterval(id)
        }
    }, [])



    return (
        isError ? <ErrorIcon />
            : isLoading ?
                <AutorenewIcon />
                :

                <div>
                    <List>
                        {
                            messages && messages.map((message) => {
                                return (
                                <ListItem key={message.key}>
                                    <ListItemText primary={message.text}
                                        secondary={
                                            <>
                                                {message.email}
                                                <br />

                                                {moment(message.timestamp).format('YYYY-MM-DD HH:mm:ss')}

                                            </>}
                                    />
                                    {
                                        localStorage.getItem('localId') !== message.uuid ?
                                            null
                                            :
                                            <ListItemSecondaryAction>
                                                <IconButton
                                                    onClick={() => deleteMessage(message.key)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                    }
                                </ListItem>
                                )
                            })
                        }
                    </List>
                    <TextField
                        label={'Type new message'}
                        fullWidth={true}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}

                    />
                    <br />
                    <br />
                    <Button
                        fullWidth={true}
                        onClick={sendMessage}
                        variant={'contained'}
                        color={'primary'}
                    >
                        SEND MESSAGE
                    </Button>
                    <Button
                        fullWidth={true}
                        onClick={logOut}
                    >
                        LOG OUT
                     </Button>
                </div>
    )
}
export default Chat;
