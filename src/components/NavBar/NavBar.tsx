import { ReactNode } from 'react'
import {
  createStyles,
  StyledComponentProps,
  withStyles,
} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import logo from '../../assets/logo512.png'

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appLogo: {
      height: '3em',
      padding: '5px',
      verticalAlign: 'middle',
    },
    nav: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '0px',
    },
    title: {
      fontWeight: 'bold',
      width: '100%',
      textAlign: 'center',
    },
    logodiv: {
      position: 'absolute',
    },
    imageLink: {
      cursor: 'pointer',
    },
  })

const NavBar = (
  props: StyledComponentProps & {
    title: ReactNode
  }
) => {
  const { classes } = props
  return (
    <AppBar className={classes?.root} position="static" color="default">
      <Toolbar className={classes?.nav}>
        <div className={classes?.logodiv}>
          <a className={classes?.imageLink} href="/">
            <img className={classes?.appLogo} src={logo} alt="Logo" />
          </a>
        </div>
        <Typography className={classes?.title} variant="h6" color="inherit">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default withStyles(styles)(NavBar)
