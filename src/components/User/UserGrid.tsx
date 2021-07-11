import { useQuery } from '@apollo/client'
import {
  createStyles,
  StyledComponentProps,
  withStyles,
} from '@material-ui/core/styles'
import { GET_USERS } from '../../graphql/queries'
import User from './User'

const styles = () =>
  createStyles({
    root: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    userList: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      width: '100%',
      backgroundColor: '#F5F5F5',
      overflowY: 'scroll',
      justifyContent: 'center',
    },
    genericText: {
      textAlign: 'center',
      width: '100%',
      justifyContent: 'center',
    },
    gridItem: {
      display: 'flex',
      justifyContent: 'center',
    },
  })

type Props = StyledComponentProps & {
  userRole: string
  searchName: string
}

const UserGrid = (props: Props) => {
  const { classes } = props
  const { loading, error, data } = useQuery(GET_USERS, {
    variables: {
      role: props.userRole,
      searchName: props.searchName,
    },
    errorPolicy: 'all',
  })

  return (
    <div className={classes?.root}>
      {loading ? (
        <p className={classes?.genericText}>Loading...</p>
      ) : error ? (
        <p className={classes?.genericText}>Error! {error.message}</p>
      ) : (
        <div className={classes?.userList}>
          {data.users.length === 0 ? (
            <p className={classes?.genericText}>No users found</p>
          ) : (
            data.users.map((user: any) => {
              return (
                <User
                  userName={user.name}
                  canCreate={user.permissions.createUser}
                  key={`${user?.id}${user?.name}${user?.createdAt}`}
                />
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default withStyles(styles)(UserGrid)
