<template>
    <!--- Authorization view -->
    <b-card v-if="currentState === 1">
        <icon-header-text
                title="Авторизация"
                icon="shield-exclamation">
              <span>
                    Идет авторизация, пожалуйста, подождите...
                </span>
            <div class="mt-5">
                <box-hint>
                    Если Вы считаете, что это ошибка, воспользуйтесь формой:
                    <router-link to="/support/error">сообщение об ошибке</router-link>
                    .
                </box-hint>
            </div>
        </icon-header-text>
    </b-card>
    <!--- Access error view -->
    <b-card v-else-if="currentState === 2">
        <icon-header-text
                title="Доступ ограничен"
                icon="shield-lock">
              <span>
                    В данный момент доступ к директиве ограничен
                </span>
            <div class="mt-5">
                <box-hint>
                    Если Вы считаете, что это ошибка, воспользуйтесь формой:
                    <router-link to="/support/error">сообщение об ошибке</router-link>
                    .
                </box-hint>
            </div>
        </icon-header-text>
    </b-card>
    <!--- Is ok -->
    <div v-else class="view-ContentBody">
        <slot></slot>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Nullable} from "@/core/Common/Common";
    import IconHeaderText from "@/core/Components/IconHeaderText.vue";
    import BoxHint from "@/modules/Interface/Components/BoxHint.vue";

    /**
     *  The ContentBody component.
     *  @author diego
     *  @created 06.09.2020 19:44
     */
    @Component({
        components: {BoxHint, IconHeaderText}
    })
    export default class ContentBody extends Vue {
        @Prop({default: false}) shouldBeAuthorized!: boolean;
        @Prop({default: null}) shouldHasAccess!: Nullable<number>;

        protected currentState = this.shouldBeAuthorized || this.shouldHasAccess !== null ? 1 : 0;

        created() {
            if (this.shouldBeAuthorized || this.shouldHasAccess !== null) {
                const wait = setInterval(()=>{
                    if(!this.$store.getters.user.isZero()) {
                        clearInterval(wait);
                        if(this.$store.getters.user.group.hasAccess(this.shouldHasAccess)){
                            this.currentState = 0;
                        }else{
                            this.currentState = 2;
                        }
                    }
                }, 10);
            }
        }
    }
</script>

<style scoped>

</style>