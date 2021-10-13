import { Helmet } from 'react-helmet';
import { useState } from 'react';
import Chats from 'src/components/modal/Chat_Container';

const Chat = () => {
	const [m] = useState();

	return (
		<>
			<Helmet>
				<title>Chat</title>
			</Helmet>
			{m}
			<Chats />
		</>
	);
};

export default Chat;
