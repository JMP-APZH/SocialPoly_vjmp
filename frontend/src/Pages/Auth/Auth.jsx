import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { ButtonMain } from '../../Components/Button/ButtonStyle'
import { AuthWrapper } from './AuthStyle'
import {useHistory} from 'react-router'

export default function Auth() {
    const history = useHistory()
    const [pageState, setPageState] = useState('login')

    const pageType = () => {
        if (pageState === 'register1') {
            return (
                <div className='register1Wrapper'>
                    <TextField
                        required
                        id="outlined-required"
                        label="E-mail"
                    />
                    <ButtonMain>login</ButtonMain>
                </div>
            )}
        else if (pageState === 'register2') {
            return (
                null

            )}
        else if (pageState === 'register3') {
            return (
                null
            )}
        else {
            return (
                <div className='loginDiv'>
                    <TextField
                        required
                        id="outlined-required"
                        label="E-mail"
                    />
                    <TextField
                        required
                        id="outlined-required"
                        label="Password"
                        type='password'
                    />
                    <ButtonMain>login</ButtonMain>
                    <ButtonMain>sign up</ButtonMain>
                </div>
            )}
    }

    return (
        <AuthWrapper>
            {pageType()}
        </AuthWrapper>
    )
}
