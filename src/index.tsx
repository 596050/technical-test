import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import reportWebVitals from './reportWebVitals'
import ErrorBoundary from './components/HOC/ErrorBoundary/ErrorBoundary'
import App from './App'
import './index.css'

const client = new ApolloClient({
  uri: process.env.REACT_APP_SERVER_BASE_URL,
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </ApolloProvider>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
