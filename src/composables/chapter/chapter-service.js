import {
    computed,
    reactive,
    ref,
} from "vue";
import $ from "jquery"

import { useToast, CHAPTER } from "@/composables/toast"
import { getSyncFirestore } from "@/scripts/firebase-config"
import * as courseService from "@/composables/course/course-service"


const { addToast } = useToast();


/* State */
const chapters = ref([]);
const currentChapter = ref(null);

export const formData = reactive({
    id: null,
    name: null,
    order: null
})

export const modalFormData = reactive({
    id: null,
    name: null,
    order: null
})

export const useChapterState = function() {
    return {
        currentChapter: computed(() => currentChapter.value),
        chapters: computed(() => chapters.value),
    }
}


/* Method */
import * as chapterRepository from "@/composables/chapter/chapter-repository"

export const handleAddChapter = () => {
    const { currentCourse } = courseService.useCourseState();
    
    const chapter = {
        id: formData.id,
        name: formData.name,
        order: formData.order,
    }
    const courseId = currentCourse.value.id;

    chapterRepository.createChapter(chapter, courseId).then(res => {
        clearFormData();
        addToast(CHAPTER.CREATE.SUCCESS); // notify
    }).catch(err => {
        console.error(err);
        addToast(CHAPTER.CREATE.FAIL); // notify
    });
}

const clearFormData = function() {
    formData.id = null;
    formData.name = null;
    formData.order = null;
}

export const openUpdateChapterModal = (chapter) => {
    modalFormData.id = chapter.id;
    modalFormData.name = chapter.name;
    modalFormData.order = chapter.order;

    $('#modal-chapter').modal('show')
}

export const handleUpdateChapter = function() {
    const { currentCourse } = courseService.useCourseState();
    
    chapterRepository.updateChapter({ ...modalFormData }, currentCourse.value.id).then(res => {
        addToast(CHAPTER.UPDATE.SUCCESS); // notify
    }).catch(err => {
        console.error(err);
        addToast(CHAPTER.UPDATE.FAIL); // notify
    })

    $("#modal-chapter").modal('hide')
}

export const handleDeleteChapter = (chapter) => {
    if(!confirm(`Are you really want to remove [${chapter.name}] chapter ?`))
        return;
    
        const { currentCourse } = courseService.useCourseState();
    chapterRepository.deleteChapter(chapter.id, currentCourse.value.id).then(res => {
        addToast(CHAPTER.DELETE.SUCCESS); //notify
    }).catch(err => {
        console.error(err);
        addToast(CHAPTER.DELETE.FAIL); // notify
    })
}

export const fetchDetailChapter = async (id) => {
    try {
        const { currentCourse } = courseService.useCourseState();
        const courseId = currentCourse.value.id;

        const snap = await chapterRepository.getChapter(courseId, id);
        const chapter = {
            id: snap.id,
            ...snap.data()
        }
        
        currentChapter.value = chapter;
        return chapter;
    } catch(err) {
        console.log(err);
    }
}

export const fetchChapters = (ref) => {
    getSyncFirestore(ref, chapters.value);
}