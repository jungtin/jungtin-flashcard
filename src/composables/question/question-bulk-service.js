import {
    ref,
} from "vue";

import { useToast, QUESTION_BULK } from "@/composables/toast"
import * as courseService from "@/composables/course/course-service"
import * as chapterService from "@/composables/chapter/chapter-service"

import * as questionRepository from "@/composables/question/question-repository"
import { useRoute, useRouter } from "vue-router";

const { addToast } = useToast();



/* State */
export const bulkInput = ref(null);
export const questions = ref([]);

/* Methods */
export const submitBulk = function() {
    const lines = bulkInput.value.split("\n");

    lines.forEach(line => {
        const data = line.split("\t");
        const original = data[0];
        const learning = data[1];

        if(original != undefined && original != "" && learning != undefined && learning != "") {
            questions.value.push({
                original: original,
                learning: learning
            });
        }

    });

    clearBulkForm();
}

export const clearBulkForm = function() {
    bulkInput.value = null;
}

export const useInsertBulk = function(route, router) {

    /* 
        Lý do sử dụng InsertBulk là vì : 
        nếu tạo insertBulk và truyền 2 thông số route, router vào
        thì lúc init insertBulk(route, router) nó sẽ chạy luôn

        Lý do cần truyền route & router là : 
        Nếu import useRoute & useRouter ngoài Vue Cmp thì nó sẽ là undefined
    */

    const insertBulk = async function() {
        const { currentCourse } = courseService.useCourseState();
        const { currentChapter } = chapterService.useChapterState();
    
        try {
            const promises = [];
            questions.value.forEach(question => {
                const promise = questionRepository.createQuestion(question, 
                    currentCourse.value.id,
                    currentChapter.value.id
                ) 
                promises.push(promise);
            });
    
            await Promise.all(promises);
            
            clearBulk();
            addToast(QUESTION_BULK.CREATE.SUCCESS); // notify
    
            navigateToListing(); // Navigating
        } catch(err) {
            console.error(err);
            addToast(QUESTION_BULK.CREATE.FAIL); // notify
        }
    }
    
    const navigateToListing = function() {
        router.push({
            name: "question-listing",
            params: { ...route.params }
        })
    }

    return {
        insertBulk
    }
}


export const clearBulk = function() {
    questions.value = [];
    bulkInput.value = null;
}


