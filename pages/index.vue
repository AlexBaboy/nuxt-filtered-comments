<template>
  <div>
    <h1>Комментарии</h1>
    <comments-table :comments="comments" />
  </div>
</template>

<script>
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import CommentsTable from '@/components/commentsTable/'
Vue.use(BootstrapVue)

export default {
  name: 'comments',
  components: { CommentsTable },
  async asyncData () {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments')

    const comments = await response.json()
    return {
      comments
    }
  },
  data () {
    return {
      comments: []
    }
  }
}
</script>

<style scoped></style>
