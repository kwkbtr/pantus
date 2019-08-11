<template>
  <main>
    <NavBar />
    <h1>数量管理</h1>
    <h2>ストック切れ</h2>
    <ul>
      <li v-for="item in outOfStockItems" :key="item.id">
        {{ item.name }} <button @click="add(item)">買った</button>
      </li>
    </ul>
    <h2>全項目</h2>
    <ul>
      <li v-for="category in categories" :key="category.id">
        <details>
          <summary>{{ category.name }}</summary>
          <ul>
            <li v-for="item in itemsInCategory(category.id)" :key="item.id">
              {{ item.name }}: {{ item.quantity || 0 }}
              <button @click="use(item)">使った</button>
              <button @click="add(item)">買った</button>
            </li>
          </ul>
        </details>
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
      items: []
    }
  },
  computed: {
    outOfStockItems() {
      return this.items.filter((item) => item && !(item.quantity > 0))
    }
  },
  firestore: {
    categories: db.collection('categories'),
    items: db.collection('items')
  },
  methods: {
    itemsInCategory(categoryId) {
      return this.items.filter((item) => item.categories.includes(categoryId))
    },
    use(item) {
      db.collection('items')
        .doc(item.id)
        .update({ quantity: (item.quantity || 0) - 1 })
    },
    add(item) {
      db.collection('items')
        .doc(item.id)
        .update({ quantity: (item.quantity || 0) + 1 })
    }
  }
}
</script>
