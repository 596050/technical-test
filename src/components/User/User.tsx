import {
  createStyles,
  StyledComponentProps,
  withStyles,
} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import defaultProfileImage from '../../assets/default-profile.png'

const styles = () =>
  createStyles({
    card: {
      maxWidth: '300px',
      minHeight: '120px',
      width: '280px',
      margin: '15px',
      position: 'relative',
    },
    cardActions: {
      justifyContent: 'center',
    },
    cover: {
      width: '20%',
      position: 'absolute',
      right: '5px',
      top: '5px',
      margin: '5px',
      userSelect: 'none',
    },
    content: {
      display: 'inline-block',
      userSelect: 'none',
    },
    userName: {
      width: 'calc(100% - 50px)',
      overflowWrap: 'break-word',
      display: 'inline-block',
      position: 'absolute',
      top: '5px',
      left: '5px',
      margin: '5px',
      userSelect: 'none',
    },
    button: {
      position: 'absolute',
      bottom: '5px',
    },
  })

type Props = StyledComponentProps & {
  canCreate: boolean
  userName: string
}

const User = ({ userName, canCreate, classes }: Props) => {
  return (
    <Card className={classes?.card}>
      <CardContent className={classes?.content}>
        <span className={classes?.userName}>{userName}</span>
        <img
          className={classes?.cover}
          src={defaultProfileImage}
          alt="profile"
        />
      </CardContent>
      <CardActions className={classes?.cardActions}>
        <Button className={classes?.button} disabled={!canCreate} size="small">
          Create User
        </Button>
      </CardActions>
    </Card>
  )
}

export default withStyles(styles)(User)
