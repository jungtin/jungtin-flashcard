<template>
<div class="text-white mt-3">
    <div class="d-flex justify-content-between my-3">
        <h2>Questions</h2>
        <button class="btn btn-success ml-3" @click="isShowCreateForm = !isShowCreateForm">Add new Question</button>
    </div>
    <form @submit.prevent="handleCreateQuestion" v-show="isShowCreateForm">
        <table class="table table-borderless">
            <tr>
                <td><input type="text" class="form-control"
                    v-model="original"
                    placeholder="Original . . ."></td>
                <td><input type="text" class="form-control" 
                    v-model="learning"
                    placeholder="Learning . . ."></td>
            </tr>
            <tr>
                <td><button class="btn btn-success">Submit</button></td>
                <td></td>
            </tr>
        </table>
    </form>
    <table class="table table-dark" v-if="questions.length != 0">
        <tr>
            <th>Original</th>
            <th>Learning</th>
            <th></th>
        </tr>
        <UIQuestionItem v-for="question in questions" 
            :question="question"
            :key="question.id"/>
    </table>
    <h5 class="lead" v-else>There's no question yet !</h5>
</div>
</template>

<script>
import { reactive, ref, toRef, toRefs } from 'vue'
import { onBeforeRouteUpdate } from "vue-router"

import UIQuestionItem from './UIQuestionItem.vue';

import * as questionService from "@/composables/question/question-service"


export default {
    components: {
        UIQuestionItem
    },
    setup() {
        const isShowCreateForm = questionService.isShowCreateForm;
        const formData = questionService.formData;
        const handleCreateQuestion = questionService.handleCreateQuestion;

        const { original, learning } = toRefs(formData);

        const { questions } = questionService.useQuestionState();

        

        return {
            isShowCreateForm,
            original,
            learning,
            questions,

            handleCreateQuestion,
        }
    }
}
</script>

<style scoped>
</style>