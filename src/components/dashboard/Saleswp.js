import { Bar } from 'react-chartjs-2';
import {
	Box,
	Card,
	CardContent,
	CardHeader,
	Divider,
	useTheme,
	colors,
	Button,
	ClickAwayListener,
	Grow,
	Paper,
	Popper,
	MenuItem,
	MenuList
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Salestp = (props) => {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const anchorRef = React.useRef(null);
	const { value } = props;
	const [senddata, setsenddata] = useState(
		{
			farm: '',
			day: '',
		}
	);
	const [result, setresult] = useState();
	const [sname, setsname] = useState();
	const wp = [];
	const date = [];
	const [data2, setdata2] = useState();

	const handleToggle = () => {
		setOpen((prevOpen) => !prevOpen);
	};

	const handleClose = (event) => {
		if (anchorRef.current && anchorRef.current.contains(event.target)) {
			return;
		}
		setsenddata({
			...senddata,
			day: event.target.value,
			farm: value
		});
		setOpen(false);
	};

	function handleListKeyDown(event) {
		if (event.key === 'Tab') {
			event.preventDefault();
			setOpen(false);
		}
	}

	const api = () => axios.post('http://farm.developerpsy.com:443/SelectWPduringDate.php', JSON.stringify([senddata]));

	const getCharts = async () => {
		console.log(senddata);
		const newCharts = await api();
		setresult(newCharts.data);
	};

	// return focus to the button when we transitioned from !open -> open
	const prevOpen = React.useRef(open);
	React.useEffect(() => {
		if (prevOpen.current === true && open === false) {
			anchorRef.current.focus();
		}

		prevOpen.current = open;
	}, [open]);

	useEffect(() => {
		if (!result) {
			setsname('');
		} else {
			for (let i = 0; i < result.length; i++) {
				wp.push(result[i].wp);
			}
			setsname(result[0].sname);
			for (let i = 0; i < result.length; i++) {
				date.push(result[i].mdate + result[i].mtime);
			}
		}
		setdata2(
			{
				datasets: [
					{
						fill: false,
						borderColor: colors.red[500],
						data: wp,
						label: 'wp',
						yAxisID: 'wp'
					}
				],
				labels: date
			}
		);
	}, result);

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
					labelString: 'wp',
					fontSize: 18,
					fontColor: colors.blue[500]
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
				title="농장 wp 차트(최근 10일, 30일, 60일)"
			/>
			<Button onClick={getCharts}>조회</Button>
			<Divider />
			<CardContent>
				<Box
					sx={{
						height: 400,
						position: 'relative'
					}}
				>
					<Bar
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
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
				}}
			>
				<Button
					ref={anchorRef}
					aria-controls={open ? 'menu-list-grow' : undefined}
					aria-haspopup="true"
					onClick={handleToggle}
				>
					기간
				</Button>
				<Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
						>
							<Paper>
								<ClickAwayListener onClickAway={handleClose}>
									<MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
										<MenuItem onClick={(event) => handleClose(event)} value="10">10일</MenuItem>
										<MenuItem onClick={(event) => handleClose(event)} value="30">30일</MenuItem>
										<MenuItem onClick={(event) => handleClose(event)} value="60">60일</MenuItem>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</Box>
		</Card>
	);
};

export default Salestp;
