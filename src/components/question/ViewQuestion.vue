<template>
<div class="col-12 col-md-8 bg-dark">
    <div class="d-flex justify-content-around" id="question-modification">
        <button class="btn btn-success">Practice</button>
        <button class="btn btn-info" @click="navigateToListing">Listing</button>
        <button class="btn btn-warning">Add Bulk</button>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
export default {
    setup() {
        const router = useRouter()
        const route = useRoute()

        function navigateToListing() {
            router.push({
                name: "question-listing",
                params: { ...route.params }
            })
        }

        return {
            navigateToListing
        }
    }
}
</script>

<style scoped>
#question-modification {
    border-bottom: 3px solid rgba(255, 255, 255, .4);
    padding: 20px 0px 20px 0;
}

#question-modification .btn {
    min-width: 150px;
    box-shadow: 7px 7px 12px -4px rgba(255, 255, 255, 0.5);
}
</style>