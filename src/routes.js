import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Dashboard from 'src/pages/Dashboard';
import FarmList from 'src/pages/FarmList';
import ChartList from 'src/pages/ChartList';
import CharttimeList from 'src/pages/CharttimeList';

const routes = [
	{
		path: 'app',
		element: <DashboardLayout />,
		children: [
			{ path: 'dashboard', element: <Dashboard /> },
			{ path: 'Farm', element: <FarmList /> },
			{ path: 'chart', element: <ChartList /> },
			{ path: 'charttime', element: <CharttimeList /> },
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
