<template>
  <main>
    <NavBar />
    <h1>項目追加</h1>
    <form @submit.prevent="add">
      カテゴリー
      <ul>
        <li v-for="category in categories" :key="category.id">
          <label>
            <input
              v-model="itemCategories"
              type="checkbox"
              name="itemCategories"
              :value="category.id"
            />
            {{ category.name }}
          </label>
        </li>
      </ul>
      <label>
        項目名
        <input v-model="name" type="text" />
      </label>
      <button type="submit">追加</button>
    </form>
    <h2>登録済み項目</h2>
    <ul>
      <li v-for="item in registeredItems" :key="item.id">
        {{ item.name }}
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
      allItems: [],
      categories: [],
      itemCategories: [],
      name: ''
    }
  },
  computed: {
    registeredItems() {
      const categories = this.itemCategories
      return this.allItems.filter((item) => {
        return categories.some((c) => item.categories.some((i) => i === c))
      })
    }
  },
  firestore: {
    allItems: db.collection('items'),
    categories: db.collection('categories')
  },
  methods: {
    add() {
      const name = this.name
      const categories = this.itemCategories
      if (name.length > 0 && categories.length > 0) {
        db.collection('items').add({ name, categories })
        this.name = ''
      }
    }
  }
}
</script>
