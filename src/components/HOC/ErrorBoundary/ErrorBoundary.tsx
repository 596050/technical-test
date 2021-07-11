import { Component, ErrorInfo } from 'react'
import { StyledComponentProps, withStyles } from '@material-ui/core/styles'

const styles = {
  errorMessage: {
    justifyContent: 'center',
  },
}

type Props = StyledComponentProps & {}
type State = {
  hasError: boolean
  errorMessage?: Error
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch = (error: Error, errorInfo: ErrorInfo) => {
    this.setState({ hasError: true, errorMessage: error })
    console.error(errorInfo, error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1 className={this.props.classes?.errorMessage}>
          {this.state.errorMessage}
        </h1>
      )
    } else {
      return this.props.children
    }
  }
}

export default withStyles(styles)(ErrorBoundary)
