import React from 'react'
import PostCard from "./PostCard"
import "./PostList.css"

const posts = [{},{},{}]

const PostList = () => {
    return (
        <ul className='postlist'>
            {posts.map((post,index) => <PostCard />)}
        </ul>
    )
}

export default PostList
