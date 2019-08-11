<template>
  <main>
    <NavBar />
    <h1>カテゴリー追加</h1>
    <form @submit.prevent="add">
      <label>
        カテゴリー名
        <input v-model="name" type="text" />
      </label>
      <button type="submit">追加</button>
    </form>
    <h2>登録済みカテゴリー</h2>
    <ul>
      <li v-for="category in categories" :key="category.id">
        {{ category.name }}
      </li>
    </ul>
  </main>
</template>

<script>
import db from '~/utils/db'
import NavBar from '~/components/NavBar'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      categories: [],
      name: ''
    }
  },
  firestore: {
    categories: db.collection('categories')
  },
  methods: {
    add() {
      const name = this.name
      if (name.length > 0) {
        db.collection('categories').add({ name })
        this.name = ''
      }
    }
  }
}
</script>
