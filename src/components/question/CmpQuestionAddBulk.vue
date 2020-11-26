<template>
<div class="text-white mt-3">
    <div class="d-flex justify-content-between my-3">
        <h2>Add Bulk</h2>
    </div>
    <div class="form-group">
        <textarea class="form-control" cols="30" rows="10" v-model="bulkInput"></textarea>
        <small class="form-text text-white">Use Excel or <a href="https://docs.google.com/spreadsheets/u/0/">Google Spreadsheets</a> to add</small>
    </div>
    <button class="btn btn-success" @click="submitBulk">Submit</button>
    <table class="table table-dark my-5" v-if="questions.length != 0">
        <tr>
            <th>Original</th>
            <th>Learning</th>
        </tr>
        <tr v-for="question in questions" :key="question.id">
            <td><input type="text" class="form-control"
                v-model="question.original"
                placeholder="Original . . ."></td>
            <td><input type="text" class="form-control" 
                v-model="question.learning"
                placeholder="Learning . . ."></td>
        </tr>
        <tr>
            <td colspan="2">
                <button class="btn btn-warning" id="button-insert-bulk" @click="insertBulk">Insert</button>
                <button class="btn btn-secondary mt-2" id="button-insert-bulk" @click="clearBulk">Clear</button>
            </td>
        </tr>
    </table>
</div>
</template>

<script>
import * as questionService from "@/composables/question/question-service"
import { ref, toRefs } from 'vue';

import * as questionBulkService from "@/composables/question/question-bulk-service"
import { useRoute, useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const route = useRoute();

        const questions = questionBulkService.questions;
        const bulkInput = questionBulkService.bulkInput;
        const submitBulk = questionBulkService.submitBulk;

        const { insertBulk } = questionBulkService.useInsertBulk(route, router);

        const clearBulk = questionBulkService.clearBulk;

        return {
            questions,

            bulkInput,
            submitBulk,
            insertBulk,
            clearBulk,
        }
    }
}
</script>

<style scoped>
#button-insert-bulk {
    width: 100%!important;
    font-weight: 600!important;
}
</style>