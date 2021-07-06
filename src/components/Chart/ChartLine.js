import { Line } from 'react-chartjs-2';
import {
	Box,
	Card,
	CardContent,
	Checkbox,
	CardHeader,
	Divider,
	useTheme,
	colors
} from '@material-ui/core';
import { useState } from 'react';

const ChartLine = (props) => {
	const theme = useTheme();
	const [selectedFarmIds, setSelectedFarmIds] = useState([]);

	const handleSelectOne = (event, pkey) => {
		const selectedIndex = selectedFarmIds.indexOf(pkey);
		let newSelectedFarmIds = [];
		if (selectedIndex === -1) {
			newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds, pkey);
		} else if (selectedIndex === 0) {
			newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds.slice(1));
		} else if (selectedIndex === selectedFarmIds.length - 1) {
			newSelectedFarmIds = newSelectedFarmIds.concat(selectedFarmIds.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelectedFarmIds = newSelectedFarmIds.concat(
				selectedFarmIds.slice(0, selectedIndex),
				selectedFarmIds.slice(selectedIndex + 1)
			);
		}
		setSelectedFarmIds(newSelectedFarmIds);
	};

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
			<CardHeader
				title="센서 차트"
			/>
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
			&nbsp;&nbsp;&nbsp;농장 정보
			<Checkbox
				sx={{
					flex: '1',
					flexDirection: 'row',
				}}
				checked={selectedFarmIds.indexOf(3) !== -1}
				onChange={(event) => handleSelectOne(event, 3)}
				value="true"
			/>
		</Card>
	);
};

export default ChartLine;
