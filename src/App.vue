<template>
  <div
    class="view login"
    v-if="state.username === '' || state.username === null"
  >
    <form class="login-form" @submit.prevent="Login">
      <h1>Login to FireChat</h1>
      <div class="form-inner">
        <label for="username">Username</label>
        <input
          type="text"
          v-model="inputUsername"
          placeholder="Please enter your username...."
        />
        <input type="submit" value="Login" />
      </div>
    </form>
  </div>
  <div class="view chat" v-else>
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ state.username }}</h1>
    </header>

    <section class="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="
          message.username == state.username
            ? 'message current-user'
            : 'message'
        "
      >
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="SendMessage">
        <input
          type="text"
          v-model="inputMessage"
          placeholder="Write a message..."
        />
        <button type="submit" value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue'
import db from './db'

export default {
  name: 'App',
  components: {},
  setup() {
    const inputUsername = ref('')
    const inputMessage = ref('')
    const state = reactive({
      username: '',
      messages: [],
    })
    const Login = () => {
      if (inputUsername.value != '' || inputUsername.value != null) {
        state.username = inputUsername.value
        inputUsername.value = ''
      }
    }
    const Logout = () => {
      state.username = ''
    }
    const SendMessage = () => {
      const messageRef = db.database().ref('messages')

      if (inputMessage.value == '' || inputMessage.value == null) {
        return
      }
      const message = {
        username: state.username,
        content: inputMessage.value,
      }
      messageRef.push(message)
      inputMessage.value = ''
    }
    onMounted(() => {
      const messageRef = db.database().ref('messages')

      messageRef.on('value', (snapshot) => {
        const data = snapshot.val()
        let messages = []

        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
          })
        })
        state.messages = messages
      })
    })
    return { inputUsername, inputMessage, Login, state, SendMessage, Logout }
  },
}
</script>

<style lang="scss"></style>
