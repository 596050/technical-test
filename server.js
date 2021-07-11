const USERS = require('./server/USERS.json')
const { ApolloServer } = require('apollo-server')
const _ = require('lodash')

const nestedSort = (p) => (e1, e2) => {
  const a = e1[p],
    b = e2[p]
  return a < b ? -1 : a > b ? 1 : 0
}

const filterUsers = (role, searchName) => {
  return USERS.filter((user) => {
    if (!searchName) {
      return user.role.indexOf(role) > -1
    }
    if (user.name) {
      return (
        user.role.indexOf(role) > -1 &&
        user.name
          .toLowerCase()
          .replaceAll(/\s/g, '')
          .includes(searchName.toLowerCase())
      )
    }
    return null
  }).sort(nestedSort('name'))
}

const typeDefs = `
type Query {
    users(role: String, searchName: String): [User]
    hasPermission(userId: String, permissions: [HasPermissions]): [User]
  }

  input HasPermissions {
    departmentId: String
    permissionsType: String
  }

	type User {
    id: String!
    name: String!
    role: [Role]!
    createdAt: String
    permissions: Permissions
  }

  type Permission {
    id: String
    departmentId: String
    get: Boolean
    create: Boolean
    update: Boolean
    delete: Boolean
  }

  type Permissions {
    user: [Permission]
    content: [Permission]
  }
  
  enum Role {
    ADMIN
    MARKETING
    RECRUITMENT
  }
`

const resolvers = {
  Query: {
    users: async (_, { role, searchName }) => {
      try {
        if (role) {
          return filterUsers(role, searchName)
        }
        return USERS
      } catch (e) {
        console.error(e)
        return null
      }
    },
    hasPermission: async (_, { userId, permissions }) => {
      try {
        const res = USERS.find((user) => user.id === userId)
        if (res?.permissions) {
          const users = res.permissions.filter((a) => {
            return (
              permissions?.findIndex((up) => {
                return a[up.permissionsType]?.departmentId === up?.departmentId
              }) > -1
            )
          })
          console.log('users', users)
          return users
        }
        return null
      } catch (e) {
        console.error(e)
        return null
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`)
})
