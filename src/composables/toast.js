import { computed, reactive, readonly, ref } from "vue"

/* 
    NOTIFICATION
*/
export const COURSE = {
    CREATE: {
        SUCCESS: generateToastConfig("create", true, "course"),
        FAIL: generateToastConfig("create", false, "course")
    },
    UPDATE: {
        SUCCESS: generateToastConfig("update", true, "course"),
        FAIL: generateToastConfig("update", false, "course")
    },
    DELETE: {
        SUCCESS: generateToastConfig("delete", true, "course"),
        FAIL: generateToastConfig("delete", false, "course")
    },
}

export const CHAPTER = {
    CREATE: {
        SUCCESS: generateToastConfig("create", true, "chapter"),
        FAIL: generateToastConfig("create", false, "chapter")
    },
    UPDATE: {
        SUCCESS: generateToastConfig("update", true, "chapter"),
        FAIL: generateToastConfig("update", false, "chapter")
    },
    DELETE: {
        SUCCESS: generateToastConfig("delete", true, "chapter"),
        FAIL: generateToastConfig("delete", false, "chapter")
    },
}

export const QUESTION = {
    CREATE: {
        SUCCESS: generateToastConfig("create", true, "question"),
        FAIL: generateToastConfig("create", false, "question")
    },
    UPDATE: {
        SUCCESS: generateToastConfig("update", true, "question"),
        FAIL: generateToastConfig("update", false, "question")
    },
    DELETE: {
        SUCCESS: generateToastConfig("delete", true, "question"),
        FAIL: generateToastConfig("delete", false, "question")
    },
}




function generateToastConfig(action, success, tag) {
    var content;
    if(success) 
        content = `You've ${action.toLowerCase()} successfully new ${tag.toLowerCase()} !`
    else
        content = `Oops! Error: You can't ${action.toLowerCase()} ${tag.toLowerCase()} due to something !`

    return {
        heading: `${action.toUpperCase()} ${tag.toUpperCase()}`,
        content,
        success
    }
}
/* 
    Store
*/
const toasts = ref([]);

export const useToast = function() {
    /* Method */
    const addToast = (toast) => {
        const newToast = {
            id: Math.random().toString(36).substring(7),
            ...toast
        }
        toasts.value.push(newToast);
    } 

    const removeToast = (toast) => {
        const index =  toasts.value.findIndex(item => item.id === toast.id);
        toasts.value.splice(index, 1);
    }

    return {
        /* State */
        toasts: computed(() => toasts.value),
        /* Computed */
        /* Method */
        addToast,
        removeToast
    }
}
