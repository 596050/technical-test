import { Query } from 'react-apollo'
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
  return (
    <div className={classes?.root}>
      <Query
        query={GET_USERS}
        variables={{
          role: props.userRole,
          searchName: props.searchName,
        }}
        errorPolicy="all"
      >
        {(res: any) => {
          const { data, error, loading } = res
          return loading ? (
            <p className={classes?.genericText}>Loading...</p>
          ) : error ? (
            <p className={classes?.genericText}>Error! {error.message}</p>
          ) : (
            <div className={classes?.userList}>
              {/* Filter if user name is "" or null */}
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
          )
        }}
      </Query>
    </div>
  )
}

export default withStyles(styles)(UserGrid)
