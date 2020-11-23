<template>
<div class="container">
    <div class="row mt-3">
        <CmpChapterList />
        <ViewQuestion/>
    </div>
</div>
</template>

<script>
import CmpChapterList from '@/components/chapter/CmpChapterList.vue';
import ViewQuestion from '@/components/question/ViewQuestion.vue';

export default {
  components: {
    CmpChapterList,
    ViewQuestion,
  },
}
</script>

<style scoped>

</style>
