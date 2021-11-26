import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Downshift from "downshift";
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Api from '../../Api/Api';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
	chip: {
		margin: theme.spacing(0.5, 0.25)
	}
}));

export default function TagsInput(props) {
	const classes = useStyles();
	const { placeholder, tags, other } = props;
	const [inputValue, setInputValue] = React.useState("");
	const [selectedItem, setSelectedItem] = React.useState([]);
	const [stacks, setstacks] = useState([]);
	const [state, setstate] = useState(false);
	const temp = '';
	function handleKeyDown(event) {
		if (event.key === "Enter") {
			const newSelectedItem = [...selectedItem];
			const duplicatedValues = newSelectedItem.indexOf(
				event.target.value.trim()
			);

			if (duplicatedValues !== -1) {
				setInputValue("");
				return;
			}
			if (!event.target.value.replace(/\s/g, "").length) return;

			newSelectedItem.push(event.target.value.trim());
			setSelectedItem(newSelectedItem);
			setInputValue("");
		}
		if (
			selectedItem.length &&
			!inputValue.length &&
			event.key === "Backspace"
		) {
			setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
		}
	}
	function handleChange(item) {
		let newSelectedItem = [...selectedItem];
		if (newSelectedItem.indexOf(item) === -1) {
			newSelectedItem = [...newSelectedItem, item];
		}
		setInputValue("");
		setSelectedItem(newSelectedItem);
	}

	const getStacks = async (value) => {
		if (value == '') {
			value = null;
		}
		if (value == ' ') {
			value = null;
		}
		let response = await Api.getProjectTags(value);
		if (response.length != 0) {
			if (response.data.tags == null) {
				const stack_list = [];
				setstacks(stack_list);
			}
			else {
				const stack_list = await response.data.tags;
				setstacks(stack_list);
			}
		} else {
			const stack_list = [];
			setstacks(stack_list);
		}
	};

	const handleDelete = (item) => () => {
		const newSelectedItem = [...selectedItem];
		newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
		setSelectedItem(newSelectedItem);
	};

	function handleInputChange(event) {
		setInputValue(event.target.value);
		getStacks(event.target.value);
		if (!event.target.value) {
			setstate(false);
		} else {
			setstate(true);
		}
	}
	const project_id = location.href
		.split('/')
	[location.href.split('/').length - 1].split('.')[0];


	useEffect(() => {
		props.propfunction(selectedItem);
	}, [selectedItem]);
	useEffect(async () => {
		if (project_id != 'ProjectRegister') {
			let response = await Api.getProject(project_id);
			if (response.data.project.project_tags != null) {
				const tag = [];
				tag.push(response.data.project.project_tags);
				setSelectedItem(tag[0]);
			}
		}
	}, []);

	function makeChip(s) {
		const newSelectedItem = [...selectedItem];
		const duplicatedValues = newSelectedItem.indexOf(
			s.trim()
		);

		if (duplicatedValues !== -1) {
			setInputValue("");
			return;
		}
		if (!s.replace(/\s/g, "").length) return;

		newSelectedItem.push(s.trim());
		setSelectedItem(newSelectedItem);
		setInputValue("");
	}
	return (
		<React.Fragment>
			<Downshift
				id="downshift-multiple"
				inputValue={inputValue}
				onChange={handleChange}
				selectedItem={selectedItem}
			>
				{({ getInputProps }) => {
					const { onBlur, onChange, onFocus, ...inputProps } = getInputProps({
						onKeyDown: handleKeyDown,
						placeholder
					});
					return (
						<div>
							<TextField
								fullWidth
								sx={{
									flex: '1',
									flexDirection: 'row',
									boxShadow: 5,
									borderBottomRightRadius: 5,
									borderBottomLeftRadius: 5,
									borderTopRightRadius: 5,
									borderTopLeftRadius: 5,
									backgroundColor: 'primary.smoothgreen'
								}}
								placeholder="기술스택을 입력해주세요"
								variant="outlined"
								InputProps={{
									startAdornment: selectedItem.map((item) => (
										<Chip
											key={item}
											tabIndex={-1}
											label={item}
											className={classes.chip}
											onDelete={handleDelete(item)}
										/>
									)),
									onBlur,
									onChange: (event) => {
										handleInputChange(event);
										onChange(event);
									},
									onFocus
								}}
								{...other}
								{...inputProps}
							/>
							{state ? (
								<Paper sx={{ maxWidth: '100%', boxShadow: 5 }}>
									<MenuList>
										{stacks?.map(s => {
											return (
												<MenuItem onClick={() => makeChip(s)} key={s} value={s}>
													{s ?? s}
												</MenuItem>
											);
										})}
									</MenuList>
								</Paper>
							) : (
								temp
							)}
						</div>
					);
				}}
			</Downshift>
		</React.Fragment>
	);
}
TagsInput.defaultProps = {
	tags: [],
};
TagsInput.propTypes = {
	tags: PropTypes.arrayOf(PropTypes.string)
};
