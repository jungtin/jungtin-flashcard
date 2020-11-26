<template>
<div class="d-flex justify-content-around" id="question-modification">
    <button class="btn btn-success" @click="navigateToPractice">Practice</button>
    <button class="btn btn-primary" @click="navigateToModification">Modification</button>
    <button class="btn btn-info" @click="navigateToListing">Listing</button>
    <button class="btn btn-warning" @click="navigateToAddBulk">Add Bulk</button>
</div>
<router-view></router-view>
</template>

<script>
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

import * as chapterService from "@/composables/chapter/chapter-service"
import * as questionService from "@/composables/question/question-service"
import * as courseService from "@/composables/course/course-service"
import { questionsRef } from "@/scripts/firebase-config" 

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

        function navigateToModification() {
            router.push({
                name: "question-modification",
                params: { ...route.params }
            })
        }

        function navigateToPractice() {
            router.push({
                name: "question-practice",
                params: { ...route.params }
            })
        }

        function navigateToAddBulk() {
            router.push({
                name: "question-add-bulk",
                params: { ...route.params }
            })
        }

        onBeforeRouteUpdate(async (to, from, next) => {
            if (to.params.chapterId !== from.params.chapterId) {
                const chapterId = to.params.chapterId;
                chapterService.fetchDetailChapter(chapterId); // cái này là dùng cho sau này : Best Practice (lưu share state vào central)

                const { currentCourse } = courseService.useCourseState();
                const courseId = currentCourse.value.id;
                
                const ref = questionsRef(courseId, chapterId);
                questionService.fetchQuestions(ref);
            }

            // console.log("yeah yeah viewQuestion");

            next();
            /* 
                Đừng bao giờ bỏ next() bao trong if
                Vì Nested Route vẫn sẽ active beforeUpdate ở đây
            */
        })

        return {
            navigateToListing,
            navigateToAddBulk,
            navigateToModification,
            navigateToPractice,
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