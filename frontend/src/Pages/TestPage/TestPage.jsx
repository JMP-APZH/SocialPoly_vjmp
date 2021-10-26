import React from 'react'
import { ButtonMain, ButtonMinor } from '../../Components/Button/ButtonStyle'
import PostCreation from '../../Components/PostCreation/PostCreation'
import Searchbar from '../../Components/Searchbar/Searchbar'

export default function TestPage() {
    return (
        <div>
            
            <ButtonMain>test</ButtonMain>
            <ButtonMain backgroundColor='crimson' fontSize='16px' fontColor='black' fontWeight='400' >test with props</ButtonMain>
            <ButtonMinor>minor</ButtonMinor>

            <Searchbar w='400px' h='40px' />
            <br />
            <PostCreation />
        </div>
    )
}
