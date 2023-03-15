<template>
  <div class="container">
    <h1>Chat</h1>
    <div class="submit">
      <editor ref="editor" :sms="formattedSms" />
      <button @click="sendSms">Send</button>
    </div>
  </div>
</template>

<script>
import Editor from "../components/Editor.vue";
export default {
  components: { Editor },
  name: "EditorPreview",
  data() {
    return {
      test: "",
      mentions: [
        {
          id: "1",
          name: "Manjarul Haque",
        },
        {
          id: "2",
          name: "Manas Paul",
        },
      ],
      sms: `﻿[user-1]﻿ &lt;h1&gt;hello&lt;/h1&gt;`,
    };
  },
  computed: {
    formattedSms() {
      let formatted = this.sms;

      // Loop through the mentions array
      this.mentions.forEach((mention) => {
        const regex = new RegExp(`\\[user-${mention.id}\\]`, "g");
        const mentionHTML = `<span class="mention" data-index="0" data-denotation-char="@" data-id="${mention.id}" data-value="${mention.name}">﻿<span contenteditable="false"><span class="ql-mention-denotation-char">@</span>${mention.name}</span>﻿</span>`;

        // Replace the [user-x] string with the corresponding HTML string
        formatted = formatted.replace(regex, mentionHTML);
      });

      return formatted;
    },
  },

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
