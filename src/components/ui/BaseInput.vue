<template>
  <div class="form-group">
    <label :for="id" class="col-form-label">{{ label }}:</label>
    <input
      :type="type"
      :id="id"
      :class="['form-control', {'is-invalid': validator.$error }]"
      
      :value="modelValue"
      @input="onInput"

    />

    <template v-for="(err, i) in validator.$errors" :key="i">
      <div class="invalid-feedback">*{{ err.$message }}</div>
    </template>
  </div>
</template>

<script>
import { integer } from '@vuelidate/validators';
export default {
    emits: ["update:modelValue"],
    props: {
        label: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        validator: {
            type: Object,
            required: false,
            default: () => {
                return {
                    $error: false
                }
            }
        },
        modelValue: {
            type: [String, Number]
        },
        modelModifiers: {
            default: () => ({}) // must have this, nếu không sẽ bị lỗi undefined cho .number
        }
    },
    methods: {
        onInput(event) {
            if(this.modelModifiers.number) {
                this.$emit('update:modelValue', Number(event.target.value))
            } else {
                this.$emit('update:modelValue', event.target.value)
            }
        }
    }
};
</script>

<style>
</style>