<template>
    <b-container>
        <b-card header="Приемная комиссия">
            <div style="font-size: 2em; text-transform: uppercase; text-align: center">
                Поступи в колледж информатики и программирования <span class="text-primary">онлайн</span>
            </div>
            <div class="my-2">
                В 2020 году, ввиду пандемии коронавируса мы запускаем дистанционную приемную комиссию!
                <div class="my-2">
                    <b-badge class="mr-2" variant="primary">#STAYHOME</b-badge>
                    <b-badge variant="primary">#ДИСТАНТ</b-badge>
                </div>
            </div>
            <template v-if="!$store.state.ready" v-slot:footer>
                <b-button @click="$router.push('/create')" block variant="success">
                    Создать кабинет абитуриента
                </b-button>
            </template>
        </b-card>
    </b-container>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TextField from "@/components/fields/TextField.vue";

    @Component({
        components: {TextField}
    })
    export default class Home extends Vue {

    }
</script>

<style scoped>

</style>
