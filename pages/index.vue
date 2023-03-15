<template>
  <div class="container">
    <h1>Chat</h1>
    <div class="submit">
      <editor ref="editor" />
      <button @click="sendSms">Send</button>
    </div>
  </div>
</template>

<script>
import Editor from "../components/Editor.vue";
export default {
  components: { Editor },
  name: "IndexPage",
  methods: {
    sendSms() {
      this.$refs.editor.handleTextChange();
    },
  },
};
</script>

<style>
.container {
  width: 30%;
  height: 90vh;
  margin: 0 auto;
  position: relative;
}
.submit {
  position: absolute;
  width: 100%;
  bottom: 0;
}
input {
  width: 100%;
  height: 40px;
  padding: 0 10px;
}
input[focus] {
  outline: none;
}
</style>
