import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { visuallyHidden } from '@mui/utils';
import headerContext from '../contexts/header/headerContext';
import userContext from '../contexts/user/userContext';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import alertContext from '../contexts/alert/alertContext';
import bookContext from '../contexts/book/bookContext';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Book Name',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'category',
    numeric: false,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: '',
  }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}
  
function getComparator(order, orderBy) {
return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
} 

export default function Books() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [page, setPageNo] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [maxPage, setMaxPage] = React.useState(0);
  const [searchParam, setSearchParam] = React.useState('');

  const navigate = useNavigate();

  const {setPage} = useContext(headerContext);
  const {user, users, userItems, setUserItems, searchUser, deleteUserInfo} = useContext(userContext);
  const {books, setBooks, bookDetails, getBooks, deleteBookInfo} = useContext(bookContext);
  const {showDialog, setShowDialog, isOk, setIsOk} = useContext(alertContext);

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {headCell.label !== '' ?
                  <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={createSortHandler(headCell.id)}
                      sx={{fontWeight: 'bold'}}
                  >
                      {headCell.label}
                      {orderBy === headCell.id ? (
                          <Box component="span" sx={visuallyHidden}>
                          {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                          </Box>
                      ) : null}
                  </TableSortLabel>
                  :<></>
              }
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPageNo(newPage);
    console.log(newPage, maxPage);
    if(newPage+1 > maxPage) {
        setMaxPage(newPage+1);
        getBooks(newPage+1, rowsPerPage, searchParam);
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  
  useEffect(() => {
    setPage("");
    setPageNo(0);
    setMaxPage(0);
    setBooks([]);
    getBooks(1, 5, '');
  },[])
  
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookDetails.totalItems) : 0;

  const handleSearch = (e) => {
    setSearchParam(e.target.value);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setPageNo(0);
      setMaxPage(0);
      setBooks([]);
      getBooks(1, rowsPerPage, searchParam)
    }, 500);
    return () => clearTimeout(timer);
  },[searchParam, rowsPerPage])

  const handleDelete = (name, id) => {
    setShowDialog({
      message: `Book called '${name}'`,
      id: id
    });
  }

  useEffect(() => {
    if(isOk) {
      console.log("isOk", true);
      deleteBookInfo(showDialog.id, rowsPerPage, searchParam);
      setIsOk(false);
      setShowDialog({
        message: '',
        id: -1
      });
      setPageNo(0);
      setMaxPage(0);
    }
    console.log("isOk", false);
  },[isOk]);

  return (
    <div className='main'>
      <div className="title">
          <h2 style={{display: 'inline-block', textAlign: 'center', borderBottom: '3px solid tomato', paddingBottom: 25}}>Books</h2>
      </div>
      <div className="container">
        <div className="row">
            <div className="col-md-1"></div>
            <div className="col-md-10">
              <div className="row">
                <div className="col-md-6">
                  <TextField variant='outlined' className='mb-4' sx={{width: 300}} onChange={(e) => handleSearch(e)} placeholder='Search Book' size='small'/>
                </div>
                <div className="col-md-6 text-end md:text-center">
                  <Button sx={{bgcolor: '#f14d54', width: 150}} onClick={() => navigate('/add-book')} color='error' variant="contained">Add Book</Button>
                </div>
              </div>
                <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                    >
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={bookDetails.totalItems}
                        />
                        <TableBody>
                        {books && stableSort(books, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.id}
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.price}</TableCell>
                                    <TableCell>{row.category}</TableCell>
                                    <TableCell align='right'>
                                      <Button variant="outlined" color='success' sx={{textTransform: 'none'}} onClick={() => navigate(`/edit-book/${row.id}`)} size='small'>Edit</Button>
                                      <Button variant="outlined" color='error' size='small' sx={{ml: 2, textTransform: 'none'}} onClick={() => handleDelete(row.name, row.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow
                              style={{
                                  height: 63 * emptyRows,
                              }}
                            >
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={bookDetails.totalItems}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                
                </Box>
            </div>
            <div className="col-md-1"></div>
        </div>
      </div>
    </div>
  );
}