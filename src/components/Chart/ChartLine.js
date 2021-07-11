import { Line } from 'react-chartjs-2';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	useTheme,
	colors,
	Button
} from '@material-ui/core';
import { useState, useEffect } from 'react';

const ChartLine = (props) => {
	const theme = useTheme();
	const { data } = props;
	const [tp, settp] = useState();
	const [wp, setwp] = useState();
	const [sname, setsname] = useState();
	const [date, setdate] = useState();

	useEffect(() => {
		if (!data) {
			settp([0]);
			setwp([0]);
			setsname('');
			setdate([]);
		} else {
			settp([data[0].tp, data[1].tp, data[2].tp, data[3].tp, data[4].tp, data[5].tp]);
			setwp([data[0].wp, data[1].wp, data[2].wp, data[3].wp, data[4].wp, data[5].wp]);
			setsname(data[0].sname);
			setdate([data[0].mdate + data[0].mtime, data[1].mdate + data[1].mtime, data[2].mdate + data[2].mtime, data[3].mdate + data[3].mtime, data[4].mdate + data[4].mtime, data[5].mdate + data[5].mtime]);
		}
	}, data);

	const data2 = {
		datasets: [
			{
				fill: false,
				borderColor: colors.indigo[500],
				data: wp,
				label: 'wp',
				yAxisID: 'wp'
			},
			{
				fill: false,
				borderColor: colors.red[500],
				data: tp,
				label: 'tp',
				yAxisID: 'tp'
			}
		],
		labels: date
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
						labelString: sname,
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
				title="농장 별 센서 차트"
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
						data={data2}
						options={options}
					/>
				</Box>
			</CardContent>
			<Divider />
			&nbsp;&nbsp;&nbsp;농장 정보
			<Button onClick={() => alert('Click!')}>조회</Button>
		</Card>
	);
};

export default ChartLine;
