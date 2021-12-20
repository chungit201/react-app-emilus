import React, { useEffect, useState } from 'react'
import ChatData from "assets/data/chat.data.json"
import { Badge, Input } from 'antd';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import { COLOR_1 } from 'constants/ChartConstant';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { getDialogs } from 'api/dialogApi';


const ChatMenu = ({ match, location }) => {
	const user = JSON.parse(localStorage.getItem('user'));
	const userId = user.id
	const [list, setList] = useState([]);
	const [newUser, setnewUser] = useState([]);
	useEffect(() => {
		getDialog();
	}, []);
	const getDialog = async () => {
		const { id } = JSON.parse(localStorage.getItem('user'));
		const { data } = await getDialogs(id);
		console.log(data);
		setList(data.results)
	}
	let history = useHistory();
	const openChat = id => {
		const data = list.map(elm => {
			if (elm.id === id) {
				elm.unread = 0
			}
			return elm
		})
		setList(data)
		history.push(`${match.url}/${id}`)
	}

	const searchOnChange = e => {
		const query = e.target.value;
		const data = ChatData.filter(item => {
			return query === '' ? item : item.name.toLowerCase().includes(query)
		})
		setList(data)
	}
	console.log(list);
	const id = parseInt(location.pathname.match(/\/([^/]+)\/?$/)[1])

	return (
		<div className="chat-menu">
			<div className="chat-menu-toolbar">
				<Input
					placeholder="Search"
					onChange={searchOnChange}
					prefix={
						<SearchOutlined className="font-size-lg mr-2" />
					}
				/>
			</div>
			<div className="chat-menu-list">
				{list && (list.map((item, i) => (
					<div
						key={`chat-item-${item.id}`}
						onClick={() => openChat(item.id)}
						className={`chat-menu-list-item  ${item.id === id ? 'selected' : ''}`}
					>
						<AvatarStatus src={item.avatar} name={item.friend.name} /> {/* subTitle={item.msg[item.msg.length - 1].text} */}
						<div className="text-right">
							<div className="chat-menu-list-item-time">{item.time}</div>
							{item.unread === 0 ? <span></span> : <Badge count={item.unread} style={{ backgroundColor: COLOR_1 }} />}
						</div>
					</div>
				)))
				}
			</div>
		</div>
	)
}

export default ChatMenu
