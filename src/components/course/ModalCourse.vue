<template>
<!-- Modal -->
<div class="modal fade" id="modal-course" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ modalAttrs.title }} Course</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form>
                    <BaseInput type="text" id="product-name" :validator="$v.name" label="Name" v-model="$v.name.$model" />

                    <div class="form-group">
                        <label for="course-description" class="col-form-label">Description:</label>
                        <textarea class="form-control" id="course-description" rows="5" v-model="description" />
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">
                    Close
                </button>
                <button
                    type="button"
                    :class="['btn', modalAttrs.classes]"
                    @click="submit"
                    :disabled="$v.$errors.length"
                >
                    {{ modalAttrs.title }}
                </button>
            </div> <!-- End Footer -->
        </div> <!-- End Content -->
    </div>
  </div>
  <!-- End Modal -->
</template>

<script>
/* eslint-disable vue/no-unused-components */
import * as courseService from "@/composables/course/course-service"
import {
    minValue,
    required,
    numeric,
    integer
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
        $('#modal-course').on('hidden.bs.modal', function (e) {
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
                this.modalAttrs.clickEvent()
        }
    },
    setup() {
        const MODAL_STATE = courseService.MODAL_STATE;
        const modalData = courseService.modalData;
        const modalAttrs = courseService.modalAttrs;
        const openModal = courseService.openModal;

        const {
            name,
            description,
        } = toRefs(modalData);

        return {
            /* Fields */
            name,
            description,

            modalAttrs,
        };
    },
};
</script>

<style>
</style>
