<template>
    <b-container>
        <b-card no-body>
            <div>
                <img alt="Поступи в КИПФИН" src="/img/priem.jpg"/>
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
    import LoginProfile from "@/views/Defaults/LoginProfile.vue";
    import Footer from "@/components/theme/Footer.vue";

    @Component({
        components: {Footer, LoginProfile, TextField}
    })
    export default class Home extends Vue {

    }
</script>

<style scoped>

</style>
