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
// export const handleAddQuestion = () => {
//     const { currentCourse } = courseService.useCourseState();
    
//     const question = {
//         id: formData.id,
//         name: formData.name,
//         order: formData.order,
//     }
//     const courseId = currentCourse.value.id;

//     questionRepository.createQuestion(question, courseId).then(res => {
//         clearFormData();
//         addToast(QUESTION.CREATE.SUCCESS); // notify
//     }).catch(err => {
//         console.error(err);
//         addToast(QUESTION.CREATE.FAIL); // notify
//     });
// }

// const clearFormData = function() {
//     formData.id = null;
//     formData.name = null;
//     formData.order = null;
// }

// export const openUpdateQuestionModal = (question) => {
//     modalFormData.id = question.id;
//     modalFormData.name = question.name;
//     modalFormData.order = question.order;

//     $('#modal-question').modal('show')
// }

// export const handleUpdateQuestion = function() {
//     const { currentCourse } = courseService.useCourseState();
    
//     questionRepository.updateQuestion({ ...modalFormData }, currentCourse.value.id).then(res => {
//         addToast(QUESTION.UPDATE.SUCCESS); // notify
//     }).catch(err => {
//         console.error(err);
//         addToast(QUESTION.UPDATE.FAIL); // notify
//     })

//     $("#modal-question").modal('hide')
// }

// export const handleDeleteQuestion = (question) => {
//     if(!confirm(`Are you really want to remove [${question.name}] question ?`))
//         return;
    
//         const { currentCourse } = courseService.useCourseState();
//     questionRepository.deleteQuestion(question.id, currentCourse.value.id).then(res => {
//         addToast(QUESTION.DELETE.SUCCESS); //notify
//     }).catch(err => {
//         console.error(err);
//         addToast(QUESTION.DELETE.FAIL); // notify
//     })
// }

export const fetchQuestions = (ref) => {
    questions.value = []; // reset trước khi fetch new

    getSyncFirestore(ref, questions.value);
}