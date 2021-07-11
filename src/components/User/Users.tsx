import { ChangeEvent, useState } from 'react'
import {
  createStyles,
  StyledComponentProps,
  withStyles,
} from '@material-ui/core/styles'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Search from '../Search/Search'
import UserGrid from './UserGrid'

const styles = () =>
  createStyles({
    formControl: {
      backgroundColor: '#55c3ff75',
      width: '100%',
      textAlign: 'center',
    },
    options: {
      display: 'inline-block',
      width: '100%',
    },
    panel: {
      width: '100%',
    },
    selection: {
      padding: '8px',
    },
  })

enum ROLE {
  ADMIN = 'Admin',
  MARKETING = 'Marketing',
  RECRUITMENT = 'Recruitment',
}

type Props = StyledComponentProps & {}

const Users = (props: Props) => {
  const [state, setState] = useState({
    userRole: ROLE.ADMIN.toUpperCase(),
    searchName: '',
  })

  const onChangeSearch = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({
      ...state,
      searchName: event.target.value,
    })
  }

  const onChangeSelect = (
    event: ChangeEvent<{
      name?: string | undefined
      value: unknown
    }>
  ) => {
    setState({
      ...state,
      userRole: event.target.value as ROLE,
    })
  }

  const { classes } = props

  return (
    <div className={classes?.panel}>
      <div className={classes?.options}>
        <Search onSearch={onChangeSearch} />
        <FormControl className={classes?.formControl}>
          <InputLabel htmlFor="user-role">Please Select User Role</InputLabel>
          <Select
            native
            value={state.userRole}
            onChange={onChangeSelect}
            inputProps={{
              name: 'userRole',
              id: 'user-role',
            }}
            className={classes?.selection}
          >
            <option value={ROLE.ADMIN.toUpperCase()}>{ROLE.ADMIN}</option>
            <option value={ROLE.MARKETING.toUpperCase()}>
              {ROLE.MARKETING}
            </option>
            <option value={ROLE.RECRUITMENT.toUpperCase()}>
              {ROLE.RECRUITMENT}
            </option>
          </Select>
        </FormControl>
      </div>
      <UserGrid userRole={state.userRole} searchName={state.searchName} />
    </div>
  )
}

export default withStyles(styles)(Users)
