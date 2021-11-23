import axios from 'axios';

const api = 'http://202.31.202.28:443/api';

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
    const token = sessionStorage.getItem('user_token');
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
  // 이메일 인증코드 저장
  emailCode: null,
  // 한 페이지당 보여줄 컨텐츠 개수
  pageCount: 6,

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
  // 회원정보 조회
  getReaduser: async (userId) => {
    return await getRequest(`/user/${userId}`);
  },
  // 사용자 LoginId검색
  getUserLoginId: async (loginId) => {
    return await getRequest('/user/search/loginId', { loginId });
  },
  // 교수님 리스트 조회
  getProfessors: async () => {
    return await getRequest('/user/professors');
  },
  // 사용자 참가 프로젝트 리스트 조회
  getProjectInUser: async (userId, pageNum, pageCount) => {
    return await getRequest(`/user/${userId}/projects`, { pageNum, pageCount });
  },
  // 내가 작성한 팀원모집글 조회
  getUserRecruitment: async (userId, pageNum, pageCount) => {
    return await getRequest(`/user/${userId}/recruitment`, {
      pageNum,
      pageCount
    });
  },
  // 회원 탈퇴
  deleteUser: async (userId) => {
    return await deleteJsonReqest(`/user/${userId}`);
  },

  // Projects--------------------------------------------------------------------------------
  // 프로젝트 생성
  postProject: async (project) => {
    return await postJsonReqest('/project', project);
  },
  // 프로젝트 수정
  postUpdateProject: async (projectId, project) => {
    return await postJsonReqest(`/project/${projectId}`, project);
  },
  // 프로젝트 상세조회
  getProject: async (projectId) => {
    return await getRequest(`/project/${projectId}`);
  },
  // 프로젝트 전체조회
  getAllProject: async (pageNum, pageCount) => {
    return await getRequest('/project', { pageNum, pageCount });
  },
  // 전체 프로젝트 개수 조회
  getAllProjectCount: async () => {
    return await getRequest('/project-count');
  },
  // 프로젝트 조회수 증가
  getHit: async (projectId) => {
    return await getRequest(`/project/${projectId}/hit`);
  },
  // 프로젝트 전체 기술스택 리스트 조회
  getStacks: async () => {
	  const stack = await getRequest('/project/tags');
    return await getRequest('/project/tags');
  },
  // 프로젝트 카테고리 리스트 조회
  getCategorys: async () => {
    return await getRequest('/project/categorys');
  },
  // 프로젝트 과목년도 리스트 조회
  getYears: async () => {
    return await getRequest('/project/subject-years');
  },
  // 프로젝트 과목리스트 조회
  getSubjects: async () => {
    return await getRequest('/project/subjects');
  },
  // 프로젝트 정렬 메뉴 조회
  getMenus: () => {
    return ['최신순', '좋아요순', '조회순'];
  },
  // 프로젝트 태그 검색
  getProjectTags: async (tagId) => {
    return await getRequest('/project/search/tag', { tagId });
  },
  // 카테고리별 프로젝트 조회
  getProjectInCategory: async (categoryId, pageNum, pageCount) => {
    const response = await getRequest('/project/search/category', {
      categoryId,
      pageNum,
      pageCount
    });
	return response.data;
  },
  // 프로젝트 검색
  postProjectSearch: async (pageNum, pageCount, project) => {
    return await postJsonReqest(`/project/search/?pageNum=${pageNum}&pageCount=${pageCount}`, project);
  },
  // 프로젝트 삭제 -> 아직 구현 X
  deleteProject: async (projectId) => {
    return await deleteJsonReqest(`/project/${projectId}`);
  },

  // Follow------------------------------------------------------------------------------------
  // 팔로우
  getFollow: async (targetId) => {
    return await getRequest('/user/follow', { targetId });
  },
  // 팔로우 취소
  getUnfollow: async (targetId) => {
    return await getRequest('/user/unfollow', { targetId });
  },
  // 팔로워 리스트 조회
  getFollowerList: async (userId) => {
    return await getRequest(`/user/${userId}/followers`);
  },
  // 팔로잉 리스트 조회
  getFollowingList: async (userId) => {
    return await getRequest(`/user/${userId}/followings`);
  },

  // likes------------------------------------------------------------------------------------
  // 프로젝트 좋아요 여부 확인
  getProjectIsLike: async (projectId) => {
    return await getRequest('/project/isLike', { projectId });
  },
  // 프로젝트 좋아요
  getProjectLike: async (projectId) => {
    return await getRequest('/project/like', { projectId });
  },
  // 프로젝트 좋아요 취소
  getProjectUnlike: async (projectId) => {
    return await getRequest('/project/unlike', { projectId });
  },
  // 사용자의 좋아요한 프로젝트 리스트 조회
  getLikedProject: async (userId, pageNum, pageCount) => {
    return await getRequest(`/user/${userId}/like-projects`, {
      pageNum,
      pageCount
    });
  },
  // Posts------------------------------------------------------------------------------------
  // 게시글 생성
  getCreatePosting: async (projectId, post_title, post_content) => {
    return await postJsonReqest(`/project/${projectId}/post`, {
      post_title,
      post_content
    });
  },
  // 게시글 수정
  postUpdatePosting: async (projectId, postId, post_title, post_content) => {
    return await postJsonReqest(`/project/${projectId}/post/${postId}`, {
      post_title,
      post_content
    });
  },
  // 게시글 삭제 -> 아직 구현 X
  deletePosting: async (projectId, postId) => {
    return await deleteJsonReqest(`/project/${projectId}/post/${postId}`);
  },
  // 게시글 조회
  getReadPosting: async (projectId, postId) => {
    return await getRequest(`/project/${projectId}/post/${postId}`);
  },
  // 게시글 목록 조회
  getPostingList: async (projectId) => {
    return await getRequest(`/project/${projectId}/post-list`);
  },
  // Comments-----------------------------------------------------------------------------------
  // 프로젝트에 댓글 / 대댓글 등록
  postComment: async (
    projectId,
    comment_content,
    comment_depth,
    comment_parent
  ) => {
    return await postJsonReqest(`/project/${projectId}/comment`, {
      comment_content,
      comment_depth,
      comment_parent
    });
  },
  // 프로젝트에 댓글 / 대댓글 수정
  postUpdateComment: async (projectId, commentId, comment_content) => {
    return await postJsonReqest(`/project/${projectId}/comment/${commentId}`, {
      comment_content
    });
  },
  // 프로젝트에 댓글 / 대댓글 삭제
  deleteComment: async (projectId, commentId) => {
    return await deleteJsonReqest(`/project/${projectId}/comment/${commentId}`);
  },
  // 프로젝트의 댓글 / 대댓글 조회
  getReadComment: async (projectId) => {
    return await getRequest(`/project/${projectId}/comment/`);
  },
  // Files--------------------------------------------------------------------------------------
  getReadFile: async (fileData) => {
    return await postFormReqest(`/file/upload`, fileData);
  },
  // Recruitment--------------------------------------------------------------------------------
  postTeam: async (Team) => {
    return await postJsonReqest('/recruitment', Team);
  },
  getAllTeam: async (pageNum, pageCount) => {
	const response = await getRequest('/recruitment', { pageNum, pageCount })
	return response.data;
  },
  getTeam: async (Teamid) => {
    return await getRequest(`/recruitment/${Teamid}`);
  },

  getTeamEnd: async (Teamid) => {
    return await getRequest(`/recruitment/${Teamid}/end`);
  },
  getTeamApplication: async (Teamid) => {
    return await getRequest(`/recruitment/${Teamid}/application`);
  },

  postTeamUpdate: async (Teamid, Team) => {
    return await postJsonReqest(`/recruitment/${Teamid}`, Team);
  },
  deleteTeam: async (Teamid) => {
    return await deleteJsonReqest(`/recruitment/${Teamid}`);
  },
  getSearch: async (pageNum, pageCount, keyword, subject) => {
	const response = await getRequest(`/recruitment/search?pageNum=${pageNum}&pageCount=${pageCount}&keyword=${keyword}&subject=${subject}`);
	return response.data;
  },
  getTeamcancelApplication: async (Teamid) => {
    return await deleteJsonReqest(`/recruitment/${Teamid}/application`);
  },
  getTeamList: async (Teamid) => {
    return await getRequest(`/recruitment/${Teamid}/application-list`);
  },
  getisApplication: async (Teamid) => {
    return await getRequest(`/recruitment/${Teamid}/isApplication`);
  },
  getOK: async (Teamid, array) => {
    return await getRequest(`/recruitment/${Teamid}/accept?userId=${array}`);
  },
  getRefuse: async (Teamid, array) => {
    return await getRequest(`/recruitment/${Teamid}/refuse?userId=${array}`);
  },
  // Notification———————————————————————————————————————
};

export default Api;
