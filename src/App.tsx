import { useEffect } from 'react'
import { Snackbar } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useActions } from './hooks'
import { useTypeSelector } from './hooks'
import { Layout, Preloader } from './components'
import { AuthorizationPage, CategoryPage, ProductsPage, PickUpPointsPage } from './pages'

const App = () => {
  const { isAuth, isLoading, error, openSnack } = useTypeSelector((state) => state.admin)
  const { checkAuth } = useActions()

  useEffect(() => {
    checkAuth()
  }, [isAuth])

  if (isLoading) {
    return <Preloader />
  }
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnack}
        autoHideDuration={10}
        message={error}
      />

      {isAuth ? (
        <Routes>
          <Route path="/main/" element={<Layout />}>
            <Route path="categories" element={<CategoryPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="pickupPoint" element={<PickUpPointsPage />} />
            <Route path="statistics" element={<Layout />} />
          </Route>
          <Route path="/*" element={<Navigate to="/main" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="*" element={<AuthorizationPage />} />
        </Routes>
      )}
    </>
  )
}
export default App
