import Vue from "vue";
import VueQuillEditor from "vue-quill-editor";
import Quill from "quill";
import Mention from "quill-mention";

Vue.use(VueQuillEditor);
Quill.register("modules/mention", Mention);
