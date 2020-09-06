<template>
    <b-card style="border-radius: 0" no-body class="mb-2">
        <template #header>
            <b-row>
                <b-col sm="2">
                    <a href="#" target="_blank">Новости</a>
                </b-col>
                <b-col class="text-muted" sm="8">
                    <a :href="entity.authorLink || '#'" target="_blank">
                        {{entity.authorName}}
                    </a>
                    {{dateString}}
                </b-col>
                <b-col class="text-muted text-right" sm="2">
                    <b-icon-menu-button-wide/>
                </b-col>
            </b-row>
        </template>
        <b-card-body>
            <b-card-title>
                {{entity.title}}
            </b-card-title>
        </b-card-body>
        <slot></slot>
        <b-card-body v-html="htmlBodyContent"/>
        <template v-slot:footer>
            <b-row>
                <b-col>
                    <b-icon-heart class="mr-1"/>
                    <span class="mr-3">
                        {{entity.likes}}
                    </span>
                    <b-icon-chat-square class="mr-1"/>
                    <span class="mr-3">
                        {{entity.comments}}
                    </span>
                    <b-icon-eye class="mr-1"/>
                    <span class="mr-3">
                        {{entity.views}}
                    </span>
                </b-col>
                <b-col v-if="entity.link" class="text-right">
                    <a :href="entity.link" target="_blank">
                        <b-icon-link /> открыть в VK
                    </a>
                </b-col>
            </b-row>
        </template>
    </b-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {FeedItemEntity} from "@/modules/Feed/Entities/FeedItemEntity";
    import CountedString from "@/core/Common/CountedString";
    import DateIO from "@/core/Utils/DateIO";

    /**
     *  The FeedItem component.
     *  @author diego
     *  @created 06.09.2020 18:08
     */
    @Component
    export default class FeedItem extends Vue {
        @Prop({required: true}) item!: FeedItemEntity;
        protected entity = this.item;

        get htmlBodyContent() {
            return this.entity.text
                .replace(/([^\n]+)/g, '<p>$1</p>')
                .replace(/(#[^ ]+)/g, '<span class="hash text-primary">$1</span>');
        }

        get dateString() {
            const delta = Math.round((new Date().getTime() - this.entity.date.getTime()) / 1000);
            if (delta < 61) {
                return delta + ' ' +
                    CountedString.get(delta, "секунда", "секунды", "секунд") + ' назад';
            }
            const minutes = Math.round(delta / 60);
            if (minutes < 61) {
                return minutes + ' ' +
                    CountedString.get(minutes, 'минута', 'минуты', 'минут') + ' назад';
            }
            const hours = Math.round(minutes / 60);
            if (hours < 25) {
                return hours + ' ' +
                    CountedString.get(minutes, 'час', 'часа', 'часов') + ' назад';
            }
            const days = Math.round(hours / 24);
            if (days < 31) {
                return days + ' ' +
                    CountedString.get(days, 'день', "дня", "дней") + ' назад';
            }
            return DateIO.toStdDateTime(this.entity.date);
        }
    }
</script>

<style lang="scss">
    .hash {
        font-size: 0.8em;
        opacity: 0.7;
        transition: all 0.5s;

        &:hover {
            opacity: 1;
        }
    }
</style>