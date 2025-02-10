<template>
  <NuxtLayout name="admin">
    <template #main>
      <div class="py-5 px-8 pr-5">
        <section class="mb-5">
          <div class="flex flex-row gap-3 items-center">
            <div>
              <img
                x-src="https://i.pravatar.cc/100"
                :src="recordData?.profileImage"
                class="w-[3.75rem] h-[3.75rem] rounded-full object-cover"
                alt="User avatar"
              />
            </div>
            <div class="text-[1.75rem] capitalize font-semibold">
              {{ recordData?.name }}
            </div>
          </div>
        </section>

        <section class="flex flex-col gap-5 sm:flex-row w-full">
          <article class="w-full">
            <div class="border rounded-xl flex flex-col gap-8 p-5 w-full">
              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <User class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Username</p>
                  <p>--</p>
                </div>
              </div>

              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <Mail class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Email</p>
                  <p>{{ recordData?.email }}</p>
                </div>
              </div>

              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <Phone class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Phone</p>
                  <p>{{ recordData?.phone }}</p>
                </div>
              </div>

              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <Languages class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Language</p>
                  <p>English</p>
                </div>
              </div>

              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <FlaskRound class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">User Subscription</p>
                  <p>Free</p>
                </div>
              </div>

              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <UserCog2Icon class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">User Type</p>
                  <p>{{ recordData?.role }}</p>
                </div>
              </div>

              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <BoxSelectIcon class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Industry Selection</p>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="(industry, idx) in recordData?.industries || []"
                      :key="idx"
                      class="px-2 py-1 bg-gray-500 text-white text-sm rounded-md"
                      >{{ industry }}</span
                    >
                  </div>
                </div>
              </div>

              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <UserCog2Icon class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Account Created</p>
                  <p>{{ new Date(recordData?.created_at).toLocaleString() }}</p>
                </div>
              </div>
            </div>
          </article>
          <article class="w-full self-stretch">
            <div class="border rounded-xl p-5 flex flex-col gap-8 w-full mb-5">
              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <Flag class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Country</p>
                  <p>Nigeria</p>
                </div>
              </div>

              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <Locate class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">City</p>
                  <p class="capitalize">{{ recordData?.city }}</p>
                </div>
              </div>

              <div class="flex flex-row gap-5">
                <div class="flex items-center aspect-square justify-center">
                  <LocateFixedIcon class="size-5 text-muted-foreground" />
                </div>
                <div>
                  <p class="text-gray-500 text-sm">Address</p>
                  <p class="capitalize">{{ recordData?.address }}</p>
                </div>
              </div>
            </div>
            <div class="border rounded-xl mb-5 p-5 w-full">
              <p class="mb-4">Government Issued ID</p>

              <div class="bg-gray-50 p-3 rounded-xl">
                <section class="flex flex-row items-center mb-5 gap-3">
                  <div>
                    <UtSvg name="file" w="2rem" h="2.5rem" dim />
                  </div>
                  <div>
                    <p class="text-sm">Means Of ID</p>
                    <p class="text-sm text-gray-300">Driver's Licence</p>
                  </div>
                </section>

                <section>
                  <KitUiButton variant="outline" class="w-full">
                    View
                  </KitUiButton>
                </section>
              </div>
            </div>

            <div
              v-if="recordData?.status !== 'PROFILE_APPROVED'"
              class="flex flex-row gap-5"
            >
              <div class="w-full">
                <UiButtonDefault
                  @click="showDecline = true"
                  variant="outline-primary"
                  class="w-full py-3 text-sm"
                >
                  Decline
                </UiButtonDefault>
              </div>
              <div class="w-full">
                <UiButtonDefault
                  @click="review"
                  :loading="reviewing == 'LOADING'"
                  :disabled="reviewing == 'LOADING'"
                  variant="primary"
                  class="w-full py-3 text-sm"
                >
                  Approved
                </UiButtonDefault>
              </div>
            </div>
          </article>

          <UiModalSuccessModal
            ref="successModal"
            message="Congratulations! an email will be sent to the brand informing
them that their account has been accepted"
          />

          <UtModal v-model:state="showDecline" m-width="31rem">
            <div class="bg-white shadow-lg px-6 py-10 rounded-2xl">
              <h3 class="text-center text-xl font-semibold">Decline Account</h3>
              <p class="text-center text-sm text-gray-500 mt-2 mb-6">
                Lorem ipsum dolor sit amet consectetur. Id non vel interdum quam
                facilisi augue nunc. Ac ut mauris scelerisque nisl vitae massa
                sed tempor amet. Ultricies nunc purus enim tortor.
              </p>

              <div>
                <label class="mb-1 text-sm w-full block">
                  Why are you declining this account?
                </label>
                <UiInputSelect
                  :options="[]"
                  class="w-full text-sm"
                  placeholder="Select Reason"
                />
              </div>

              <div class="flex flex-row gap-5 mt-8">
                <div class="w-full">
                  <UiButtonDefault
                    @click="showDecline = false"
                    variant="outline-primary"
                    class="w-full py-3 text-sm"
                  >
                    Cancel
                  </UiButtonDefault>
                </div>
                <div class="w-full">
                  <UiButtonDefault
                    variant="primary"
                    class="w-full py-3 text-sm"
                  >
                    Decline
                  </UiButtonDefault>
                </div>
              </div>
            </div>
          </UtModal>
        </section>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  User,
  Mail,
  Phone,
  Languages,
  SubscriptIcon,
  FlaskRound,
  User2,
  UserCog2Icon,
  BoxSelectIcon,
  Flag,
  Locate,
  LocateFixedIcon,
} from "lucide-vue-next";

const route = useRoute();
const api = useAPI();
const successModal = ref();
const showDecline = ref(false);
const recordData = ref<any>(null);
definePageMeta({
  name: "admin.requests.user",
});

onMounted(() => {
  const data = JSON.parse(localStorage.getItem("formStore") || "{}")?.value;
  recordData.value = data;
});

const { state: reviewing, execute: review } = useRequestState({
  action: async (review: any) => {
    return api.reviewUser({
      user_id: recordData.value?.userId,
      review: review,
    });
  },
  onSuccess: () => {
    successModal.value.open();
  },
  onError: () => {},
});

async function updateStatus(e: any, item: any) {
  item.loading = true;
  await api
    .reviewUser({
      user_id: item.userId,
      review: e.target.value,
    })
    .finally(() => {
      item.loading = false;
    });
}
</script>

<style></style>
