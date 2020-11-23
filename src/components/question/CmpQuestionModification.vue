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
    <table class="table table-dark">
        <tr>
            <th>Original</th>
            <th>Learning</th>
            <th></th>
        </tr>
        <UIQuestionItem v-for="question in questions" 
            :question="question"
            :key="question.id"/>
    </table>
</div>
</template>

<script>
import { reactive, ref, toRef, toRefs } from 'vue'
import { onBeforeRouteUpdate } from "vue-router"

import UIQuestionItem from './UIQuestionItem.vue';

import * as questionService from "@/composables/question/question-service"
import * as courseService from "@/composables/course/course-service"
import * as chapterService from "@/composables/chapter/chapter-service"
import { questionsRef } from "@/scripts/firebase-config" 

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

        onBeforeRouteUpdate(async (to, from, next) => {
            if (to.params.chapterId !== from.params.chapterId) {
                const chapterId = to.params.chapterId;
                chapterService.fetchDetailChapter(chapterId); // cái này là dùng cho sau này : Best Practice (lưu share state vào central)

                const { currentCourse } = courseService.useCourseState();
                const courseId = currentCourse.value.id;
                
                const ref = questionsRef(courseId, chapterId);
                questionService.fetchQuestions(ref);
                next();
            }
        })

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