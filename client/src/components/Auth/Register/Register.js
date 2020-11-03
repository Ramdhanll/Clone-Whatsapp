import React from 'react'
import './Register.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
   root: {
      '& > *': {
         margin: theme.spacing(1),
         width: '25ch',
      },
   },
}));

function Register() {
   const classes = useStyles();

 {/* <TextField 
                           type="email"
                           name="email"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.email}
                           id="standard-secondary" 
                           label="Login" 
                           error={errors.email && touched.email && errors.email}
                           helperText={(errors.email && touched.email && errors.email) ? errors.email : null} 
                        />

                        <TextField 
                           type="password"
                           name="password"
                           onChange={handleChange}
                           onBlur={handleBlur}
                           value={values.password}
                           id="standard-secondary" 
                           label="Password" 
                           color="primary" 
                           error={errors.password && touched.password && errors.password}
                           helperText={(errors.password && touched.password && errors.password) ? errors.password : null}
                        /> */}
   return (
      <div className="register">
         <div className="register__header"></div>
         <div className="register__body">
         <form className={classes.root} noValidate autoComplete="off">
            <TextField id="standard-secondary" label="Standard secondary" color="secondary" />
            <TextField
            id="filled-secondary"
            label="Filled secondary"
            variant="filled"
            color="secondary"
            />
            <TextField
            id="outlined-secondary"
            label="Outlined secondary"
            variant="outlined"
            color="secondary"
            />
         </form>
         </div>
      </div>
   )
}

export default Register
