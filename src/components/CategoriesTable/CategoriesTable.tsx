import { FC } from 'react'
import Moment from 'react-moment'
import {
  TableContainer,
  IconButton,
  TableHead,
  Paper,
  TablePagination,
  Table,
  TableCell,
  TableBody,
  TableRow,
} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { categoryTableHead } from '../../constants'
import { useTypeSelector } from '../../hooks'
import type { ICategoryTable } from './inteface'
import type { ICategoryDate } from '../../models/redux'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { HeaderTableCell } from '../'

const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    '&.MuiTableContainer-root': {
      maxHeight: '70vh',
    },
  },
  headTable: {
    '& th': {
      borderTop: '1px solid black',
      borderBottom: '1px solid black',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      fontWeight: 'bold',
      '&:nth-child(1)': {
        borderTopLeftRadius: '10px',
        borderLeft: '1px solid black',
      },
    },
    '& th: lastChild': {
      borderTopRightRadius: '10px',
    },
  },
  pagination: {
    '&.MuiTablePagination-root': {
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
      borderBottom: '1px solid black',
    },
  },
  tableMain: {
    '&.MuiTableBody-root': {
      background: 'white',
      color: 'gray',
      border: '1px solid',
      borderRadius: '10px',
    },
  },
  headerTableCell: {
    '&.MuiTableCell-root': {
      fontWeight: 'bold',
    },
  },
}))

const CategoriesTable: FC<ICategoryTable> = ({
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  setIsModalUpdateOpen,
  setChosenCategory,
  chosenSortingField,
  setChosenSortingField,
  setChosenSortingWay,
}) => {
  const { categories, amount } = useTypeSelector((state) => state.categories)
  const classes = useStyles()

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const handleOpenModalForUpdate = (category: ICategoryDate) => {
    setIsModalUpdateOpen(true)
    setChosenCategory(category)
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer
        className={classes.tableContainer}
        sx={{
          maxHeight: 700,
          '&::-webkit-scrollbar': {
            width: '0.5vw',
            height: '0.5vh',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'black',
            borderRadius: '3px',
            border: '1px solid white',
          },
        }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.headTable}>
              {categoryTableHead.map((title, index) => (
                <HeaderTableCell
                  chosenSortingField={chosenSortingField}
                  setChosenSortingField={setChosenSortingField}
                  setChosenSortingWay={setChosenSortingWay}
                  field={title?.sortField}
                  key={index}
                >
                  {title.name}
                </HeaderTableCell>
              ))}
              <TableCell align="center" className={classes.headerTableCell}>
                Управление
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className={classes.tableMain}>
            {categories?.map((category) => (
              <TableRow
                hover
                key={category.id}
                sx={{
                  maxHeight: 700,
                }}
              >
                <TableCell component="th" scope="row" align="center">
                  {category.title}
                </TableCell>

                <TableCell align="center">{category.description}</TableCell>

                <TableCell align="center">{`${category.shown}`}</TableCell>

                <TableCell align="center">
                  <Moment format="DD.MM.YYYY">{category.createdAt}</Moment>
                </TableCell>

                <TableCell align="center">
                  <Moment format="DD.MM.YYYY">{category.updatedAt}</Moment>
                </TableCell>

                <TableCell align="center">
                  <IconButton onClick={() => handleOpenModalForUpdate(category)}>
                    <BorderColorIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 15]}
        component="div"
        className={classes.pagination}
        count={amount}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="Страница"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
export default CategoriesTable
