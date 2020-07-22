/**
 * Account profile API
 */
import {Numeric} from "@/ling/types/Common";
import API from "@/app/api/API";
import UI from "@/app/plugins/ui/UI";

export const AccountProfile = {

    /**
     * Sets the field value
     *
     * @param field
     * @param value
     * @param userId
     * @param adminRequest
     */
    async setFieldValue(field: string, value: unknown, userId: Numeric, adminRequest = false) {
        try {
            await API.mission.setField(field, value, userId.toString(), adminRequest);
            return true;
        } catch (e) {
            UI.error(e);
        }
    }

};