import React, {useEffect} from 'react'
import {Empty, Avatar, Input, Modal, Button} from 'antd';
import {UserOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {useState} from 'react';
import {storage} from '../../../../../firebase';
import {addMStatus} from 'api/statusApi';

const {TextArea} = Input;

const UpLoadStatus = () => {
  const [visible, setVisible] = useState(false);
  const [statusText, setStatusText] = useState();
  const [imgView, setImgView] = useState();
  const [file, setFile] = useState();

  const onChange = (event) => {
    setFile(event.target.files[0]);
    setImgView(URL.createObjectURL(event.target.files[0]));
  }
  const resetFile = (event) => {
    event.preventDefault();
    setImgView(null);
  }
  const onhandleSubmit = () => {
    console.log(file.name);
    const ref = storage.ref(`images/${file.name}`);
    const {id} = JSON.parse(localStorage.getItem('user'))
    const upload = ref.put(file);
    upload.on(
      "state_changed",
      snapshot => {
      },
      error => {
        console.log(error);
      }, () => {
        storage.ref('images')
          .child(file.name)
          .getDownloadURL()
          .then(async (url) => {
            const status = {
              user: id,
              title: statusText,
              img: url
            }
            const {data} = await addMStatus(status);
            if (data) {
              setVisible(false)
            }
          })
      }
    )
  }
  return (
    <div>
      <div className="upload-status">
        <div className="upload-post">
          <Avatar size="large" icon={<UserOutlined/>}/>
          <Input onClick={() => setVisible(true)} placeholder="Bạn đang nghĩ gì thế?"/>
        </div>
      </div>
      <div>
        <Modal
          title="Tạo bài viết"
          centered
          visible={visible}
          onOk={onhandleSubmit}
          onCancel={() => setVisible(false)}
          width={1000}
        >
          <div>
            <TextArea style={{outlineColor: 'none'}} placeholder="Bạn đang nghĩ gì thế" autoSize
                      onChange={e => {
                        setStatusText(e.target.value);
                      }}
            />
            <div style={{margin: '24px 0'}}/>
          </div>
          <div className="App" style={{textAlign: 'center'}}>
            {imgView && (
              <div style={{textAlign: "center"}}>
                <img style={{height: "300px", margin: "auto", position: "relative"}} src={imgView}/>
                <CloseCircleOutlined onClick={resetFile} style={{fontSize: '24px', position: 'absolute'}}/>
              </div>
            )}
            <input type="file" onChange={onChange} multiple/>
          </div>
        </Modal>
      </div>

      <div>
      </div>
      <div className="no-data">
      </div>
    </div>
  )
}

export default UpLoadStatus
