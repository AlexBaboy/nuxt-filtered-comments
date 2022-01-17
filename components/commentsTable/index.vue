<template>
  <div>
    <div class="clear-filter">
      <button type="button" class="btn btn-dark" @click="clearFilter">Очистить все фильтры</button>
    </div>
    <table class="table comments-table table-striped table-sm table-responsive-sm">
      <thead class="thead-dark">
      <tr>
        <th scope="col"><div>PostId <span><input type="text" name="postId-filter" placeholder="filter by PostId" v-model="postId"/></span></div> </th>
        <th scope="col"><div>Id <span><input type="text" name="id-filter" placeholder="filter by Id" v-model="id"/></span></div> </th>
        <th scope="col"><div>Name <span><input type="text" name="name-filter" placeholder="filter by Name" v-model="name"/></span></div> </th>
        <th scope="col"><div>Email <span><input type="text" name="email-filter" placeholder="filter by Email" v-model="email"/></span></div> </th>
        <th scope="col"><div>Body <span><input type="text" name="body-filter" placeholder="filter by Body" v-model="body"/></span></div> </th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="comment in filteredComments"
        :key="comment.id"
      >
        <td>{{ comment.postId }}</td>
        <td>{{ comment.id }}</td>
        <td>{{ comment.name }}</td>
        <td>{{ comment.email }}</td>
        <td>{{ comment.body.substring(0,99) }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'commentsTable',
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      postId: '',
      id: '',
      name: '',
      email: '',
      body: '',
      filteredComments: this.$props.comments,
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
    // отфильтровать список !
    this.filteredComments = this.getFilteredComments(this.$props.comments, this.activeFilter)
    // заполнить поля гет параметрами !
    this.setDefaultValuesFromRoute(this.activeFilter)
  },
  methods: {

    ...mapActions('filters', [
      'changeFilterStore'
    ]),

    changeFilter (filterName, filterValue) {
      if (!filterName && !filterValue) {
        this.activeFilter = {}
      }

      if (filterName && !filterValue) {
        delete this.activeFilter[filterName]
      }
      if (filterName && filterValue) {
        this.activeFilter[filterName] = filterValue
      }

      if (!Object.keys(this.activeFilter).length) {
        this.filteredComments = this.$props.comments
      } else {
        this.filteredComments = this.getFilteredComments(this.$props.comments, this.activeFilter)
      }
      // записать активный фильтр в стор
      this.changeFilterStore(this.activeFilter)
      this.$router.push({ path: '', query: this.activeFilter })
    },
    getFilteredComments (comments, activeFilter) {
      if (!comments || !activeFilter) {
        return
      }
      return comments.filter((item) => {
        let checkedConditions = 0
        Object.keys(activeFilter).forEach((key, index) => {
          if (item[key].toString().toLowerCase().includes(activeFilter[key].toString().toLowerCase())) {
            checkedConditions++
          }
        })
        return checkedConditions === Object.keys(activeFilter).length
      })
    },
    setDefaultValuesFromRoute (activeFilter) {
      if (!activeFilter) {
        return
      }
      Object.keys(activeFilter).forEach((key) => {
        this[key] = activeFilter[key]
      })
    },
    clearFilter () {
      Object.keys(this.activeFilter).forEach((key) => {
        this[key] = ''
      })
      this.changeFilter()
    }
  },
  watch: {
    postId (val) {
      this.changeFilter('postId', val)
    },
    id (val) {
      this.changeFilter('id', val)
    },
    name (val) {
      this.changeFilter('name', val)
    },
    email (val) {
      this.changeFilter('email', val)
    },
    body (val) {
      this.changeFilter('body', val)
    }
  }
}
</script>

<style scoped>

.comments-table {
  margin: 2rem auto;
  width: 100%;
  font-family: "Roboto Light",sans-serif;
}

.comments-table thead {
  text-align: center;
}

.comments-table thead th div {
  display: flex;
  gap: 1rem;
  align-items: center;
}

</style>
