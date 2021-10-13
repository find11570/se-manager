import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/Dashboard/DashboardLayout';
import MainLayout from 'src/components/Main/MainLayout';
import Dashboard from 'src/pages/Dashboard';
import Team from 'src/pages/Team';
import TeamRegister from 'src/components/Team/TeamRegister';
import TeamSpecific from 'src/components/Team/TeamSpecific';
import TeamUpdate from 'src/components/Team/TeamUpdate';
import TeamSpecificQuestion from 'src/components/Team/TeamSpecificQuestion';
import Project from 'src/pages/Project';
import Chat from 'src/pages/Chat';
import ChatLayout from 'src/components/modal/ChatboardLayout';
import TeamboardLayout from 'src/components/Team/TeamboardLayout';
import LoginLayout from 'src/components/Login/LoginboardLayout';
import Login from 'src/components/Login/Login';
import SignUpLayout from 'src/components/Signup/SignUpboardLayout';
import SignUp from 'src/components/Signup/SignUpRegister';

const routes = [
	{
		path: 'app',
		element: <DashboardLayout />,
		children: [
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'project', element: <Project /> },
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
			{ path: 'teamSpecificQuestion', element: <TeamSpecificQuestion /> },
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
		path: 'chat',
		element: <ChatLayout />,
		children: [
			{ path: 'chat', element: <Chat /> }
		]
	},
	{
		path: 'login',
		element: <LoginLayout />,
		children: [
			{ path: 'login', element: <Login /> }
		]
	},
	{
		path: 'sign',
		element: <SignUpLayout />,
		children: [
			{ path: 'up', element: <SignUp /> },
		]
	}
];

export default routes;
