<template>
    <template v-if="isPermit">
        <h1>Secured Content</h1>
        <p class="lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Excepturi aut, aspernatur facere eaque hic dolorum esse doloribus enim at iure, 
            consequuntur nulla. Odio reiciendis illo explicabo porro soluta repellat dolorem.
        </p>
    </template>
    <h1 v-else>Cần phải Login để xem được nội dung này</h1>

</template>

<script>
import { auth } from "@/firebase/init"

export default {
    data() {
        return {
            isPermit: false
        }
    },
    created() {
        const user = auth.currentUser;
        if(user) {
            // Đã logined
            this.isPermit = true;
        }
    }
}
</script>

<style>

</style>