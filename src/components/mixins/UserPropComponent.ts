import {Component, Prop, Vue} from "vue-property-decorator";
import KFUser from "@/app/client/KFUser";

/**
 * Component with prop of user
 */
@Component
export default class UserPropComponent extends Vue{
    @Prop({required: true}) user!: KFUser;
}