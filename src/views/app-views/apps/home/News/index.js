import React from "react";
import Carousel from "react-elastic-carousel";
import Item from "./item";
import {Avatar} from 'antd';

const breakPoints = [
  {width: 100, itemsToShow: 1},
  {width: 100, itemsToShow: 2},
  {width: 100, itemsToShow: 3},
  {width: 100, itemsToShow: 4},
];

const News = () => {
  return (
    <>
      <Carousel showEmptySlots={false} breakPoints={breakPoints}>
        <Item>
          <img src="https://hanoispiritofplace.com/wp-content/uploads/2015/12/anh-dong-3d-dep-1.gif" className="img-new"/>
          <Avatar className="avatar-news" src="https://joeschmoe.io/api/v1/random"/>
        </Item>
        <Item>
          <img src="https://i.pinimg.com/originals/db/fe/85/dbfe859320e6583cb6907f4e0c0662c5.gif" className="img-new"/>
          <Avatar className="avatar-news" src="https://joeschmoe.io/api/v1/random"/>
        </Item>
        <Item>
          <img src="https://upanh123.com/wp-content/uploads/2021/01/anh-nen-dong10.gif" className="img-new"/>
          <Avatar className="avatar-news" src="https://joeschmoe.io/api/v1/random"/>
        </Item>
        <Item>
          <img src="https://r1.ilikewallpaper.net/iphone-wallpapers/download-113118/cherry-blossoms.jpg" className="img-new"/>
          <Avatar className="avatar-news" src="https://joeschmoe.io/api/v1/random"/>
        </Item>

      </Carousel>
    </>
  )
}

export default News