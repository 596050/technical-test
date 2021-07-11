import { ChangeEventHandler } from 'react'
import { StyledComponentProps, withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const styles = () => ({
  textField: {
    width: '100%',
  },
})

const SearchField = (
  props: StyledComponentProps & {
    onSearch: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
  }
) => {
  const { classes, onSearch } = props
  return (
    <form noValidate autoComplete="off">
      <TextField
        id="outlined-search"
        label="Search Users"
        type="search"
        className={classes?.textField}
        margin="normal"
        variant="outlined"
        onChange={onSearch}
      />
    </form>
  )
}

export default withStyles(styles)(SearchField)
