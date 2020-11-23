<template>
<tr>
    <td><input type="text" class="form-control" v-model.lazy="original"></td>
    <td><input type="text" class="form-control" v-model.lazy="learning"></td>
    <td>
        <button class="btn btn-sm btn-danger" @click="handleDeleteQuestion(question)">
            <IconCross/>
        </button>
    </td>
</tr>
</template>

<script>
import IconCross from '@/components/ui/IconCross.vue';
import { computed, reactive, ref, toRef, toRefs } from 'vue'
import * as questionService from "@/composables/question/question-service"

export default {
    components: {
        IconCross
    },
    props: {
        question: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
        const original = computed({
            get: () => props.question.original,
            set: newValue => {
                questionService.handleUpdateQuestion({
                    id: props.question.id, // nhớ truyền thằng này vào ! không là ngủm đấy
                    original: newValue
                })
            }
        })

        const learning = computed({
            get: () => props.question.learning,
            set: newValue => {
                questionService.handleUpdateQuestion({
                    id: props.question.id,
                    learning: newValue
                })
            }
        })


        const handleDeleteQuestion = questionService.handleDeleteQuestion;

        return {
            original,
            learning,

            handleDeleteQuestion,
        }
    }
}
</script>

<style scoped>
</style>