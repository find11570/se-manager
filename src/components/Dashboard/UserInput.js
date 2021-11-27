import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Downshift from 'downshift';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import Api from '../../Api/Api';
import MenuItem from '@mui/material/MenuItem';

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(0.5, 0.25)
  }
}));

export default function UserInput(props) {
  const classes = useStyles();
  const { placeholder, users, other } = props;
  const [inputValue, setInputValue] = React.useState('');
  const [selectedItem, setSelectedItem] = React.useState([]);
  const [members, setMembers] = useState([]);
  const [state, setstate] = useState(false);
  const temp = '';

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const newSelectedItem = [...selectedItem];
      const duplicatedValues = newSelectedItem.indexOf(
        event.target.value.trim()
      );

      if (duplicatedValues !== -1) {
        setInputValue('');
        return;
      }
      if (!event.target.value.replace(/\s/g, '').length) return;

      newSelectedItem.push(event.target.value.trim());
      setSelectedItem(newSelectedItem);
      setInputValue('');
    }
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === 'Backspace'
    ) {
      setSelectedItem(selectedItem.slice(0, selectedItem.length - 1));
    }
  }
  function handleChange(item) {
    let newSelectedItem = [...selectedItem];
    if (newSelectedItem.indexOf(item) === -1) {
      newSelectedItem = [...newSelectedItem, item];
    }
    setInputValue('');
    setSelectedItem(newSelectedItem);
  }

  const getMembers = async (value) => {
    if (value == '') {
      value = null;
    }
    if (value == ' ') {
      value = null;
    }
    let response = await Api.getUserLoginId(value);
    if (response.length != 0) {
      if (response.data.users == null) {
        const member_list = await Promise.all(
          response.data.users.slice(0, 9).map((member) => {
            return member.user_login_id;
          })
        );
        setMembers(member_list);
      } else {
        const member_list = await Promise.all(
          response.data.users.slice(0, 9).map((member) => {
            return member.user_login_id;
          })
        );
        setMembers(member_list);
      }
    } else {
      const member_list = [];
      setMembers(member_list);
    }
  };

  const handleDelete = (item) => () => {
    const newSelectedItem = [...selectedItem];
    newSelectedItem.splice(newSelectedItem.indexOf(item), 1);
    setSelectedItem(newSelectedItem);
  };

  function handleInputChange(event) {
    setInputValue(event.target.value);
    if (event.target.value) {
      getMembers(event.target.value);
    }
    if (!event.target.value) {
      setstate(false);
    } else {
      setstate(true);
    }
  }

  useEffect(() => {
    props.propfunction(selectedItem);
  }, [selectedItem]);

  function makeChip(s) {
    const newSelectedItem = [...selectedItem];
    const duplicatedValues = newSelectedItem.indexOf(s.trim());

    if (duplicatedValues !== -1) {
      setInputValue('');
      return;
    }
    if (!s.replace(/\s/g, '').length) return;

    newSelectedItem.push(s.trim());
    setSelectedItem(newSelectedItem);
    setInputValue('');
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
                placeholder="팀원의 아이디를 입력해주세요"
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
                    {members?.map((s) => {
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
UserInput.defaultProps = {
  tags: []
};
UserInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
};
