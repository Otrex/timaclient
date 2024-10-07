<template>
    <div class="px-4">
        <UiImg src="/assets/svg/content-revision-thumbnail.jpeg" alt="content-revision" class="w-full h-[200px]" />

        <div class="mt-8">
            <h1 class="text-2xl font-semibold leading-[28.13px] text-[#333333] mb-2">Schedule Post</h1>
            <p class="text-base font-semibold leading-[18.75px] text-[#333333] mb-6">Choose when your post will be
                shared
            </p>
            <div class="border border-[#BBBBBB]"></div>
        </div>


        <div class="flex mt-12">
            <div class="md:w-5/12">
                <Calendar />
            </div>

            <div class="md:w-7/12">
                <div class="mb-6">
                    <h1 class="text-2xl font-semibold leading-[28.13px] text-[#333333] mb-2">Time</h1>
                    <DatePicker mode="time" />
                </div>

                <textarea
                    class="text-lg leading-[21.09px] outline-none shadow-none w-5/12 h-auto rounded-lg border-[2px] border-[#2DA2FD] text-[#B0B0B0] placeholder:text-[#B0B0B0]"
                    resize="none" placeholder="Time zone: (GMT +1:00) Lagos/Nigeria"></textarea>
            </div>
        </div>

        <div class="mt-12 flex items-center justify-center">
            <UiButtonDefault @click="() => submitContentRevision()" variant="primary" label="Apply"
                class="min-w-[21.875rem] p-2" />
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    name: "Accepted Content",
});
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Calendar, DatePicker } from "v-calendar";
import "v-calendar/style.css";
// const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
    modelValue: {
        type: [Date, Array, Object],
        default: () => new Date(),
    },
});


const route = useRoute();
const router = useRouter();

const submitContentRevision = () => {
    console.log('texg');
    router.replace('attach-files');
};

const range = computed({
    get() {
        return new Date();
    },
    set(value) {
        // emits("update:modelValue", value);
    },
});
</script>

<style></style>
