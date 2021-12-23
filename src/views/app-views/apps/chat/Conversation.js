import React from 'react'
import ChatData from "assets/data/chat.data.json"
import { Avatar, Divider, Input, Form, Button, Menu, notification } from 'antd';
import {
  FileOutlined,
  SendOutlined,
  PaperClipOutlined,
  SmileOutlined,
  AudioMutedOutlined,
  UserOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Scrollbars } from 'react-custom-scrollbars';
import Flex from 'components/shared-components/Flex';
import EllipsisDropdown from 'components/shared-components/EllipsisDropdown'
import { useEffect, useState } from 'react';
import { getMessageUser, addMessage } from 'api/messageApi';
import { useParams } from 'react-router-dom';
import { getDialog } from 'api/dialogApi';
import io from 'socket.io-client';
import {sendToOne} from "../../../../api/push-notificationApi";
const menu = () => (
  <Menu>
    <Menu.Item key="0">
      <UserOutlined />
      <span>User Info</span>
    </Menu.Item>
    <Menu.Item key="1">
      <AudioMutedOutlined />
      <span>Mute Chat</span>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">
      <DeleteOutlined />
      <span>Delete Chat</span>
    </Menu.Item>
  </Menu>
);

const Conversation = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user.id;
  const chatBodyRef = React.createRef();
  const [message, setMessage] = useState(null);
  const [friend, setFriend] = useState();
  const { id } = useParams();

  const token = JSON.parse(sessionStorage.getItem('access_token'));
  const [socket, setSocket] = useState();
  useEffect(() => {
    const newSocket = io.connect('https://server-my-app-0012.herokuapp.com', {
      auth: { token: token },
      transports: ['websocket'],
    });
    setSocket(newSocket);
  }, [setSocket]);

  useEffect(() => {
    dialofMsg();
    getReciver()
  }, []);

  useEffect(() => {
    if (socket != null) {
      socket.on('/root/send-message', data => {
        console.log(data);
        if (message) {
          console.log("1")
          const newMessage = [...message, data]
          console.log("new", newMessage)
          setMessage(newMessage)
        } 
      });
    }
  }, [socket, message]);
  console.log('mess', message);
  const dialofMsg = async () => {
    const { data } = await getMessageUser(id);
    const { results } = data;
    setMessage(results)
  }
  const getReciver = async () => {
    const { data } = await getDialog(id);
    console.log(data);
    setFriend(data)
  }

  const onSend = async (values) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const sender = user.id;

    const msgValue = {
      dialogId: id,
      receiver: friend.friend == user.id ? friend.user : friend.friend,
      sender: sender,
      text: values.text,
      msgType: "text"
    }
      setMessage([...message,msgValue]);

      const notification = {
        "title": "Emilus",
        "body": `Có tin nhắn mới ok ok`,
        "click_action": "http://localhost:3000/app/apps/chat",
        "icon": "https://mpng.subpng.com/20191101/szv/transparent-facebook-icon-media-icon-messages-icon-5dbbf5e7d2ae69.969549601572599271863.jpg",
        "to":"dukPerhynYlgKdtwr3dyxf:APA91bE9wNopQIBAAbKksnGWXcJx3HxQV47ezvmfqh4NnyxGrroC-7weyduAD0n6eq1xAFMBPnEHUU6U2nt2AHDGkT8b8qNcw9glETSdu-OeZHAHcoxYj7r8ezMYTyYPt4K2m9WGkni4"
      }
      await sendToOne(notification);
    socket.emit("/client/new_message", msgValue);
  };

  const chatContentHeader = (name) => (
    <div className="chat-content-header">
      <h4 className="mb-0">{name}</h4>
      <div>
        <EllipsisDropdown menu={menu} />
      </div>
    </div>
  )
  const getMsgType = obj => {
    switch (obj.msgType) {
      case 'text':
        return <span>{obj.text}</span>
      case 'image':
        return <img src={obj.text} alt={obj.text} />
      case 'file':
        return (
          <Flex alignItems="center" className="msg-file">
            <FileOutlined className="font-size-md" />
            <span className="ml-2 font-weight-semibold text-link pointer">
              <u>{obj.text}</u>
            </span>
          </Flex>
        )
      default:
        return null;
    }
  }
  const chatContentBody = () => (

    <div className="chat-content-body">
      <Scrollbars>
        <Scrollbars ref={chatBodyRef} autoHide>
          {message && (message.map((elm, i) => (
            <div
              key={`msg-${id}-${i}`}
              className={`msg ${elm.msgType === 'date' ? 'datetime' : ''} ${elm.sender.id != userId && elm.sender !=userId ? 'msg-recipient' : 'msg-sent'}`}
            >
              {
                elm.avatar ?
                  <div className="mr-2">
                    <Avatar src={elm.avatar} />
                  </div>
                  :
                  null
              }
              {
                elm.text ?
                  <div className={`bubble ${!elm.avatar ? 'ml-5' : ''}`}>
                    <div className="bubble-wrapper">
                      {getMsgType(elm)}
                    </div>
                  </div>
                  :
                  null
              }
              {
                elm.msgType === 'date' ?
                  <Divider>{elm.time}</Divider>
                  :
                  null
              }
            </div>
          )))
          }
        </Scrollbars>
      </Scrollbars>
    </div>
  )
  const chatContentFooter = () => (
    <div className="chat-content-footer">
      <Form name="msgInput" onFinish={onSend} className="w-100">
        <Form.Item name="text" className="mb-0">
          <Input
            autoComplete="off"
            placeholder="Type a message..."
            suffix={
              <div className="d-flex align-items-center">
                <a href="/#" className="text-dark font-size-lg mr-3">
                  <SmileOutlined />
                </a>
                <a href="/#" className="text-dark font-size-lg mr-3">
                  <PaperClipOutlined />
                </a>
                <Button shape="circle" type="primary" size="small"  htmlType="submit">
                  <SendOutlined />
                </Button>
              </div>
            }
          />
        </Form.Item>
      </Form>
    </div>
  )

  return (
    <div className="chat-content">
      {chatContentHeader()}
      {chatContentBody()}
      {chatContentFooter()}
    </div>
  )

}

export default Conversation
