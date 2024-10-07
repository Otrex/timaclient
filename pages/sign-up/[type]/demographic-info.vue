<template>
    <div>
        <NuxtLayout name="auth">
            <div class="text-right">
                <UiProfileProgress :percent="authStore.progress" />
            </div>

            <div class="pb-[30px]">
                <div class="mb-[3.75rem]">
                    <h1 class="text-[2.4375rem] mb-[1.5rem]">
                        Audience Demographic Information
                    </h1>
                    <p>
                        Input demographic information (gender, age, & location) of your audience.
                    </p>
                </div>

                <div class="pb-[40px] mx-auto flex flex-col items-center justify-center">
                    <div>
                        <div class="">
                            <p class="text-[#333333] text-xl text-[23.44px] text-left">
                                1. What is the gender distribution of your audience?
                            </p>

                            <div class="flex gap-x-4 items-center my-6">
                                <p class="w-auto">13-25 years:</p>
                                <input type="range" class="w-full" />
                                <p class="w-auto">40%</p>
                            </div>
                        </div>

                        <div class="mt-8">
                            <p class="text-[#333333] text-xl text-[23.44px] text-left">
                                2. What is the age distribution of your audience?
                            </p>

                            <div class="mt-4 flex flex-col gap-y-4">
                                <div class="flex gap-x-4 items-center w-full">
                                    <p>13-25 years:</p>
                                    <input type="range" class="w-full" />
                                    <p>40%</p>
                                </div>

                                <div class="flex gap-x-4 items-center">
                                    <p>26-40 years:</p>
                                    <input type="range" class="w-full" />
                                    <p>40%</p>
                                </div>

                                <div class="flex gap-x-4 items-center">
                                    <p>41-60 years:</p>
                                    <input type="range" class="w-full" />
                                    <p>40%</p>
                                </div>

                                <div class="flex gap-x-4 items-center">
                                    <p>60+ years:</p>
                                    <input type="range" class="w-full" />
                                    <p>40%</p>
                                </div>
                            </div>
                        </div>

                        <div class="mt-8">
                            <p class="text-[#333333] text-xl text-[23.44px] text-left">
                                3. Where is your audience located?
                            </p>

                            <div class="mt-4 flex flex-col gap-y-4">
                                <div class="flex gap-x-4">
                                    <input type="radio" />
                                    <p>40%</p>
                                </div>

                                <div class="flex gap-x-4">
                                    <input type="radio" />
                                    <p>40%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="tm__box-598px pb-[60px]">
                    <UiButtonDefault @click="toProfileReview" class="w-full py-[0.875rem] mb-[2rem]" label="Continue"
                        variant="primary" />
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
import type { Core } from "~/lib/interfaces";

definePageMeta({
    name: "SignUpDemographicInfo",
});


const { notify } = useNotification();
const openModal = ref<Record<string, boolean>>({});
const optionsStore = useOptionsStore();
const rules = useValidationRules();
const authStore = useAuthStore();

const form = reactive({
    name: "",
    handle: "",
    accessToken: "",
});

async function addSocial() {
    await validate();
    await execute();
}

const { state, execute, v$, validate } = useRequestState({
    validation: {
        rule: rules.ADD_SOCIAL_VALIDATION,
        form,
    },
    action: () =>
        authStore.updateSocials({
            ...form,
        }),
    onSuccess(response) {
        notify({
            type: "success",
            title: response.title,
            text: "Social Account updated",
        });

        Object.keys(openModal.value).forEach((key) => {
            openModal.value[key] = false;
        });
    },
    onError(error) {
        notify({
            type: "error",
            title: error.title,
            text: error.description,
        });
    },
});

function toProfileReview() {
    navigateTo({
        name: "SignUp",
        query: { tab: constants.REVIEW_PROFILE },
    });
}
</script>

<style></style>