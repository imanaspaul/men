<template>
  <section class="box">
    <client-only>
      <quill-editor
        ref="editor"
        :tollbar="false"
        v-model="content"
        :options="editorOption"
        @select="onSelectMention"
        @remove="onRemoveMention"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
    </client-only>
  </section>
</template>

<script>
import TurndownService from "turndown";

const atValues = [
  { id: 1, value: "Fredrik Sundqvist", avatar: "https://i.pravatar.cc/300" },
  { id: 2, value: "Patrik Sjölin", avatar: "https://i.pravatar.cc/300" },
];

const hashValues = [
  { id: 3, value: "Fredrik Sundqvist 2" },
  { id: 4, value: "Patrik Sjölin 2" },
];

export default {
  name: "quill-example-nuxt",
  data() {
    return {
      content: ``,
      editorOption: {
        // Some Quill options...
        theme: "snow",

        modules: {
          toolbar: false,
          mention: {
            allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
            mentionDenotationChars: ["@", "#"],
            source: function (searchTerm, renderList, mentionChar) {
              let values;

              if (mentionChar === "@") {
                values = atValues;
              } else {
                values = hashValues;
              }

              if (searchTerm.length === 0) {
                renderList(values, searchTerm);
              } else {
                const matches = [];
                for (let i = 0; i < values.length; i++)
                  if (
                    ~values[i].value
                      .toLowerCase()
                      .indexOf(searchTerm.toLowerCase())
                  )
                    matches.push(values[i]);
                renderList(matches, searchTerm);
              }
            },
            renderItem: function (item, searchTerm) {
              // Render the mention item in the list
              const escapedSearchTerm = searchTerm.replace(
                /[-/\\^$*+?.()|[\]{}]/g,
                "\\$&"
              );

              const regex = new RegExp(`(${escapedSearchTerm})`, "gi");
              const name = item.value.replace(regex, "<b>$1</b>");

              // Include the user's avatar in the list item
              return `<div data-value="${item.id}" class='usercard'>
                        <img src="${item.avatar}" alt="${item.value} avatar" width="30" class="mention-item-avatar">
                        <span class="mention-item-name">${name}</span>
                    </div>`;
            },
            onSelect: function (item, insertItem) {
              insertItem(item);
            },
          },
        },
      },
      selectedMentions: {},
    };
  },
  mounted() {
    setTimeout(() => {
      // this.$refs.editor.quill.on("editor-change", this.handleTextChange);
    }, 1000);
  },
  methods: {
    onEditorBlur(editor) {},
    onEditorFocus(editor) {},
    onEditorReady(editor) {},
    handleTextChange() {
      const html = this.$refs.editor.quill.root.innerHTML;
      var doc = new DOMParser().parseFromString(html, "text/xml");
      const mentions = doc.getElementsByClassName("mention");
      const mention = [...mentions].map((item) => {
        return {
          id: item.attributes["data-id"].value,
          name: item.attributes["data-value"].value,
        };
      });
      console.log(mention);
      this.convertMarkdown(html, mention);
    },
    onSelectMention() {
      console.log("calling");
    },
    onRemoveMention() {
      console.log("calling remove");
    },
    convertMarkdown(html, mentions) {
      const turndownService = new TurndownService();
      const markdown = turndownService.turndown(html);
      let replacedHtmlString = markdown;
      mentions.forEach((mention) => {
        const regex = new RegExp(`@${mention.name}`, "g");
        replacedHtmlString = replacedHtmlString.replace(
          regex,
          `[user-${mention.id}]`
        );
      });

      console.log(replacedHtmlString);
    },
  },
};
</script>

<style>
.box {
  width: 100%;
  margin: 0 auto;
}
.ql-container {
  min-height: 200px;
  /* overflow-x: auto; */
  position: relative;
}
.ql-mention-list {
  z-index: 999; /* Set a high z-index for the mention dropdown */
}
/* .mention {
  background-color: rgb(15, 143, 15);
  color: white;
  padding: 1px;
}
.ql-mention-list-container {
  position: absolute;
  visibility: visible;
  top: 32.2333px;
  left: 16.5px;
  width: 270px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(30, 30, 30, 0.08);
  z-index: 9001;
  overflow: auto;
}
.ql-mention-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.ql-mention-list-item {
  cursor: pointer;
  line-height: 44px;
  font-size: 16px;
  padding: 0 20px;
  vertical-align: middle;
}
.ql-mention-list-container ul li {
  list-style: none;
  padding: 0.2em;
  display: flex;
  gap: 1rem;
}
.mention-item-avatar {
  width: 30px;
  height: 30px;
} */

.ql-mention-list-container {
  width: 270px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(30, 30, 30, 0.08);
  z-index: 9001;
  overflow: auto;
}
.ql-mention-loading {
  line-height: 44px;
  padding: 0 20px;
  vertical-align: middle;
  font-size: 16px;
}
.ql-mention-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.ql-mention-list-item {
  cursor: pointer;
  line-height: 44px;
  font-size: 16px;
  padding: 0 20px;
  vertical-align: middle;
}
.usercard {
  display: flex;
  align-items: center;
}
.ql-mention-list-item.disabled {
  cursor: auto;
}
.ql-mention-list-item.selected {
  background-color: #d3e1eb;
  text-decoration: none;
}
.mention {
  height: 24px;
  width: 65px;
  border-radius: 6px;
  background-color: #d3e1eb;
  padding: 3px 0;
  margin-right: 2px;
  user-select: all;
}
.mention > span {
  margin: 0 3px;
}
</style>
