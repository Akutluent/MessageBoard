<template>
<!-- eslint-disable max-len -->
  <div>
  <br/>
    <form @submit.prevent="addMessage">
      <div class="form-group">
        <label for="username">Username</label>
        <input v-model="message.username" type="text" class="form-control" id="username" required>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input v-model="message.subject" type="text" class="form-control" id="subject" placeholder="Enter a subject" required>
      </div>
      <div class="form-group">
        <label for="message">Message</label>
        <textarea v-model="message.message" class="form-control" id="message" rows="3" placeholder="Enter a message"></textarea>
      </div>
      <div class="form-group">
        <label for="imageURL">Subject</label>
        <input v-model="message.imageURL" type="url" class="form-control" id="imageURL" placeholder="Enter a image URL">
      </div>
      <button type="submit" class="btn btn-outline-primary">Add message</button>
    </form>
    <br/>
    <div class="list-unstyled" v-for="message in reversedMessages" :key="message._id">
      <li class="media">
        <img v-if="message.imageURL" class="mr-3" :src="message.imageURL" :alt="message.subject">
        <div class="media-body">
          <h4 class="mt-0 mb-1">{{message.username}}</h4>
          <h6 class="mt-0 mb-1">{{message.subject}}</h6>
         {{message.message}}
         <br />
         <small>{{message.created}}</small>
        </div>
      </li>
      <hr>
    </div>
  </div>
</template>

<script>

const API_URL = 'http://localhost:2208/messages';

export default {
  name: 'Home',
  data: () => ({
    messages: [],
    message: {
      username: 'Anonymous',
      subject: '',
      message: '',
      imageURL: '',
    },
  }),
  computed: {
    reversedMessages() {
      return this.messages.slice().reverse();
    },
  },
  mounted() {
    fetch(API_URL).then((response) => response.json()).then((result) => {
      this.messages = result;
    });
  },
  methods: {
    addMessage() {
      console.log(this.message);
      fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(this.message),
        headers: {
          'content-type': 'application/json',
        },
      }).then((response) => response.json()).then((result) => {
        this.messages.push(result);
      });
    },
  },
};
</script>

<style>
  hr{
    background-color: white;
  }

  img {
    max-width: 300px;
    height: auto;
  }
</style>
