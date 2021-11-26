import { TextField } from '@material-ui/core';
import Api from '../../Api/Api';

const NestedCommentInput = (props) => {
  return (
    <>
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
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SvgIcon fontSize="small" color="action" />
            </InputAdornment>
          )
        }}
        placeholder="댓글을 입력하세요!"
        variant="outlined"
      />
    </>
  );
};

export default NestedCommentInput;
