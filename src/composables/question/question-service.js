import {
    computed,
    reactive,
    ref,
} from "vue";
import $ from "jquery"

import { useToast, QUESTION } from "@/composables/toast"
import { getSyncFirestore } from "@/scripts/firebase-config"
import * as courseService from "@/composables/course/course-service"
import * as chapterService from "@/composables/chapter/chapter-service"

import * as questionRepository from "@/composables/question/question-repository"

const { addToast } = useToast();



/* State */
export const isShowCreateForm = ref(false);
export const formData = reactive({
    original: null,
    learning: null,
});

const questions = ref([]);
export const useQuestionState = function() {
    return {
        questions: computed(() => questions.value)
    }
}

/* Method */
export const handleCreateQuestion = async function() {
    const question = {
        original: formData.original,
        learning: formData.learning,
    }

    // call repo
    const { currentCourse } = courseService.useCourseState();
    const { currentChapter } = chapterService.useChapterState();

    try {
        const res = await questionRepository.createQuestion(question, 
            currentCourse.value.id, 
            currentChapter.value.id);

        clearForm();
        addToast(QUESTION.CREATE.SUCCESS); // notify
    } catch(err) {
        console.error(err);
        addToast(QUESTION.CREATE.FAIL); // notify
    }
}

const clearForm = () => {
    formData.original = null;
    formData.learning = null;

    // isShowCreateForm.value = false;
}

export const handleUpdateQuestion = async function(question) {
    const { currentCourse } = courseService.useCourseState();
    const { currentChapter } = chapterService.useChapterState();

    try {
        const res = await questionRepository.updateQuestion(question, 
            currentCourse.value.id, 
            currentChapter.value.id);

        addToast(QUESTION.UPDATE.SUCCESS); // notify
    } catch(err) {
        console.error(err);
        addToast(QUESTION.UPDATE.FAIL); // notify
    }
}

export const handleDeleteQuestion = async function(question) {
    const questionId = question.id;

    const { currentCourse } = courseService.useCourseState();
    const { currentChapter } = chapterService.useChapterState();

    try {
        await questionRepository.deleteQuestion(questionId,
            currentCourse.value.id, 
            currentChapter.value.id)

        addToast(QUESTION.DELETE.SUCCESS); // notify
    } catch(err) {
        console.error(err);
        addToast(QUESTION.DELETE.FAIL); // notify
    }
}

export const fetchQuestions = (ref) => {
    questions.value = []; // reset trước khi fetch new

    getSyncFirestore(ref, questions.value);
}

export const fetchQuestionsOnce = async (courseId, chapterId) => {
    questions.value = []; // reset trước khi fetch new

    try {
        const snap = await questionRepository.getAllQuestions(courseId, chapterId);

        // await new Promise((res, rej) => {
        //     setTimeout(() => {
        //         res(123);
        //     }, 5000);
        // })

        snap.forEach(doc => {
            questions.value.push({
                id: doc.id,
                ...doc.data()
            })
        })
    } catch(err) {
        console.error("FETCH QUESTIONS ONCE FAIL");
        console.log(err);
    }
}