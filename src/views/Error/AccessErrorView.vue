<template>
    <b-card style="border-radius: 0">
        <div class="text-center">
            <b-icon-shield-lock font-scale="5"/>
            <h2 class="mt-3">Доступ ограничен!</h2>
            В данный момент доступ к директиве ограничен.
            <div class="mt-5">
                <box-hint>
                    Если Вы считаете, что это ошибка, воспользуйтесь формой:
                    <router-link to="/support/error">сообщение об ошибке</router-link>.
                </box-hint>
            </div>
        </div>
    </b-card>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import BoxHint from "@/modules/Interface/Components/BoxHint.vue";

@Component({
    components: {BoxHint}
})
export default class AccessErrorView extends Vue {

}
</script>

<style scoped>

</style>