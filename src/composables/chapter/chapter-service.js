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
    prevRefId: null,
    nextRefId: null
})

export const modalFormData = reactive({
    id: null,
    name: null,
    prevRefId: null,
    nextRefId: null
})

export const useChapterState = function() {
    return {
        currentChapter: computed(() => currentChapter.value),
        chapters: computed(() => chapters.value),
    }
}


/* Method */
import * as chapterRepository from "@/composables/chapter/chapter-repository"

export const handleAddChapter = async () => {
    const { currentCourse } = courseService.useCourseState();
    
    const lastChapter = chapters.value.find(chapter => chapter.nextRefId === null);
    const chapter = {
        id: formData.id,
        name: formData.name,
        prevRefId: lastChapter === undefined ? null : lastChapter.id,
        nextRefId: null,
    }

    const courseId = currentCourse.value.id;
    try {
        const res = await chapterRepository.createChapter(chapter, courseId);
        const newResId = res.id;
        
        if(lastChapter !== undefined) {
            lastChapter.nextRefId = newResId; 
            await chapterRepository.updateChapter(lastChapter, courseId);
        }
    
        clearFormData();
        addToast(CHAPTER.CREATE.SUCCESS); // notify
    } catch(err) {
        console.error(err);
        addToast(CHAPTER.CREATE.FAIL); // notify
    }
}

const clearFormData = function() {
    formData.id = null;
    formData.name = null;
    formData.prevRefId = null;
    formData.nextRefId = null;
}

export const openUpdateChapterModal = (chapter) => {
    modalFormData.id = chapter.id;
    modalFormData.name = chapter.name;
    modalFormData.prevRefId = chapter.prevRefId;
    modalFormData.nextRefId = chapter.nextRefId;

    $('#modal-chapter').modal('show')
}

export const UPDATE_ORDER_STATE = {
    INCREMENT: 'inc',
    DECREMENT: 'dec'
};
export const handleUpdateOrder = function(chapter, STATE) {
    const { currentCourse } = courseService.useCourseState();
    const courseId = currentCourse.value.id;

    try {
        if(STATE === UPDATE_ORDER_STATE.INCREMENT) {
            if(chapter.nextRefId === null)
                return;

            const nextChapter = findChapter(chapter.nextRefId);
            if(nextChapter.nextRefId !== null) {
                const afterNextChapter = findChapter(nextChapter.nextRefId);
                afterNextChapter.prevRefId = chapter.id;

                chapterRepository.updateChapter(afterNextChapter, courseId);
            }
            
            if(chapter.prevRefId !== null) {
                const prevChapter = findChapter(chapter.prevRefId);
                prevChapter.nextRefId = nextChapter.id;

                chapterRepository.updateChapter(prevChapter, courseId);
            }
            
            /* Swap 2 cái rìa trước */
            chapter.nextRefId = nextChapter.nextRefId;
            nextChapter.prevRefId = chapter.prevRefId;
            
            /* Swap trung tâm */
            nextChapter.nextRefId = chapter.id;
            chapter.prevRefId = nextChapter.id;
            
            chapterRepository.updateChapter(chapter, courseId);
            chapterRepository.updateChapter(nextChapter, courseId);
            
        } else if(STATE === UPDATE_ORDER_STATE.DECREMENT) {
            if(chapter.prevRefId === null)
            return;
            
            const prevChapter = findChapter(chapter.prevRefId);
            if(prevChapter.prevRefId !== null) {
                const beforePrevChapter = findChapter(prevChapter.prevRefId);
                beforePrevChapter.nextRefId = chapter.id;

                chapterRepository.updateChapter(beforePrevChapter, courseId);
            }
            
            if(chapter.nextRefId !== null) {
                const nextChapter = findChapter(chapter.nextRefId);
                nextChapter.prevRefId = prevChapter.id;
                
                chapterRepository.updateChapter(nextChapter, courseId);
            }
            
            /* Swap 2 cái rìa trước */
            chapter.prevRefId = prevChapter.prevRefId;
            prevChapter.nextRefId = chapter.nextRefId;
            
            /* Swap trung tâm */
            prevChapter.prevRefId = chapter.id;
            chapter.nextRefId = prevChapter.id;
            
            chapterRepository.updateChapter(chapter, courseId);
            chapterRepository.updateChapter(prevChapter, courseId);
        }
        
        addToast(CHAPTER.UPDATE.SUCCESS); // notify
    } catch(err) {
        console.error(err);
        addToast(CHAPTER.UPDATE.FAIL); // notify
    }
}

/* 
    export const handleUpdateOrder = function(chapter, STATE) {
    const { currentCourse } = courseService.useCourseState();
    const courseId = currentCourse.value.id;

    try {
        if(STATE === UPDATE_ORDER_STATE.INCREMENT) {
            if(chapter.nextRefId === null)
                return;

            let nextChapter = findChapter(chapter.nextRefId);
            const temp1 = {...chapter};
            const temp2 = {...nextChapter};

            nextChapter.id = temp1.id;
            nextChapter.prevRefId = temp1.prevRefId;
            nextChapter.nextRefId = temp1.nextRefId;

            chapter.id = temp2.id;
            chapter.prevRefId = temp2.prevRefId;
            chapter.nextRefId = temp2.nextRefId;
        } else if(STATE === UPDATE_ORDER_STATE.DECREMENT) {
            if(chapter.prevRefId === null)
                return;
            
                let prevChapter = findChapter(chapter.prevRefId);
                const temp1 = {...chapter};
                const temp2 = {...prevChapter};
    
                prevChapter.id = temp1.id;
                prevChapter.prevRefId = temp1.prevRefId;
                prevChapter.nextRefId = temp1.nextRefId;
    
                chapter.id = temp2.id;
                chapter.prevRefId = temp2.prevRefId;
                chapter.nextRefId = temp2.nextRefId;
        }

        addToast(CHAPTER.UPDATE.SUCCESS); // notify
    } catch(err) {
        console.error(err);
        addToast(CHAPTER.UPDATE.FAIL); // notify
    }

}
*/


const findChapter = function(id) {
    return chapters.value.find(chapter => chapter.id === id);
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
    const courseId = currentCourse.value.id;

    try {
        if(chapter.prevRefId === null && chapter.nextRefId === null) {
            /* Không có linking */
            

        } else if(chapter.prevRefId === null && chapter.nextRefId !== null) {
            /* Ở Head */
            const nextChapter = findChapter(chapter.nextRefId);
            nextChapter.prevRefId = null;

    
            chapterRepository.updateChapter(nextChapter, courseId);
        } else if(chapter.prevRefId !== null && chapter.nextRefId === null) {
            /* Ở Tail */
            const prevChapter = findChapter(chapter.prevRefId);
            prevChapter.nextRefId = null;
    
            chapterRepository.updateChapter(prevChapter, courseId);
        } else {
            /* Ở Middle */
            const prevChapter = findChapter(chapter.prevRefId);
            const nextChapter = findChapter(chapter.nextRefId);
            prevChapter.nextRefId = nextChapter.id;
            nextChapter.prevRefId = prevChapter.id;
    
            chapterRepository.updateChapter(prevChapter, courseId);
            chapterRepository.updateChapter(nextChapter, courseId);
        }

        chapterRepository.deleteChapter(chapter.id, courseId);
        addToast(CHAPTER.DELETE.SUCCESS); //notify
    } catch(err) {
        console.error(err);
        addToast(CHAPTER.DELETE.FAIL); // notify
    }
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
    } catch(err) {
        console.log(err);
    }
}

export const fetchChapters = (ref) => {
    getSyncFirestore(ref, chapters.value);
}