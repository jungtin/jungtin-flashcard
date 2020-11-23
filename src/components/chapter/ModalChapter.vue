<template>
<!-- Modal -->
<div class="modal fade" id="modal-chapter" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Update Chapter</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="submit">
                    <BaseInput type="text" id="modal-chapter-name" :validator="$v.name" label="Name" v-model="$v.name.$model" />
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                </button>
                <button
                    type="button"
                    class="btn btn-success"
                    @click="submit"
                    :disabled="$v.$errors.length"
                >
                    Update
                </button>
            </div> <!-- End Footer -->
        </div> <!-- End Content -->
    </div>
  </div>
  <!-- End Modal -->
</template>

<script>
/* eslint-disable vue/no-unused-components */
import * as chapterService from "@/composables/chapter/chapter-service";
import {
    required
} from "@vuelidate/validators"
import $ from "jquery"

import {
    toRefs
} from 'vue';
import BaseInput from '@/components/ui/BaseInput.vue';

export default {
    components: {
        BaseInput
    },
    mounted() {
        const vm = this; // phải dùng cái này
        $('#modal-chapter').on('hidden.bs.modal', function (e) {
            vm.$v.$reset();
        })
    },
    validations() {
        return {
            name: {
                required
            },
        }
    },
    methods: {
        submit() {
            this.$v.$touch();
            if (!this.$v.$error)
                this.handleUpdateChapter();
        }
    },
    setup() {
        const {
            name
        } = toRefs(chapterService.modalFormData);
        
        const handleUpdateChapter = chapterService.handleUpdateChapter;

        return {
            name,

            handleUpdateChapter
        };
    },
};
</script>

<style>
</style>
