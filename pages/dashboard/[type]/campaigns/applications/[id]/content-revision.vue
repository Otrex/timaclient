<template>
    <div class="px-4">
        <UiImg src="/assets/svg/content-revision-thumbnail.jpeg" alt="content-revision" class="w-full h-[200px]" />

        <div class="border border-[#BBBBBB] rounded-lg p-4 mt-9">
            <h1 class="text-lg font-semibold leading-[21.09px] text-[#333333] mb-2">Message</h1>
            <textarea class="outline-none shadow-none w-full h-full" rows="5" :value="contentRevisionValue"></textarea>
        </div>

        <div class="mt-12 flex items-center justify-center">
            <UiButtonDefault @click="() => submitContentRevision()" variant="primary" label="Submit"
                class="min-w-[21.875rem] p-2" />
        </div>
    </div>
</template>

<script lang="ts" setup>
definePageMeta({
    name: "Content Revision",
});
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const contentRevisionValue = ref(`Lorem ipsum dolor sit amet consectetur. Suscipit pulvinar dis elementum quis tellus augue. Porttitor pellentesque mollis non lacus quis arcu ipsum nec. Eget
massa neque ut imperdiet et. Et cum arcu ultrices mattis. Bibendum mauris enim vitae senectus arcu ipsum tortor. Lectus maecenas magna pharetra tempor
mauris etiam. Vitae viverra varius morbi tellus vel. Venenatis urna sagittis purus arcu ut auctor. Metus quam nisl venenatis sit.`);

const submitContentRevision = () => {
    console.log('texg');
    router.replace('attach-files');
};
</script>

<style></style>
