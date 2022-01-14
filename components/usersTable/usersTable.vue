<template>
  <div>
    <table class="users-table">
      <thead>
        <tr>
          <th>Name <span><input type="text" name="name-filter" placeholder="filter by name" v-model="name"/></span> </th>
          <th>UserName <span><input type="text" name="username-filter" placeholder="filter by username" v-model="username"/></span> </th>
          <th>Email <span><input type="text" name="email-filter" placeholder="filter by email" v-model="email"/></span> </th>
          <th>Website <span><input type="text" name="website-filter" placeholder="filter by website" v-model="website"/></span> </th>
          <th>Address <span><input type="text" name="address-filter" placeholder="filter by address" v-model="address"/></span> </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in filteredUsers"
          :key="user.id"
        >
          <td>
            <nuxt-link :to="`users/${ user.id }`">{{ user.name }}</nuxt-link>
          </td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.website }}</td>
          <td>{{ `${user.address.city}, ${user.address.street}, ${user.address.suite}` }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'usersTable',
  props: {
    users: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      name: '',
      username: '',
      email: '',
      website: '',
      address: '',
      filteredUsers: this.$props.users,
      activeFilter: {}
    }
  },
  computed: {
    ...mapGetters('filters', [
      'activeFilterStore'
    ]),
    filterFromRoute () {
      Object.keys(this.$route.query).forEach((key, index) => {
        this.activeFilter[key] = this.$route.query[key]
      })
      return this.activeFilter
    }
  },
  created () {
    // получить параметры фильтра из роута или из стора !
    this.activeFilter = this.filterFromRoute || this.activeFilterStore || {}
    // записать активный фильтр в стор
    this.changeFilterStore(this.activeFilter)
    // отфильтровать пользователей !
    this.filteredUsers = this.getFilteredUsers(this.$props.users, this.activeFilter)
    // заполнить поля гет параметрами !
    this.setDefaultValuesFromRoute(this.activeFilter)
  },
  methods: {

    ...mapActions('filters', [
      'changeFilterStore'
    ]),

    changeFilter (filterName, filterValue) {
      if (filterName && !filterValue) {
        delete this.activeFilter[filterName]
      }
      if (filterName && filterValue) {
        this.activeFilter[filterName] = filterValue
      }

      if (!Object.keys(this.activeFilter).length) {
        this.filteredUsers = this.$props.users
      } else {
        this.filteredUsers = this.getFilteredUsers(this.$props.users, this.activeFilter)
      }
      // записать активный фильтр в стор
      this.changeFilterStore(this.activeFilter)
      this.$router.push({ path: '', query: this.activeFilter })
    },
    getFilteredUsers (users, activeFilter) {
      if (!users || !activeFilter) {
        return
      }
      return users.filter((item) => {
        let checkedConditions = 0
        Object.keys(activeFilter).forEach((key, index) => {
          if (key === 'address') {
            if (item[key].city.toLowerCase().includes(activeFilter[key].toLowerCase()) ||
              item[key].street.toLowerCase().includes(activeFilter[key].toLowerCase()) ||
              item[key].suite.toLowerCase().includes(activeFilter[key].toLowerCase())
            ) {
              checkedConditions++
            }
          } else {
            /* eslint-disable no-lonely-if */
            if (item[key].toLowerCase().includes(activeFilter[key].toLowerCase())) {
              checkedConditions++
            }
          }
        })
        return checkedConditions === Object.keys(activeFilter).length
      })
    },
    setDefaultValuesFromRoute (activeFilter) {
      if (!activeFilter) {
        return
      }
      //
      Object.keys(activeFilter).forEach((key) => {
        this[key] = activeFilter[key]
      })
    }
  },
  watch: {
    name (val) {
      this.changeFilter('name', val)
    },
    username (val) {
      this.changeFilter('username', val)
    },
    email (val) {
      this.changeFilter('email', val)
    },
    website (val) {
      this.changeFilter('website', val)
    },
    address (val) {
      this.changeFilter('address', val)
    }
  }
}
</script>

<style scoped>

.users-table {
  margin: 2rem auto;
  width: 100%;
  font-family: "Roboto Light",sans-serif;
}

.users-table thead {
  text-align: left;
}

</style>
