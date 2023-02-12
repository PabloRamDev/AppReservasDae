/* eslint-disable react/react-in-jsx-scope */

import { DataGrid , esES} from '@mui/x-data-grid';
import { Box } from '@mui/system';



// eslint-disable-next-line react/prop-types
export default function Datatable({ rows, columns, isLoading}) {


  return (
    <Box height={507} padding={2}>
      <DataGrid
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        initialState={{sorting:{sortModel:[{field:'id', sort:'desc'}]}}}
        loading={isLoading}
        // onCellEditCommit={}
      />
    </Box>

  );
}
