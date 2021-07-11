import gql from 'graphql-tag'

const GET_USERS = gql`
  query ($role: String!, $searchName: String!) {
    users(role: $role, searchName: $searchName) {
      name
      role
      createdAt
      permissions {
        user {
          id
          get
          create
          update
          delete
        }
      }
    }
  }
`

const HAS_PERMISSION = gql`
  query ($userId: String!, $permissions: [HasPermissions!]) {
    hasPermission(userId: $userId, permissions: $permissions) {
      name
      role
      createdAt
      permissions {
        user {
          id
          get
          create
          update
          delete
        }
        content {
          id
          get
          create
          update
          delete
        }
      }
    }
  }
`

export { GET_USERS, HAS_PERMISSION }
