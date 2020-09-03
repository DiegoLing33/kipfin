<template>
    <user-content title="Приказы о зачислении">
        <b>10.02.05 Обеспечение информационной безопасности автоматизированных систем</b>
        <ul>
            <li>
                <a href="/OIBAS2020.pdf">
                    Приказ о зачислении на первый курс (бюджетная основа) №0367/у-к от 27.08.2020.pdf
                </a>
            </li>
            <li>
                <a href="/OIBASD2020.pdf">
                    Приказ о зачислении на первый курс (договорная основа) №0380/у-к от 31.08.2020.pdf
                </a>
            </li>
        </ul>
        <b>09.02.03 Программирование в компьютерных системах</b>
        <ul>
            <li>
                <a href="/PKS2020.pdf">Приказ о зачислении на первый курс (бюджетная основа) №0366/у-к от 27.08.2020.pdf </a>
            </li>
        </ul>
        <b>09.02.07 Информационные системы и программирование</b>
        <ul>
            <li>
                <a href="/ISIP2020.pdf">Приказ о зачислении на первый курс (договорная основа) №0379/у-к от 31.08.2020.pdf                </a>
            </li>
        </ul>
    </user-content>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserContent from "@/components/theme/UserContent.vue";

@Component({
    components: {UserContent}
})
export default class GetDoneView extends Vue {

}
</script>

<style scoped>

</style>