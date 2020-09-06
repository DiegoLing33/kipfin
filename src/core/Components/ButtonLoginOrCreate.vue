<template>
    <b-button :variant="variant" :block="blockSize" v-if="isLoggedIn" @click="$router.push('/user')">
        <b-icon-person /> Личный кабинет
    </b-button>
    <b-button :variant="variant" :block="blockSize" v-else @click="$router.push('/create')">
        <b-icon-person-plus /> Создать личный кабинет
    </b-button>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component
export default class ButtonLoginOrCreate extends Vue {
    @Prop({default: false}) isLoggedIn!: boolean;
    @Prop({default: true}) blockSize!: boolean;
    @Prop({default: "primary"}) variant!: string;
}
</script>

<style scoped>

</style>