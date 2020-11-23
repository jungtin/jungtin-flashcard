<template>
<div class="text-white mt-3">
    <div class="d-flex justify-content-between my-3">
        <h2>Questions</h2>
    </div>
    <table class="table table-dark">
        <tr>
            <th>Original</th>
            <th>Learning</th>
            <th></th>
        </tr>
        <tr v-for="question in questions" :key="question.id">
            <td>{{ question.original }}</td>
            <td>{{ question.learning }}</td>
        </tr>
    </table>
</div>
</template>

<script>
import * as questionService from "@/composables/question/question-service"
import { toRefs } from 'vue';

export default {
    setup() {
        const { original, learning } = toRefs(questionService.formData);

        const { questions } = questionService.useQuestionState();

        return {
            original,
            learning,
            questions,
        }
    }
}
</script>

<style scoped>
</style>