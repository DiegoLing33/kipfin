<template>
    <b-container>
        Пожалуйста, подождите...
    </b-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ButtonLoginOrCreate from "@/core/Components/ButtonLoginOrCreate.vue";

@Component({
    components: {ButtonLoginOrCreate}
})
export default class Home extends Vue {
    created(){
        if(this.$store.getters.accountIsAuthenticated){
            this.$router.push('/feed');
        }else{
            this.$router.push('/login');
        }
    }
}
</script>

<style scoped>

</style>
