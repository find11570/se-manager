import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/Dashboard/DashboardLayout';
import MainLayout from 'src/components/Main/MainLayout';
import Dashboard from 'src/pages/Dashboard';
import Team from 'src/pages/Team';
import TeamRegister from 'src/components/Team/TeamRegister';
import TeamSpecific from 'src/components/Team/TeamSpecific';
import TeamUpdate from 'src/components/Team/TeamUpdate';
import Project from 'src/pages/Project';
import TeamboardLayout from 'src/components/Team/TeamboardLayout';
import LoginLayout from 'src/components/Login/LoginboardLayout';
import Login from 'src/components/Login/Login';
import SignUpLayout from 'src/components/Signup/SignUpboardLayout';
import SignUp from 'src/components/Signup/SignUpRegister';
import Password from 'src/components/Login/Password';
import SignUpUpdate from 'src/components/Mypage/SignUpUpdate';
import MypageLayout from 'src/components/Mypage/MypageboardLayout';
import ProjectDetail from 'src/components/Dashboard/ProjectDetail';
import Mypage from 'src/components/Mypage/Mypage';
import ProjectRegister from 'src/components/Dashboard/ProjectRegister';
import ProjectUpdate from 'src/components/Dashboard/ProjectUpdate';
import TeamList from 'src/components/Team/TeamList';

const routes = [
	{
		path: 'app',
		element: <DashboardLayout />,
		children: [
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'project', element: <Project /> },
			{ path: 'projectDetail/:id', element: <ProjectDetail /> },
			{ path: 'ProjectRegister', element: <ProjectRegister /> },
			{ path: 'ProjectUpdate/:id', element: <ProjectUpdate /> }
		]
	},
	{
		path: 'se',
		element: <TeamboardLayout />,
		children: [
			{ path: 'team', element: <Team /> },
			{ path: 'teamRegister', element: <TeamRegister /> },
			{ path: 'teamSpecific', element: <TeamSpecific /> },
			{ path: 'teamupdate', element: <TeamUpdate /> },
			{ path: 'teamList', element: <TeamList /> }
		]
	},
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: '/', element: <Navigate to="/app/dashboard" /> },
		]
	},
	{
		path: 'login',
		element: <LoginLayout />,
		children: [
			{ path: 'login', element: <Login /> },
			{ path: 'password', element: <Password /> }
		]
	},
	{
		path: 'sign',
		element: <SignUpLayout />,
		children: [
			{ path: 'up', element: <SignUp /> },
		]
	},
	{
		path: 'mypage',
		element: <MypageLayout />,
		children: [
			{ path: 'update', element: <SignUpUpdate /> },
			{ path: 'page', element: <Mypage /> }
		]
	},
];

export default routes;
