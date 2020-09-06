<template>
    <div class="view-Footer text-muted mt-5" style="opacity: 1; text-align: justify">
        <a target="_blank" href="https://vk.com/kip_college" class="mr-3">ВКОНТАКТЕ</a>
        <a target="_blank" href="https://instagram.com/kip_fin" class="mr-3">Инстаграм</a>
        <a target="_blank" href="https://fb.com/kipfincollege" class="mr-3">FACEBOOK</a>
        <a target="_blank" href="http://kip.fa.ru" class="mr-3">KIP.FA.RU</a>
        <div style="opacity: 0.5; text-align: left" class="mt-2">
            <a target="_blank" href="http://kip.fa.ru">
                КОЛЛЕДЖ ИНФОРМАТИКИ И ПРОГРАММИРОВАНИЯ <br/>
                ФИНАНСОВОГО УНИВЕРСИТЕТА ПРИ ПРАВИТЕЛЬСТВЕ РОССИЙСКОЙ ФЕДЕРАЦИИ</a> <br/>
            <div style="opacity: 0.5; font-size: 9px; text-align: left">
            All Rights Reserved &COPY; 2019
            Портал разработан <a target="_blank" href="http://ling.black">Панов Я.В.</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class FooterView extends Vue {

    }
</script>

<style scoped>
    .view-Footer {
        font-size: 10px;
        text-transform: uppercase;
    }
</style>
