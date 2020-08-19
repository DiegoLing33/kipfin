<template>
  <user-content title="Метки пользователей" description="Добавлена новая система меток пользователя">
    <div style="border: 1px solid #f1f1f1; padding: 5px; background-color: #f5f5f5">
      <img src="/img/tags.png" alt="tags screen">
      <div class="p-3 small text-muted text-center">
        <i>Метки пользоваетеля на его странице</i>
      </div>
    </div>
    <p class="pt-3">
      Метки пользователей позволяют добавлять мета-информацию об абитуриенте или студенте.
      Метки видят только группы пользователей, имеющие права администрирования портала.
    </p>
    <ul class="pb-3">
      <li>Чтобы добавить новую метку, нажмите на кнопку "+Добавить метку".</li>
      <li>Для удаления метки, используйте символ <b>&times;</b>.</li>
    </ul>
    <div style="border: 1px solid #f1f1f1; padding: 5px; background-color: #f5f5f5">
      <img src="/img/tags2.png" alt="tags screen">
      <div class="p-3 small text-muted text-center">
        <i>Поиск пользователя по метке</i>
      </div>
    </div>
    <p class="pt-3">
      На странице поиска абитуриентов также добавлен поиск по меткам. Не забудьте нажать
      "Отобразить всех", чтобы искать <b>по всем</b> абитуриентам!
    </p>
  </user-content>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserContent from "@/components/theme/UserContent.vue";

@Component({
  components: {UserContent}
})
export default class AdminUpdates extends Vue {

}
</script>

<style scoped>

</style>