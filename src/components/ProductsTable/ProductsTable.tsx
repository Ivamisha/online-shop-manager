import { FC } from 'react'
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
import { HeaderTableCell } from '../'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import DeleteIcon from '@mui/icons-material/Delete'
import { IProductTableProps } from './interface'
import { productsTableHead } from '../../constants'
import { useTypeSelector } from '../../hooks'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { IProductsDate } from '../../models/redux'

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
    },
  },
}))

const ProductsTable: FC<IProductTableProps> = ({
  chosenSortingField,
  setChosenSortingField,
  setChosenSortingWay,
  setIsModalUpdateProductOpen,
  setIsModalHideProductOpen,
  setChosenProduct,
  productTablePage,
  rowsPerPage,
  setProductTablePage,
  setRowsPerPage,
}) => {
  const classes = useStyles()
  const { products, amount } = useTypeSelector((state) => state.products)

  const handleChangePage = (event: unknown, newPage: number) => {
    setProductTablePage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setProductTablePage(1)
  }

  const handleOpenModalForUpdate = (products: IProductsDate) => {
    setIsModalUpdateProductOpen(true)
    setChosenProduct(products)
  }

  const handleOpenModalForHide = (products: IProductsDate) => {
    setIsModalHideProductOpen(true)
    setChosenProduct(products)
  }

  return (
    <Paper sx={{ width: '100%', mt: 10 }}>
      <TableContainer className={classes.tableContainer} sx={{ maxHeight: 700 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow className={classes.headTable}>
              <TableCell align="center" className={classes.headerTableCell}>
                Фото
              </TableCell>
              {productsTableHead.map((title, index) => (
                <HeaderTableCell
                  chosenSortingField={chosenSortingField}
                  setChosenSortingField={setChosenSortingField}
                  setChosenSortingWay={setChosenSortingWay}
                  field={title?.sortField}
                  key={index}
                >
                  {`${title.name}`}
                </HeaderTableCell>
              ))}
              <TableCell align="center" className={classes.headerTableCell}>
                Управление
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody className={classes.tableMain}>
            {products?.map((product) => (
              <TableRow
                className={!product.shown ? classes.tableRow : undefined}
                key={product.id}
                sx={{ maxHeight: 700 }}
              >
                <TableCell component="th" scope="row" align="center">
                  <img
                    src={('/media/image/' + product.picture) as unknown as string}
                    alt={`productPircture`}
                    width="50px"
                    height="50px"
                  />
                </TableCell>

                <TableCell align="center">{product.name}</TableCell>

                <TableCell align="center">{product.category}</TableCell>

                <TableCell align="center">{product.price}</TableCell>

                <TableCell align="center">{product.quantity}</TableCell>

                <TableCell align="center">
                  <IconButton onClick={() => handleOpenModalForUpdate(product)}>
                    <BorderColorIcon />
                  </IconButton>

                  <IconButton>
                    <DeleteIcon onClick={() => handleOpenModalForHide(product)} />
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
        page={productTablePage}
        labelRowsPerPage="Кол-во продуктов"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
export default ProductsTable
