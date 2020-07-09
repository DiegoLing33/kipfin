<template>
    <div class="view-Footer text-muted" style="opacity: 0.4">
        <a href="http://kip.fa.ru">
            КОЛЛЕДЖ ИНФОРМАТИКИ И ПРОГРАММИРОВАНИЯ <br/>
            ФИНАНСОВОГО УНИВЕРСИТЕТА ПРИ ПРАВИТЕЛЬСТВЕ РОССИЙСКОЙ ФЕДЕРАЦИИ</a> <br/>
        All Rights Reserved &COPY; 2019
        Портал разработан <a href="http://ling.black">Панов Я.В.</a>
<!--        <br/>-->
<!--        <img style="margin: 20px auto; height: 60px" alt="Лого Финансового Университета" src="../assets/logo_fa.png">-->
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class FooterView extends Vue {

    }
</script>

<style scoped>
    .view-Footer{
        font-size: 10px;
        text-transform: uppercase;
    }
</style>
