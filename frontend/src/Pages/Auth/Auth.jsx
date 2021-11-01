import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { ButtonMain, ButtonMinor } from '../../Components/Button/ButtonStyle'
import { AuthWrapper } from './AuthStyle'
import { useTheme } from "@mui/material/styles";
import { useHistory } from 'react-router';
import axios from 'axios'

export default function Auth() {
    const history = useHistory()
    const theme = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [code, setCode] = useState('')
    const [username, setUsername] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [pageState, setPageState] = useState('login')

    // test email: ise96655@zwoho.com 67020

    const submitLogin = async () => {
        const { data } = await axios.post(
            `https://djpp.propulsion-learn.ch/backend/api/auth/token/`,
            {
                email,
                password,
            })
        localStorage.setItem('token', data.access)
        history.push(`/`)
    }
    const submitRegister1 = async (e) => {
        e.preventDefault()
        await axios.post(
            `https://djpp.propulsion-learn.ch/backend/api/registration/`,
            {email: email}
            )
        setPageState('register2')
        }
    const submitRegister3 = async (e) => {
        e.preventDefault()
        await axios.post(
            `https://djpp.propulsion-learn.ch/backend/api/registration/validate/`,
            {
                email,
                code,
                username,
                first_name: first,
                last_name: last,
                password,
                password_repeat: password2,
            })
        setCode('')
        setPassword('')
        setPassword2('')
        setEmail('')
        setPageState('login')
    }

    const pageType = () => {
        if (pageState === 'register1') { return (
                <form className='register1Wrapper' onSubmit={(e) => submitRegister1(e)}>
                    <div className='titleWrapper'>
                        <h4>Register</h4>
                    </div>
                    <div className='inputWrapper'>
                        <TextField required id="outlined-required" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='buttonWrapper'>
                        <ButtonMain sx={{boxShadow:5,border:2,borderColor:'primary.dark'}} onClick={(e) => submitRegister1(e)}>register</ButtonMain>
                        <ButtonMinor sx={{boxShadow:5,border:2,borderColor:'primary.dark'}} onClick={() => setPageState('login')}>login</ButtonMinor>
                    </div>
                </form>
            )}
            else if (pageState === 'register2') { return (
                <form className='register2Wrapper' onSubmit={() => setPageState('register3')}>
                    <div className='titleWrapper'>
                        <h4>Register</h4>
                    </div>
                    <div className='inputWrapper'>
                        <p>Thank you for registering! <br />
                        We have sent you an E-mail with your registration code, <br /> please enter this code
                        on the next page to complete the registration process.</p>
                    </div>
                    <div className='buttonWrapper'>
                        <ButtonMain sx={{boxShadow:5,border:2,borderColor:'primary.dark'}} onClick={() => setPageState('register3')}>continue</ButtonMain>
                    </div>
                </form>

            )}
        else if (pageState === 'register3') { return (
                <form className='register3Wrapper' onSubmit={(e) => submitRegister3(e)}>
                    <div className='titleWrapper'>
                        <h4>Register</h4>
                    </div>
                    <div className='inputWrapper2'>
                        <TextField required id="outlined-required" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField required id="outlined-required" label="Validation Code" value={code} onChange={(e) => setCode(e.target.value)} />
                        <TextField required id="outlined-required" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <TextField required id="outlined-required" label="First Name" value={first} onChange={(e) => setFirst(e.target.value)}/>
                        <TextField required id="outlined-required" label="Last Name" value={last} onChange={(e) => setLast(e.target.value)} />
                        <TextField required id="outlined-required" label="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField required id="outlined-required" label="Password repeat" type='password' value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                    </div>
                    <div className='buttonWrapper'>
                        <ButtonMain sx={{boxShadow:5,border:2,borderColor:'primary.dark'}} onClick={(e) => submitRegister3(e)}>finish</ButtonMain>
                    </div>
                </form>
            )}
        else if (pageState === 'forgot') { return (
                <form className='register3Wrapper' onSubmit={(e) => submitRegister3(e)}>
                    <div className='titleWrapper'>
                        <h4>Register</h4>
                    </div>
                    <div className='inputWrapper2'>
                        <span>Please enter your E-mail, and we will send you a recovery code!</span>
                        <TextField required id="outlined-required" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='buttonWrapper'>
                        <ButtonMain sx={{boxShadow:5,border:2,borderColor:'primary.dark'}} onClick={(e) => submitRegister3(e)}>send email</ButtonMain>
                    </div>
                </form>
            )}
        else { return (
                <form className='loginWrapper' onSubmit={submitLogin}>
                    <div className='titleWrapper'>
                        <h4>Login</h4>
                    </div>
                    <div className='inputWrapper'>
                        <TextField required id="outlined-required" label="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField required id="outlined-required" label="Password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className='buttonWrapper'>
                        <ButtonMain sx={{boxShadow:5,border:2,borderColor:'primary.dark'}} onClick={submitLogin} >login</ButtonMain>
                        <ButtonMinor sx={{boxShadow:5,border:2,borderColor:'primary.main'}} onClick={() => setPageState('register1')}>sign up</ButtonMinor>
                    </div>
                </form>
            )}
    }

    return (
        <AuthWrapper theme={theme}>
            {pageType()}
        </AuthWrapper>
    )
}
