import React from 'react'
import PostCard from "./PostCard"
import "./PostList.css"

const posts = [{},{},{},{},{},{}]

const PostList = () => {
    return (
        <ul className='postlist'>
            {posts.map((post,index) => <PostCard key={index} id={index} />)}
        </ul>
    )
}

export default PostList
