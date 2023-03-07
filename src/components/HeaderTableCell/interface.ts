export interface IHeaderTableCell {
  chosenSortingField: string
  setChosenSortingField: (arg: string) => void
  setChosenSortingWay: (arg?: 'asc' | 'desc') => void
  field: string
  children: React.ReactNode
}
