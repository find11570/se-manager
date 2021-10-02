import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/Dashboard/DashboardLayout';
import MainLayout from 'src/components/Main/MainLayout';
import Dashboard from 'src/pages/Dashboard';
import Team from 'src/pages/Team';
import TeamRegister from 'src/components/Team/TeamRegister';

const routes = [
	{
		path: 'app',
		element: <DashboardLayout />,
		children: [
			{ path: 'team', element: <Team /> },
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'teamRegister', element: <TeamRegister /> },
		]
	},
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{ path: '/', element: <Navigate to="/app/dashboard" /> },
		]
	}
];

export default routes;
