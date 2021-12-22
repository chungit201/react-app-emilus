import React from 'react'
import PostPage from './posts'
import UpLoadStatus from './upload-status'
import {useEffect, useState} from 'react';
import {getPosts} from 'api/postApi';
import News from "./News";

const HomePage = () => {
  const [posts, setPost] = useState();
  useEffect(() => {
    getAllPost();
  }, []);
  const getAllPost = async () => {
    const {data} = await getPosts();
    const {results} = data;
    console.log(results);
    setPost(results.reverse());
  }
  return (
    <div className="home-page">
      <div className="ant-row">
        <div className="ant-col ant-col-xs-24 ant-col-sm-24 ant-col-md-24 ant-col-lg-16 ant-col-xl-12 mg-auto">
          <News></News>
          <div className="status">
            <UpLoadStatus></UpLoadStatus>
          </div>
          <div className="list-post">
            {posts && (posts.map(item => {
              console.log(item);
              return (
                <PostPage post={item}></PostPage>
              )
            }))}
          </div>
        </div>
      </div>
    </div>

  )
}

export default HomePage
