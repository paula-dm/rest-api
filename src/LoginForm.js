import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';

const LoginForm = ({onLogInClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div>
            <TextField
                label={'E-mail'}
                fullWidth={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}

            />
            <TextField
                label={'Password'}
                fullWidth={true}
                value={password}
                type={'password'}
                onChange={(e) => setPassword(e.target.value)}

            />
            <Button
                fullWidth={true}
                onClick={() => onLogInClick(email, password)}
                variant={'contained'}
                color={'primary'}
                >
                    LOG IN
        </Button>
    
        </div>
    )
}
export default LoginForm;