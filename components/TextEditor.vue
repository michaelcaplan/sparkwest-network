<template>
  <div id="text-editor">
    <div v-if="editor" @submit.prevent class="card editor">
      <div class="card-header p-2">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
          <div class="row">
            <div class="col-auto d-none d-xl-flex">
              <div class="btn-group border border-secondary rounded">
                <button
                  class="btn btn-dark"
                  :class="{ active: isActive.bold() }"
                  @click.prevent="commands.bold"
                >
                  <i class="fa fa-bold" aria-hidden="true"></i>
                </button>

                <button
                  class="btn btn-dark"
                  :class="{ active: isActive.italic() }"
                  @click.prevent="commands.italic"
                >
                  <i class="fa fa-italic" aria-hidden="true"></i>
                </button>

                <button
                  class="btn btn-dark"
                  :class="{ active: isActive.underline() }"
                  @click.prevent="commands.underline"
                >
                  <i class="fa fa-underline" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div class="col-auto d-flex d-xl-none">
              <div class="dropdown">
                <button
                  class="btn btn-dark border-secondary"
                  type="button"
                  id="sizeDropdownButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fas fa-font"></i>
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="sizeDropdownButton">
                  <a
                    class="dropdown-item"
                    href="#"
                    :class="{ active: isActive.bold() }"
                    @click.prevent="commands.bold"
                    ><i class="fa fa-bold" aria-hidden="true"></i
                  ></a>

                  <a
                    class="dropdown-item"
                    href="#"
                    :class="{ active: isActive.italic() }"
                    @click.prevent="commands.italic"
                    ><i class="fa fa-italic" aria-hidden="true"></i
                  ></a>

                  <a
                    class="dropdown-item"
                    href="#"
                    :class="{ active: isActive.underline() }"
                    @click.prevent="commands.underline"
                  >
                    <i class="fa fa-underline" aria-hidden="true"></i
                  ></a>
                </div>
              </div>
            </div>

            <div class="col-auto pl-0 d-none d-lg-flex">
              <div class="btn-group border border-secondary rounded">
                <button
                  class="btn btn-dark"
                  :class="{ active: isActive.paragraph() }"
                  @click.prevent="commands.paragraph"
                >
                  <i class="fa fa-paragraph" aria-hidden="true"></i>
                </button>

                <button
                  class="btn btn-dark"
                  :class="{
                    active: isActive.heading({ level: 1 }),
                  }"
                  @click.prevent="commands.heading({ level: 1 })"
                >
                  H1
                </button>

                <button
                  class="btn btn-dark"
                  :class="{
                    active: isActive.heading({ level: 2 }),
                  }"
                  @click.prevent="commands.heading({ level: 2 })"
                >
                  H2
                </button>

                <button
                  class="btn btn-dark"
                  :class="{
                    active: isActive.heading({ level: 3 }),
                  }"
                  @click.prevent="commands.heading({ level: 3 })"
                >
                  H3
                </button>
              </div>
            </div>

            <div class="col-auto pl-0 d-flex d-lg-none">
              <div class="dropdown">
                <button
                  class="btn btn-dark border-secondary"
                  type="button"
                  id="sizeDropdownButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fa fa-paragraph" aria-hidden="true"></i>
                  <i class="fas fa-ellipsis-v"></i>
                </button>
                <div class="dropdown-menu" aria-labelledby="sizeDropdownButton">
                  <a
                    class="dropdown-item"
                    href="#"
                    :class="{
                      active: isActive.paragraph(),
                    }"
                    @click.prevent="commands.paragraph"
                    ><i class="fa fa-paragraph" aria-hidden="true"></i
                  ></a>

                  <a
                    class="dropdown-item"
                    href="#"
                    :class="{
                      active: isActive.heading({
                        level: 1,
                      }),
                    }"
                    @click.prevent="commands.heading({ level: 1 })"
                    >H1</a
                  >

                  <a
                    class="dropdown-item"
                    href="#"
                    :class="{
                      active: isActive.heading({
                        level: 2,
                      }),
                    }"
                    @click.prevent="commands.heading({ level: 2 })"
                    >H2</a
                  >

                  <a
                    class="dropdown-item"
                    href="#"
                    :class="{
                      active: isActive.heading({
                        level: 3,
                      }),
                    }"
                    @click.prevent="commands.heading({ level: 3 })"
                    >H3</a
                  >
                </div>
              </div>
            </div>

            <div class="col-auto pl-0 d-none d-sm-flex">
              <div class="btn-group border border-secondary rounded">
                <button
                  class="btn btn-dark"
                  :class="{
                    active: isActive.bullet_list(),
                  }"
                  @click.prevent="commands.bullet_list"
                >
                  <i class="fa fa-list-ul" aria-hidden="true"></i>
                </button>

                <button
                  class="btn btn-dark"
                  :class="{
                    active: isActive.ordered_list(),
                  }"
                  @click.prevent="commands.ordered_list"
                >
                  <i class="fa fa-list-ol" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div class="col">
              <div
                class="btn-group border border-secondary rounded float-right"
              >
                <button class="btn btn-dark" @click.prevent="commands.undo">
                  <i class="fa fa-undo" aria-hidden="true"></i>
                </button>

                <button class="btn btn-dark" @click.prevent="commands.redo">
                  <i class="fas fa-redo" aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>
        </editor-menu-bar>
      </div>

      <div class="card-body p-3">
        <editor-content class="editor__content" :editor="editor" />
      </div>

      <div class="card-footer p-2">
        <p class="small float-right" v-if="maxChars == null">
          characters: {{ chars }}
        </p>
        <p
          class="small float-right"
          :class="{
            'text-danger': chars > maxChars,
          }"
          v-if="maxChars"
        >
          characters: {{ chars }} / {{ maxChars }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Italic,
  Link,
  Underline,
  History,
  Placeholder,
} from 'tiptap-extensions'

export default {
  name: 'TextEditor',

  components: {
    EditorContent,
    EditorMenuBar,
  },

  props: ['max-chars', 'content'],

  data() {
    return {
      editor: null,
      html: '',
      chars: 0,
    }
  },

  watch: {
    html() {
      this.$nuxt.$emit('editor-update', { html: this.html, chars: this.chars })
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [
        new BulletList(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Link(),
        new Bold(),
        new Italic(),
        new Underline(),
        new History(),
        new Placeholder({
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'is-empty',
          emptyNodeText: 'Write something …',
          showOnlyWhenEditable: true,
          showOnlyCurrent: true,
        }),
      ],
      content: this.content || '',
      onInit: (event) => {
        this.chars = event.state.doc.textContent.length
        this.html = this.content || ''
      },
      onUpdate: (event) => {
        this.chars = event.state.doc.textContent.length
        this.html = event.getHTML()
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style>
.editor p.is-editor-empty:first-child::before {
  content: 'An awesome event';
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
}

.editor p:last-child {
  margin-bottom: 0;
}
</style>

<style scoped>
.card-header {
  background: var(--editor-menu-bg);
}

.card-body {
  background: var(--editor-body-bg);
  color: var(--editor-text-color);
}

.card-footer {
  background: var(--editor-footer-bg);
  color: var(--editor-footer-text-color);
}
</style>
