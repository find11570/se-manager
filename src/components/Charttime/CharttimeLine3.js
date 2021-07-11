import { Line } from 'react-chartjs-2';
import {
	Box,
	Card,
	CardContent,
	Divider,
	useTheme,
	colors
} from '@material-ui/core';
import { useState, useEffect } from 'react';

const CharttimeLine3 = (props) => {
	const theme = useTheme();
	const { dat } = props;
	const [sname, setsname] = useState();
	const tp = [];
	const wp = [];
	const date = [];
	const [data2, setdata2] = useState();

	useEffect(() => {
		if (!dat) {
			setsname('');
		} else {
			for (let i = 0; i < dat.length; i++) {
				tp.push(dat[i].tp);
			}
			for (let i = 0; i < dat.length; i++) {
				wp.push(dat[i].wp);
			}
			setsname(dat[0].sname);
			for (let i = 0; i < dat.length; i++) {
				date.push(dat[i].mdate + dat[i].mtime);
			}
		}
		setdata2(
			{
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
			}
		);
	}, dat);

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

export default CharttimeLine3;
