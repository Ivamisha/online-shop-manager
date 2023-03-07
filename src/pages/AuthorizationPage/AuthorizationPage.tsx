import { FC } from 'react'
import { TextField, Button, Typography, Grid, Box, Snackbar, Theme } from '@mui/material'
import { useActions, useTypeSelector } from '../../hooks'
import { makeStyles } from '@mui/styles'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { ILoginFormInputs } from './interface'
import { logo } from '../../img'
import { inputForLogin } from '../../constants'
import { autohrizationScheme } from '../../helpers/validator'

const useStyles = makeStyles((theme: Theme) => ({
  background: {
    '&.MuiGrid-root': {
      background: theme.palette.primary.blue,
    },
  },
  button: {
    '&.MuiButton-root': {
      display: 'flex',
      width: '70%',
      margin: '0 auto',
      marginTop: '1rem',
      background: theme.palette.primary.main,
      color: theme.palette.secondary.main,
    },
  },
  h1: {
    '&.MuiTypography-root': {
      fontSize: 40,
      color: theme.palette.primary.main,
      fontWeight: '700',
    },
  },
  validationtext: {
    '&.MuiTypography-root': {
      fontSize: 15,
    },
  },
  gridMainText: {
    '&.MuiGrid-root': {
      flexBasis: '95%',
      maxWidth: '95%',
    },
  },
  gridFormStyle: {
    '&.MuiGrid-root': {
      backgroundColor: theme.palette.primary.darkBlue,
      color: theme.palette.primary.main,
    },
  },
}))

const defaultValues = {
  email: '',
  password: '',
}

const AuthorizationPage: FC = () => {
  const { login } = useActions()
  const classes = useStyles()

  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    login(data.email, data.password)
  }

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(autohrizationScheme),
    defaultValues,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container justifyContent="center" height="100vh" className={classes.background}>
        <Grid
          container
          alignSelf="center"
          justifyContent="center"
          borderRadius="1.5rem"
          width="40vw"
          height="40vh"
          minHeight="40vh"
          className={classes.gridFormStyle}
        >
          <Grid item md={12}>
            <Typography textAlign="center" className={classes.h1} component="h1">
              Авторизация
            </Typography>
          </Grid>

          <Grid item md={8} justifyContent="center" className={classes.gridMainText}>
            <Grid container justifyContent="center">
              <Grid item xs={5} alignItems="center">
                <Box
                  component="img"
                  sx={{
                    height: 150,
                    width: 150,
                  }}
                  alt="logo"
                  src={logo}
                />
              </Grid>

              <Grid item xs={7}>
                {inputForLogin.map(({ label, inputName, type }, index) => (
                  <Box key={`input ${index}`}>
                    <Controller
                      name={inputName}
                      control={control}
                      render={({ field }) => (
                        <TextField
                          label={label}
                          variant="filled"
                          size="small"
                          color="primary"
                          type={type}
                          margin="dense"
                          error={!!errors[inputName]}
                          fullWidth
                          helperText={errors[inputName] ? errors[inputName]?.message : null}
                          {...field}
                        />
                      )}
                    />
                  </Box>
                ))}

                <Button className={classes.button} type="submit" variant="contained">
                  Войти
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}
export default AuthorizationPage
