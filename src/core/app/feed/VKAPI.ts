/**
 * The VKAPI Utilities
 */
import {nameList, NameList} from "@/core/Common/Common";
import UI from "@/core/app/plugins/ui/UI";
import UrlIO from "@/core/Utils/UrlIO";
import fetchJsonp from "fetch-jsonp";

export const VKAPI = {
    /**
     * The group public token
     */
    // token: "cf61bbc759ea4df87e061513ff65080ab9a9b0da704921c8ffce2ec805077299a0343d4b91df720c39e95",
    token: "5030c47b5030c47b5030c47b1f50602c49550305030c47b0e8a4389aba7bdb7ecb3dfd6",

    /**
     * Group id
     */
    groupId: 157025793,

    /**
     * VK url
     */
    url: "https://api.vk.com/method/",

    /**
     * Items per page loaded
     */
    countItemsPerPage: 15,

    /**
     * Send VK API Request
     * @param path
     * @param args
     */
    async request(path: string, args: NameList) {
        const params = nameList(args);
        params["access_token"] = VKAPI.token;
        params["v"] = "5.120";
        try {
            const ft = await fetchJsonp(VKAPI.url + path + "?" + UrlIO.params(params));
            return await ft.json();
        } catch (e) {
            UI.error(e);
            return null;
        }
    },

    /**
     * Returns the public wall
     * @param page
     */
    async getPublicWall(page = 0) {
        const params = nameList();
        params["owner_id"] = -VKAPI.groupId;
        params["offset"] = page * VKAPI.countItemsPerPage;
        params["count"] = VKAPI.countItemsPerPage;
        return await VKAPI.request("wall.get", params);
    },

    async getVideos(videos: string[]) {
        const params = nameList();
        params["owner_id"] = -VKAPI.groupId;
        params["videos"] = videos.map(value => (-VKAPI.groupId).toString() + "_" + value).join(",");
        return await VKAPI.request("video.get", params);
    }
};