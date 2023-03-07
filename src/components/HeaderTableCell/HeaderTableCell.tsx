import { FC, useEffect, useState } from 'react'
import type { IHeaderTableCell } from './interface'
import { TableCell, Theme, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp'

const useStyles = makeStyles((theme: Theme) => ({
  tableCell: {
    '&.MuiTableCell-root': {
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  },
}))

const HeaderTableCell: FC<IHeaderTableCell> = ({
  chosenSortingField,
  setChosenSortingField,
  children,
  field,
  setChosenSortingWay,
}) => {
  const classes = useStyles()
  const [sortWay, setSortWay] = useState<string>('')

  useEffect(() => {
    if (field !== chosenSortingField) {
      setSortWay('')
    }
  }, [chosenSortingField])

  const changeStateValue = () => {
    if (!sortWay) {
      setSortWay('asc')
      setChosenSortingWay('asc')
    }

    if (sortWay === 'asc') {
      setSortWay('desc')
      setChosenSortingWay('desc')
    }

    if (sortWay === 'desc') {
      setSortWay('')
      setChosenSortingWay(undefined)
    }
    setChosenSortingField(field)
  }

  return (
    <TableCell className={classes.tableCell} onClick={() => changeStateValue()} align="center">
      <Grid container flexDirection="row" alignItems="center" justifyContent="center">
        {children}
        {sortWay === 'asc' && <KeyboardDoubleArrowUpIcon />}
        {sortWay === 'desc' && <KeyboardDoubleArrowDownIcon />}
      </Grid>
    </TableCell>
  )
}
export default HeaderTableCell
