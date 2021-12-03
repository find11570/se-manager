import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Api from '../../Api/Api';
import { useState, useEffect } from 'react';

export default function OKTable() {
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

  useEffect(async () => {
    let response = await Api.getTeamList(team_id);
    response.data.applicants.map((row) => {
      if (row.application_stat == '수락') {
        setRowData((ok) => [...ok, row]);
      }
    });
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(r) => r.user_id}
        rows={rowData}
        columns={columns}
        pageSize={5}
      />
    </div>
  );
}
