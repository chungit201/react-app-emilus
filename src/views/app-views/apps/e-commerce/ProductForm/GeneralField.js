import React, {useEffect, useState} from 'react'
import {Input, Row, Col, Card, Form, Upload, InputNumber, message, Select} from 'antd';
import ImgCrop from 'antd-img-crop';
import {getAll} from "../../../../../api/categoriesApi";

const {Option} = Select;
const rules = {
  name: [
    {
      required: true,
      message: 'Please enter product name',
    }
  ],
  description: [
    {
      required: true,
      message: 'Please enter product description',
    }
  ],
  price: [
    {
      required: true,
      message: 'Please enter product price',
    }
  ],
  comparePrice: [],
  taxRate: [
    {
      required: true,
      message: 'Please enter tax rate',
    }
  ],
  cost: [
    {
      required: true,
      message: 'Please enter item cost',
    }
  ]
}

const GeneralField = props => {
  const [category, setCategory] = useState();
  useEffect(() => {
    getCategory();
  }, [])
  const getCategory = async () => {
    const {data} = await getAll();
    setCategory(data.results);
    console.log(category)
  }
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const onChange = ({fileList: newFileList}) => {
    setFileList(newFileList);
  };

  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  return (
    <Row gutter={16}>
      <Col xs={24} sm={24} md={17}>
        <Card title="Basic Info">
          <Form.Item name="name" label="Product name" rules={rules.name}>
            <Input placeholder="Product Name"/>
          </Form.Item>
          <Form.Item name="description" label="Description" rules={rules.description}>
            <Input.TextArea rows={4}/>
          </Form.Item>
        </Card>
        <Card title="Pricing">
          <Row gutter={16}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="price" label="Price" rules={rules.price}>
                <InputNumber
                  className="w-100"
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item name="quantity" label="Quantity" rules={rules.comparePrice}>
                <InputNumber
                  className="w-100"
                  value={0}
                  formatter={value => `\
								${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={7}>
        <Card title="Media">

          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"

            onChange={onChange}
            onPreview={onPreview}
          >
            {fileList.length < 5 && '+ Upload'}
          </Upload>
        </Card>
        <Card title="Organization">
          <Form.Item name="categories" label="Category">
            <Select className="w-100" placeholder="Category">
              {
                category && (category.map(elm => (
                  <Option key={elm.name} value={elm.id}>{elm.name}</Option>
                )))
              }
            </Select>
          </Form.Item>
        </Card>
      </Col>
    </Row>
  )
}


export default GeneralField
