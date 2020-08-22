<template>
    <b-container style="max-width: 1200px; position: relative" :fluid="true">
        <b-row>
            <b-col md="3" v-if="!hideSidebar" :style="({paddingTop: wrapperMarginTop})">
                <div :style="({top: wrapperMarginTop})" class="sticky-top pt-3">
                    <div v-for="(item, i) of menu" :key="i">
                        <div class="text-uppercase px-1" v-if="item.nav">
                            <hr/>
                        </div>
                        <router-link
                                :class="('d-block p-1 sub-nav ' + ($route.path.endsWith(item.url) ? 'sub-active' : ''))"
                                v-else :to="item.url">
                            <b-icon :icon="item.icon"/>
                            {{item.title}}
                        </router-link>
                    </div>

                    <footer-view class="mt-3"/>
                </div>
            </b-col>
            <b-col :style="({paddingTop: wrapperMarginTop})">
                <slot></slot>
            </b-col>
        </b-row>
    </b-container>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import FooterView from "@/components/theme/Footer.vue";

    @Component({components: {FooterView}})
    export default class WrapperContainer extends Vue {
        @Prop({default: [], required: false}) menu!: [];
        private wrapperMarginTopValue = 10;

        get hideSidebar() {
            if (this.$route.path.endsWith("/chat")) return true;
            if (this.$route.path.endsWith("/create")) return true;
            if (this.$route.path.endsWith("/login")) return true;
            if (this.$route.path.includes("/support")) return true;
            if (this.$route.path.endsWith("/")) return true;
            return false;
        }

        get wrapperMarginTop() {
            return (this.wrapperMarginTopValue - 1) + 'px';
        }

        async mounted() {
            this.fixTemplate();
        }

        fixTemplate() {
            if (document.getElementById("navigation-bar")) {
                this.wrapperMarginTopValue =
                    document?.getElementById("navigation-bar")?.offsetHeight || 76;
            } else {
                this.wrapperMarginTopValue = 76;
            }
        }

    }
</script>

<style scoped>
    .card {
        border-color: #c3c3c3;
    }

    .nav-title {
        padding: 5px;
        display: block;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
    }

    .header {
        background-color: rgba(40, 76, 115, 0.16);
        padding: 15px;
    }
</style>
