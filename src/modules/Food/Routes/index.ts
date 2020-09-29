import {RouteConfig} from "vue-router";
import FoodIndex from "@/modules/Food/Pages/FoodIndex.vue";
import FoodAdminIndex from "@/modules/Food/Pages/FoodAdminIndex.vue";

const foodRoutes = Array<RouteConfig>(
    {
        path: "/food",
        component: FoodIndex
    },{
        path: "/admin/food/results",
        component: FoodAdminIndex
    }
);

export default foodRoutes;