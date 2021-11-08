import axios from 'axios';

const api = 'https://se-disk.herokuapp.com/api';

const getRequest = async (path, params = {}) => {
	try {
		const token = sessionStorage.getItem('user_token');
		const response = await axios.get(api + path, {
			headers: {
				authorization: `Bearer ${token}`,
				Accept: '*/*'
			},
			params
		});
		return response;
	} catch (e) {
		console.log(e);
		return [];
	}
};

const postFormReqest = async (path, body) => {
	try {
		const token = sessionStorage.getItem('user_token');
		const { data } = await axios.post(api + path, body, {
			headers: {
				authorization: `Bearer ${token}`,
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data'
			}
		});
		return data;
	} catch (e) {
		console.log(e);
	}
};

const postJsonReqest = async (path, body) => {
	try {
		const token = sessionStorage.getItem('user_token');
		if (token) {
			const { data } = await axios.post(api + path, body, {
				headers: {
					authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			return data;
		} else {
			const { data } = await axios.post(api + path, body, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return data;
		}
	} catch (e) {
		console.log(e);
	}
};

const putJsonReqest = async (path, body) => {
	try {
		const token = sessionStorage.getItem('token');
		if (token) {
			const { data } = await axios.put(api + path, body, {
				headers: {
					authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			return data;
		} else {
			const { data } = await axios.put(api + path, body, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return data;
		}
	} catch (e) {
		console.log(e);
	}
};

const deleteJsonReqest = async (path) => {
	try {
		const token = sessionStorage.getItem('token');
		if (token) {
			const { data } = await axios.delete(api + path, {
				headers: {
					authorization: `Bearer ${token}`,
					'Content-Type': 'application/json'
				}
			});
			return data;
		} else {
			const { data } = await axios.delete(api + path, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return data;
		}
	} catch (e) {
		console.log(e);
	}
};

const Api = {
	//Auth---------------------------------------------------------------------------
	// 로그인
	postLogin: async (user_login_id, user_password) => {
		return await postJsonReqest('/auth/login', {
			user_login_id,
			user_password
		});
	},
	// 로그아웃
	getLogout: async () => {
		return await getRequest('/auth/logout');
	},
	// 아이디 중복 확인
	getDoubleCheckId: async (loginId) => {
		return await getRequest('/auth/doubleId', { loginId });
	},
	// 이메일 인증 번호 전송
	getEmail: async (email) => {
		return await getRequest('/auth/email', { email });
	},
	// 비밀번호 재설정 이메일 인증 전송
	getResetPasswordEmail: async (email) => {
		return await getRequest('/auth/email/password', { email });
	},
	// 이메일 인증 번호 확인
	postEmail: async (emailId, authStr) => {
		return await postJsonReqest('/auth/email', { emailId, authStr });
	},
	// 비밀번호 재설정
	postPassword: async (loginId, changePassword) => {
		return await postJsonReqest('/auth/password', { loginId, changePassword });
	},
	// User--------------------------------------------------------------------------
	// 회원가입
	postUser: async (user_data) => {
		return await postJsonReqest('/user', user_data);
	},
	// 회원정보 수정
	postUpdateUser: async (
		userId,
		user_image,
		user_introduction,
		user_github,
		user_blog,
		user_position
	) => {
		return await postJsonReqest(`/user/${userId}`, {
			user_image,
			user_introduction,
			user_github,
			user_blog,
			user_position
		});
	},
	// 회원 탈퇴
	deleteUser: async (userId) => {
		return await deleteJsonReqest(`/user/${userId}`);
	}
};

export default Api;
