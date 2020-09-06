import {Component, Mixins, Prop} from "vue-property-decorator";
import {CreateElement} from "vue";
import UserPropComponent from "@/core/Components/mixins/UserPropComponent";
import {VNodeData} from "vue/types/vnode";
import {NameList} from "@/core/Common/Common";

//
//  Defaults
//
export const defaultUserAvatarSize = '40px';
export const defaultUserAvatarBorderRadius = '0';
export const defaultUserAvatarsPath = 'http://kipfin.ru/new/files/avatar/';
export const defaultUserAvatarNoPath = ''; //'/img/no-image.png';
export const defaultUserAvatarColors = [
    "rgb(164, 88, 193)",
    "rgb(88, 193, 135)",
    "rgb(88, 129, 193)",
    "rgb(193, 88, 88)",
    "rgb(102, 88, 193)",
    "rgb(173, 88, 193)",
]

/**
 * User avatar image component
 */
@Component
export default class UserAvatarImage extends Mixins(UserPropComponent) {
    @Prop({default: defaultUserAvatarSize}) size!: string;
    @Prop({default: defaultUserAvatarBorderRadius}) borderRadius!: string;
    private displayTextContent = "";

    /**
     * Renders the element
     * @param h
     */
    render(h: CreateElement) {
        const node: VNodeData = {
            staticClass: "user-avatar-image",
            style: this.avatarStyle,
        };
        return h("div", node, this.displayTextContent);
    }

    /**
     * Returns the avatar style
     */
    get avatarStyle() {
        const css: NameList = {
            width: this.size,
            height: this.size,
            textAlign: "center",
            verticalAlign: "middle",
            borderRadius: this.borderRadius,
            backgroundSize: 'cover', backgroundRepeat: 'no-repeat no-repeat'
        };
        const avatarPath = this.avatarUrl;
        if (avatarPath !== "") css['backgroundImage'] = `url(${avatarPath})`;
        else {
            const boxSize = parseInt(this.size.replace(/([px%])/, ""));
            const textSize = boxSize * 0.4;
            const delta = boxSize - textSize;

            css["fontSize"] = textSize + "px";
            css["lineHeight"] = 1;
            css["paddingTop"] = (delta / 2) + "px";
            css["fontWeight"] = "400";
            css["color"] = "white";

            this.displayTextContent = this.nameText;
        }
        css["backgroundColor"] = this.backgroundColor;

        return css;
    }

    get backgroundColor() {
        const userId = parseInt(this.user.userId || "0");
        if (userId % 5 === 0) return defaultUserAvatarColors[0];
        if (userId % 4 === 0) return defaultUserAvatarColors[1];
        if (userId % 3 === 0) return defaultUserAvatarColors[2];
        if (userId % 2 === 0) return defaultUserAvatarColors[3];
        if (userId % 1 === 0) return defaultUserAvatarColors[4];
        return defaultUserAvatarColors[5];
    }

    get nameText() {
        const lastname = this.user.lastname || "";
        const name = this.user.name || "";
        return (lastname.substr(0, 1) + name.substr(0, 1)).toUpperCase();
    }

    /**
     * Returns true, if user has image
     */
    get hasImage(){
        return this.user.avatar && this.user.avatar.length > 7;
    }

    /**
     * Returns the avatar URL
     */
    get avatarUrl() {
        if (this.hasImage) return defaultUserAvatarsPath + this.user.avatar;
        return defaultUserAvatarNoPath;
    }

}