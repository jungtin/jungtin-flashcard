<template>
<div class="container">
    <div class="row mt-3">
        <CmpChapterList />
        <!-- <ViewQuestion/> -->
        <div class="col-12 col-md-8 bg-dark">
            <router-view />
        </div>
    </div>
</div>
</template>

<script>
import CmpChapterList from '@/components/chapter/CmpChapterList.vue';
// import ViewQuestion from '@/components/question/ViewQuestion.vue';

export default {
    components: {
        CmpChapterList,
        // ViewQuestion,
    },
}
</script>

<style scoped>

</style>
