import {Component, Mixins, Prop} from "vue-property-decorator";
import {CreateElement, RenderContext, VNodeChildren} from "vue";
import UserPropComponent from "@/components/mixins/UserPropComponent";
import {mergeData} from "vue-functional-data-merge";
import {VNodeData} from "vue/types/vnode";

//
//  Defaults
//
export const defaultUserAvatarSize = '40px';
export const defaultUserAvatarBorderRadius = '0';
export const defaultUserAvatarsPath = 'http://kipfin.ru/new/files/avatar/';
export const defaultUserAvatarNoPath = '/img/no-image.png';

/**
 * User avatar image component
 */
@Component
export default class UserAvatarImage extends Mixins(UserPropComponent) {
    @Prop({default: defaultUserAvatarSize}) size!: string;
    @Prop({default: defaultUserAvatarBorderRadius}) borderRadius!: string;

    /**
     * Renders the element
     * @param h
     */
    render(h: CreateElement) {
        const node: VNodeData = {
            staticClass: "user-avatar-image",
            style: this.avatarStyle
        };
        return h("div", node);
    }

    /**
     * Returns the avatar style
     */
    get avatarStyle() {
        return {
            width: this.size,
            height: this.size,
            borderRadius: this.borderRadius,
            backgroundImage: `url(${this.avatarUrl})`,
            backgroundSize: 'cover', backgroundRepeat: 'no-repeat no-repeat'
        };
    }

    /**
     * Returns the avatar URL
     */
    get avatarUrl() {
        if (this.user.avatar && this.user.avatar.length > 7)
            return defaultUserAvatarsPath +
                this.user.avatar;
        return defaultUserAvatarNoPath;
    }

}