import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Api from 'src/Api/Api';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
export default function waitTable() {
  const [rowData, setRowData] = useState([]);
  const columns = [
    { field: 'user_school_num', headerName: '학번', width: 180 },
    {
      field: 'user_name',
      headerName: '이름',
      width: 180,
      editable: true
    },
    {
      field: 'user_email',
      headerName: '이메일',
      width: 220,
      editable: true
    },
    {
      field: 'application_stat',
      headerName: '상태',
      width: 180,
      editable: true
    }
  ];
  const team_id = location.href
    .split('/')
    [location.href.split('/').length - 1].split('.')[0];
  const ok = async (selection) => {
    let response = await Api.getTeam(team_id);
    if (
      selection.length > response.data.recruitment.recruitment_recruited_limit
    ) {
      alert('제한인원보다 많습니다');
    } else {
      selection.map((s) => {
        Api.getOK(team_id, s);
      });
    }
    window.location.reload();
  };

  const refuse = async (selection) => {
    selection.map((s) => {
      Api.getRefuse(team_id, s);
    });
    window.location.reload();
  };

  useEffect(async () => {
    let response = await Api.getTeamList(team_id);
    response.data.applicants.map((row) => {
      if (row.application_stat == '대기') {
        setRowData((wait) => [...wait, row]);
      }
    });
  }, []);
  const selectionModel = rowData.map((r) => r.user_id);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(r) => r.user_id}
        rows={rowData}
        columns={columns}
        pageSize={5}
        checkboxSelection
        selectionModel={selectionModel}
      />
      <Button
        variant="contained"
        color="success"
        sx={{
          float: 'right',
          marginTop: 1
        }}
        onClick={() => refuse(selectionModel)}
      >
        <h3
          style={{
            color: '#ffffff'
          }}
        >
          거절
        </h3>
      </Button>
      <Button
        variant="contained"
        color="success"
        sx={{
          marginTop: 1
        }}
        onClick={() => ok(selectionModel)}
      >
        <h3
          style={{
            color: '#ffffff'
          }}
        >
          수락
        </h3>
      </Button>
    </div>
  );
}
