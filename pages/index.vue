<template>
  <div>
    <h1>Пользователи</h1>
    <users-table :users="users" />
  </div>
</template>

<script>

import UsersTable from '@/components/usersTable/usersTable'
export default {
  name: 'users',
  components: { UsersTable },
  async asyncData () {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json()
    return {
      users
    }
  },
  data () {
    return {
      users: []
    }
  }
}
</script>

<style scoped></style>
