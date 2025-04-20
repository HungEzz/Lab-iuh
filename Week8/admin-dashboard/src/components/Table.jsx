import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import { visuallyHidden } from '@mui/utils';
import '../App.css';
import UpdateCustomerModal from './UpdateCustomerModal';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
// Lưu ý quan trọng
// Nhận API dữ liệu của bảng ở App rồi truyền xuống Table
// Đem khai báo rows vào trong EnhancedTable vì khi nhận customersProps không
// thể sử dụng ở bên ngoài EnhancedTable

//Thay đổi dữ liệu dòng ở <TableCell align="left">{row.company}</TableCell>
//thay đổi định dạng trái phải của dữ liệu ở <TableCell align="left">


//Không render lại con khi mà set trạng thái model đóng mở


//tạo data
function createData(id, avatar, name, company, orderValue, orderDate, status) {
  return {
    id,
    avatar,
    name,
    company,
    orderValue,
    orderDate,
    status,
  };
}

//dữ liệu từng dòng
// const rows = [
//   createData(1, 'Cupcake', "A", "BB", "CC", "DD"),
//   createData(2, 'Donut', 452, 25.0, 51, 4.9),
//   createData(3, 'Eclair', 262, 16.0, 24, 6.0),
//   createData(4, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
//   createData(6, 'Honeycomb', 408, 3.2, 87, 6.5),
//   createData(7, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData(8, 'Jelly Bean', 375, 0.0, 94, 0.0),
//   createData(9, 'KitKat', 518, 26.0, 65, 7.0),
//   createData(10, 'Lollipop', 392, 0.2, 98, 0.0),
//   createData(11, 'Marshmallow', 318, 0, 81, 2.0),
//   createData(12, 'Nougat', 360, 19.0, 9, 37.0),
//   createData(13, 'Oreo', 437, 18.0, 63, 4.0),
// ];

//hàm này dùng cho nút sắp xếp dữ liệu giảm
function descendingComparator(a, b, orderBy) {
  // Handle numeric sorting for orderValue
  if (orderBy === 'orderValue') {
    const aValue = parseFloat(a[orderBy]);
    const bValue = parseFloat(b[orderBy]);
    if (isNaN(aValue) || isNaN(bValue)) {
      // Fall back to string comparison if not numeric
      return b[orderBy].toString().localeCompare(a[orderBy].toString());
    }
    return bValue - aValue;
  }
  
  // Default string comparison
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

//hàm này nhận sự kiện sắp xếp và xem là tăng hay giảm
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

//tạo tiêu đề cột
const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'CUSTOMER NAME',
  },
  {
    id: 'company',
    numeric: false,
    disablePadding: false,
    label: 'COMPANY',
  },
  {
    id: 'orderValue',
    numeric: false,
    disablePadding: false,
    label: 'ORDER VALUE',
  },
  {
    id: 'orderDate',
    numeric: false,
    disablePadding: false,
    label: 'ORDER DATE',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'STATUS',
  }
];


function EnhancedTableHead(props) {

  


  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

//phụ
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};


function EnhancedTableToolbar(props) {
  const { numSelected, selectedIds, handleDelete, searchTerm, onSearch } = props;
  
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <>
          <Typography
            sx={{ flex: '0 0 auto', mr: 2 }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Customer Management
          </Typography>
          <Box sx={{ 
            flex: '1 1 auto',
            position: 'relative',
            borderRadius: 1,
            backgroundColor: alpha('#f5f5f5', 0.15),
            '&:hover': { backgroundColor: alpha('#f5f5f5', 0.25) },
            border: '1px solid #ddd',
            ml: 1, mr: 1
          }}>
            <Box sx={{ 
              padding: '0 12px', 
              height: '100%', 
              position: 'absolute', 
              display: 'flex', 
              alignItems: 'center'
            }}>
              <SearchIcon />
            </Box>
            <InputBase
              sx={{ ml: 4, flex: 1, width: '100%', padding: '8px 8px 8px 0' }}
              placeholder="Search customers..."
              value={searchTerm}
              onChange={onSearch}
            />
          </Box>
        </>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete selected customers">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

//css
EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selectedIds: PropTypes.array,
  handleDelete: PropTypes.func,
  searchTerm: PropTypes.string,
  onSearch: PropTypes.func,
};

export default function EnhancedTable({customersProps, onRefreshNeeded}) {
  // Remove console log that might cause issues
  // console.log("Con nhận được" + customersProps)
  
  const rows = (customersProps || []).map((customer) => (
    createData(
      customer.id,
      customer.avatar,
      customer.customerName,
      customer.company,
      customer.orderValue,
      customer.orderDate,
      customer.status
    )
  ));

  

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [selectedCustomer, setSelectedCustomer] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const [searchTerm, setSearchTerm] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  // SỰ KIỆN MỞ MODAL
  const handleClickOpenModal = (customer) => {
    setSelectedCustomer(customer);
    setOpenModal(true);
  }

  const handleClickCloseModal = (shouldRefresh = false) => {
    setOpenModal(false);
    if (shouldRefresh && onRefreshNeeded) {
      onRefreshNeeded();
    }
  }

  // Search functionality
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  // Filter rows by search term
  const filteredRows = React.useMemo(() => {
    if (!searchTerm.trim()) return rows;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    return rows.filter((row) => 
      row.name.toLowerCase().includes(lowerSearchTerm) ||
      row.company.toLowerCase().includes(lowerSearchTerm) ||
      row.status.toLowerCase().includes(lowerSearchTerm)
    );
  }, [rows, searchTerm]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...filteredRows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredRows, order, orderBy, page, rowsPerPage],
  );

  const handleDeleteSelected = async () => {
    try {
      // Create a copy of selected to prevent issues during async operation
      const selectedToDelete = [...selected];
      
      // Confirm deletion
      if (!window.confirm(`Are you sure you want to delete ${selectedToDelete.length} customer(s)?`)) {
        return;
      }
      
      // Delete all selected customers sequentially
      for (const id of selectedToDelete) {
        await fetch(`http://localhost:3001/customer/${id}`, {
          method: 'DELETE',
        });
      }
      
      // Reset selection after deletion
      setSelected([]);
      
      // Refresh data
      if (onRefreshNeeded) {
        onRefreshNeeded();
      }
    } catch (error) {
      console.error('Error deleting customers:', error);
      alert('Failed to delete some customers. Please try again.');
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
          numSelected={selected.length} 
          selectedIds={selected}
          handleDelete={handleDeleteSelected}
          searchTerm={searchTerm}
          onSearch={handleSearch}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow 
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <img src={row.avatar ? `/${row.avatar}` : "/Avatar (4).png"} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                      {row.company}
                    </TableCell>
                    <TableCell align="left">{row.orderValue}</TableCell>
                    <TableCell align="left">{row.orderDate}</TableCell>
                    <TableCell align="left">
                      <span className={`status${row.status}`}>{row.status}</span>
                    </TableCell>
                    <TableCell>
                      <Button 
                        className="editIcon" 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row selection when clicking edit
                          handleClickOpenModal(row);
                        }}
                      >
                        <img src="/create.png" alt="Edit" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <UpdateCustomerModal 
          open={openModal} 
          customer={selectedCustomer} 
          close_method={handleClickCloseModal} 
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense}  />}
        label="Dense padding"
      />
    </Box>
  );
  
}


