<template>
    <support-wrapper title="Главная страница">
    <p>
        Сервис поддержки пользователей информационной системы КИПФИН
    </p>
    </support-wrapper>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SupportWrapper from "@/modules/Support/Components/SupportWrapper.vue";
@Component({
    components: {SupportWrapper}
})
export default class SupportView extends Vue {

}
</script>

