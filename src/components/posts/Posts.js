import React, { useEffect, useState } from 'react'
import posts_data from '../../data/posts'
import PostList from './PostList';

const Posts = () => {
    const [posts, setPosts] = useState(null);

    function getPosts() {
        setPosts(posts_data);
    }

    useEffect(() => {
        getPosts();
    }, [])

    if(!posts) return <h1>Loading...</h1>

    return (
        <div className="postlist-container">
            <PostList posts={posts} />
        </div>
    )
}

export default Posts
