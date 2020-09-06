<template>
  <div class="view-TaggedComponent" style="user-select: none">
    <b-badge :variant="getVariantByTag(tag)" class="m-1" v-for="(tag, i) in tagItems" :key="i">
      {{ getTextByTag(tag) }} <b v-if="editable" @click="removeTag(tag)" style="cursor: pointer">&times;</b>
    </b-badge>
    <b-badge v-if="editable" @click="showAddPopover = !showAddPopover" :id="identifier" class="m-1" variant="secondary"
             style="cursor: pointer">
      + Добавить метку
    </b-badge>
    <b-popover v-if="editable" style="width: 520px; max-width: 90%" :show.sync="showAddPopover" :target="identifier"
               placement="bottom">
      <template v-slot:title>
        <b-input v-model="inputModel" placeholder="Введите текст метки"/>
        <b-button @click="buttonClick" variant="primary" class="mt-1" block>Добавить</b-button>
      </template>

      <div class="small text-muted">
        Используйте <b>!</b> в начале пометки, чтобы сделать ёё красной,
        <b>*</b> чтобы сделать её желтой, <b>@</b> - зеленым.
        Например: <code>!Нет фото</code> или <code>@Олег доделал</code>.
      </div>
    </b-popover>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class TaggedComponent extends Vue {
  @Prop({default: [], required: true}) tags!: string[];
  @Prop({default: false}) editable!: boolean;
  private identifier = "tags-block-" + new Date().getTime();
  private showAddPopover = false;
  private inputModel = "";
  private tagItems = [...this.tags];

  buttonClick() {
    this.tagItems = [...this.tagItems, this.inputModel];
    this.$emit("add", this.inputModel, this.tagItems);
    this.showAddPopover = false;
    this.inputModel = "";
  }

  removeTag(tag: string) {
    this.tagItems = this.tagItems.filter(v => v !== tag);
    this.$emit("remove", tag, this.tagItems);
  }

  getVariantByTag(text: string) {
    if (text.startsWith('!')) return "danger";
    if (text.startsWith('*')) return "warning";
    if (text.startsWith('@')) return "success";
    if (text.startsWith('^')) return "secondary";
    return "primary";
  }

  getTextByTag(text: string) {
    if (text.startsWith("!")) return text.substr(1);
    if (text.startsWith("*")) return text.substr(1);
    if (text.startsWith("@")) return text.substr(1);
    if (text.startsWith('^')) return text.substr(1);
    return text;
  }
}
</script>

<style scoped>
.popover {
  max-width: 320px;
  text-align: center;
}

.small {
  font-size: 10px;
}
</style>