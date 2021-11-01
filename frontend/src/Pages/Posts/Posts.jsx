import React from 'react'
import PostCreation from '../../Components/PostCreation/PostCreation'
import { PostsPageWrapper } from './PostStyles'

export default function Posts() {
    return (
        <PostsPageWrapper >
            <PostCreation />
        </PostsPageWrapper>
    )
}
