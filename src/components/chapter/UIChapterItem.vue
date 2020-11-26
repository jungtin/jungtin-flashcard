<template>
<router-link :to="{name: 'chapter-detail', params: { chapterId: chapter.id }}"
    v-slot="{ isActive, navigate }" custom>

    <div :class="['chapter-info', {active: isActive}]" @click="navigate">
        <div>
            <h2 class="lead chapter-lead">{{ chapter.name }}</h2>
            <button class="btn btn-warning mr-2 btn-sm" @click="openUpdateChapterModal(chapter)">Update</button>
            <button class="btn btn-outline-danger btn-sm" @click="handleDeleteChapter(chapter)">Remove</button>
        </div>
        <div class="chapter-order-container">
            <IconArrowUp
                @click.stop="handleUpdateOrder(chapter, UPDATE_ORDER_STATE.INCREMENT)" 
                class="chapter-order-icon" />
            <IconArrowDown 
                @click.stop="handleUpdateOrder(chapter, UPDATE_ORDER_STATE.DECREMENT)" 
                class="chapter-order-icon" />
        </div>
    </div>
</router-link>
</template>

<script>
import IconArrowUp from '@/components/ui/IconArrowUp.vue';
import IconArrowDown from '@/components/ui/IconArrowDown.vue';

import * as chapterService from "@/composables/chapter/chapter-service"
export default {
    components: {
        IconArrowUp,
        IconArrowDown,
    },
    props: {
        chapter: {
            type: Object,
            required: true
        }
    },
    setup() {
        const openUpdateChapterModal = chapterService.openUpdateChapterModal;
        const handleDeleteChapter = chapterService.handleDeleteChapter;
        const UPDATE_ORDER_STATE = chapterService.UPDATE_ORDER_STATE;
        const handleUpdateOrder = chapterService.handleUpdateOrder;


        return {
            UPDATE_ORDER_STATE,

            /* Methods */
            openUpdateChapterModal,
            handleDeleteChapter,
            handleUpdateOrder,
        }
    }
}
</script>

<style scoped>
.chapter-info {
    padding: 5px 5px 5px 7px;
    background: white;
    border-bottom: 2px dashed rgba(0, 0, 0, .5);

    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.chapter-info.active {
    background: rgba(38, 166, 154, 1.0);
    color: white;
}

.chapter-info.active .chapter-order-icon {
    background: white;
    color: rgba(38, 166, 154, 1.0);
}

.chapter-lead {
    max-width: 100%;
    overflow-wrap: anywhere;
}

.chapter-order-container {
    /* background: grey; */
    width: 40px;
    height: 65px;
    margin-left: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.chapter-order-icon {
    padding: 3px;
    box-sizing: content-box;
    border-radius: 7px;
    box-shadow: -2px 6px 16px 1px rgba(0, 0, 0, 0.75);
    cursor: pointer;
}

.chapter-order-icon:hover {
    background: rgba(38, 166, 154, 1.0);
    color: white;
}
</style>