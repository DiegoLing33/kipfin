<template>
    <b-container>
        <b-card no-body>
            <div>
                <img alt="Поступи в КИПФИН" src="/img/priem.jpg"/>
            </div>
            <template #footer>
                <b-row>
                    <b-col class="mb-1">
                        <button-login-or-create
                            :is-logged-in="$store.getters.accountIsAuthenticated"
                            variant="success" :block-size="true"/>
                    </b-col>
                    <b-col  class="mb-1" v-if="!$store.getters.accountIsAuthenticated">
                        <b-button block
                            variant="primary" @click="$router.push('/login')">
                            <b-icon-shield-lock/>
                            Войти в личный кабинет
                        </b-button>
                    </b-col>
                </b-row>


            </template>
        </b-card>
    </b-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ButtonLoginOrCreate from "@/core/Components/ButtonLoginOrCreate.vue";

@Component({
    components: {ButtonLoginOrCreate}
})
export default class Home extends Vue {

}
</script>

<style scoped>

</style>
