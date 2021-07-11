import { Line } from 'react-chartjs-2';
import {
	Box,
	Card,
	CardContent,
	Divider,
	useTheme,
	colors
} from '@material-ui/core';

const CharttimeLine = (props) => {
	const theme = useTheme();

	const data = {
		datasets: [
			{
				fill: false,
				borderColor: colors.indigo[500],
				data: [-53625.8, -46786, -100000, -45922.1, -48311.9, -52690.2],
				label: 'wp',
				yAxisID: 'wp'
			},
			{
				fill: false,
				borderColor: colors.red[500],
				data: [24.8, 25.1, 24.8, 25.1, 24.8, 25.1],
				label: 'tp',
				yAxisID: 'tp'
			}
		],
		labels: ['2021-05-14 12:25:22', '2021-05-14 12:24:43', '2021-05-14 12:24:04 ', '2021-05-14 12:23:06', '2021-05-14 12:22:27', '2021-05-14 12:21:29']
	};

	const options = {
		animation: false,
		cornerRadius: 20,
		layout: { padding: 0 },
		legend: { display: false },
		maintainAspectRatio: false,
		responsive: true,
		scales: {
			xAxes: [
				{
					barThickness: 12,
					maxBarThickness: 10,
					barPercentage: 0.5,
					categoryPercentage: 0.5,
					ticks: {
						fontColor: theme.palette.text.secondary
					},
					gridLines: {
						display: false,
						drawBorder: false
					},
					scaleLabel: {
						display: true,
						labelString: '덕교 농장',
						fontSize: 19,
						fontColor: colors.grey[900]
					}
				}
			],
			yAxes: [{
				id: 'wp',
				position: 'right',
				ticks: {
					fontColor: theme.palette.text.secondary,
					beginAtZero: true,
				},
				gridLines: {
					borderDash: [2],
					borderDashOffset: [2],
					color: theme.palette.divider,
					drawBorder: false,
					zeroLineBorderDash: [2],
					zeroLineBorderDashOffset: [2],
					zeroLineColor: theme.palette.divider
				},
				scaleLabel: {
					display: true,
					labelString: 'wp',
					fontSize: 18,
					fontColor: colors.indigo[500]
				}
			}, {
				id: 'tp',
				position: 'left',
				ticks: {
					fontColor: theme.palette.text.secondary,
					beginAtZero: true,
				},
				gridLines: {
					borderDash: [2],
					borderDashOffset: [2],
					color: theme.palette.divider,
					drawBorder: false,
					zeroLineBorderDash: [2],
					zeroLineBorderDashOffset: [2],
					zeroLineColor: theme.palette.divider
				},
				scaleLabel: {
					display: true,
					labelString: 'tp',
					fontSize: 18,
					fontColor: colors.red[500]
				}
			}]
		},
		tooltips: {
			backgroundColor: theme.palette.background.paper,
			bodyFontColor: theme.palette.text.secondary,
			borderColor: theme.palette.divider,
			borderWidth: 1,
			enabled: true,
			footerFontColor: theme.palette.text.secondary,
			intersect: false,
			mode: 'index',
			titleFontColor: theme.palette.text.primary
		}
	};

	return (
		<Card {...props}>
			<Divider />
			<CardContent>
				<Box
					sx={{
						height: 400,
						position: 'relative'
					}}
				>
					<Line
						data={data}
						options={options}
					/>
				</Box>
			</CardContent>
			<Divider />
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					p: 2
				}}
			/>
		</Card>
	);
};

export default CharttimeLine;
