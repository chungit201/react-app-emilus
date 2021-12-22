import React, { useState } from 'react'
import { Empty,Card, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const PostPage = ({ post }) => {
  console.log(post);
  return (
    <div>
      {post? (
        <Card>
          <div className="profile">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
            <div className="profile-title">
            <span style={{fontWeight: 'bold'}}>{post.user.name}</span>
            <p>9 giờ</p>
            </div>
          </div><br />
          <div className="title">{post.title}</div>
          <div className="img-post">
            <img style={{ width: '100%', margin: 'auto' }} src={post.img}></img>
          </div>
        </Card>
      ) : (
        <Empty />
      )}

    </div>
  )
}

export default PostPage
