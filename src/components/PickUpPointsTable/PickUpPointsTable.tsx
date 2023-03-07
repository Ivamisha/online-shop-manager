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
import { HeaderTableCell } from '..'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import { IPickUpPointsTable } from './interface'
import { pickupPointTableHead } from '../../constants'
import { useTypeSelector } from '../../hooks'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { IProductsDate } from '../../models/redux'
import { IPickUpPointDate } from '../../models/redux/interfaces'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'

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
      maxWidth: '10px',
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
  tableRow: {
    '&.MuiTableRow-root': {
      background: 'gray',
    },
  },
  headerTableCell: {
    '&.MuiTableCell-root': {
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  },
  mapTableCell: {
    '&.MuiTableCell-root': {
      cursor: 'pointer',
    },
  },
}))

const PickUpPointsTable: FC<IPickUpPointsTable> = ({
  setIsModalShowMap,
  chosenSortingField,
  setChosenSortingField,
  setChosenSortingWay,
  setIsModalUpdatePickUpPointOpen,
  setIsModalHidePickUpPointOpen,
  setChosenPickUpPoint,
  pickUpPointTablePage,
  rowsPerPage,
  setPickUpPointTablePage,
  setRowsPerPage,
}) => {
  const classes = useStyles()
  const { pickUpPoints, amount } = useTypeSelector((state) => state.pickUpProduct)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPickUpPointTablePage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPickUpPointTablePage(1)
  }

  const handleOpenModalForUpdate = (pickUpPoint: IPickUpPointDate) => {
    setIsModalUpdatePickUpPointOpen(true)
    setChosenPickUpPoint(pickUpPoint)
  }

  const handleOpenModalForHide = (pickUpPoint: IPickUpPointDate) => {
    setIsModalHidePickUpPointOpen(true)
    setChosenPickUpPoint(pickUpPoint)
  }

  const handleOpenMap = (pickUpPoint: IPickUpPointDate) => {
    setChosenPickUpPoint(pickUpPoint)
    setIsModalShowMap(true)
  }

  return (
    <Paper sx={{ width: '100%', mt: 10 }}>
      <TableContainer className={classes.tableContainer} sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.headTable}>
              <TableCell align="center" className={classes.headerTableCell}>
                <AddLocationAltIcon />
              </TableCell>
              {pickupPointTableHead.map((title, index) => (
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
            {pickUpPoints?.map((pickUpPoint) => (
              <TableRow
                className={!pickUpPoint.shown ? classes.tableRow : undefined}
                key={pickUpPoint.id}
                sx={{ maxHeight: 700 }}
              >
                <TableCell
                  className={classes.mapTableCell}
                  align="center"
                  onClick={() => handleOpenMap(pickUpPoint)}
                >
                  Показать на карте
                </TableCell>

                <TableCell align="center">{pickUpPoint.address}</TableCell>

                <TableCell align="center">{pickUpPoint.description}</TableCell>

                <TableCell align="center">{pickUpPoint.workingHours}</TableCell>

                <TableCell align="center">
                  <Moment format="DD.MM.YYYY">{pickUpPoint.createdAt}</Moment>
                </TableCell>

                <TableCell align="center">
                  <Moment format="DD.MM.YYYY">{pickUpPoint.updatedAt}</Moment>
                </TableCell>

                <TableCell align="center">
                  <IconButton onClick={() => handleOpenModalForUpdate(pickUpPoint)}>
                    <BorderColorIcon />
                  </IconButton>

                  <IconButton>
                    <DeleteIcon onClick={() => handleOpenModalForHide(pickUpPoint)} />
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
        page={pickUpPointTablePage}
        labelRowsPerPage="Кол-во пунктов"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
export default PickUpPointsTable
