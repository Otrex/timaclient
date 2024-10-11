<template>
  <div class="px-6">
    <div class="flex items-center justify-between">
      <h1 class="text-[22px] font-semibold text-[#333333]">Notification</h1>

      <div class="text-right mt-6 mb-[3.75rem]">
        <UiInputDropdown
          class="max-w-[17.5rem] flex w-full"
          v-model="filter"
          :options="[
            'Last 7 days',
            'Last 14 days',
            'Last 30 days',
            'Last 90 days',
          ]"
        >
          <template #select="{ data, isOpen }">
            <div class="flex flex-row gap-2 justify-between items-center">
              <div class="flex items-center">
                <UtSvg name="calendar" class="w-[1.5rem] h-[1.5rem]" />
              </div>
              <div class="text-[#828282]">{{ data }}</div>
              <div class="flex items-center">
                <UtSvg
                  name="down-caret"
                  class="w-[1rem] h-[1rem] transition-all"
                  :class="isOpen && 'rotate-180'"
                />
              </div>
            </div>
          </template>
          <template #item="{ data }">
            <button class="w-full py-2 px-2 hover:bg-gray-100">
              {{ data }}
            </button>
          </template>
        </UiInputDropdown>
      </div>
    </div>

    <div class="rounded-xl p-8 border border-[#D8D8D8] flex flex-col mb-6">
      <template v-if="state === constants.LOADING">
        <UtSpinner />
      </template>
      <template v-else>
        <div
          class="flex justify-between items-center py-8 border-b border-[#BBBBBB] last:border-none"
          v-for="(item, idx) of reviews"
          :key="idx"
          :class="[idx === 0 && 'pt-0', idx === reviews.length - 1 && 'pb-0']"
        >
          <div>
            <div
              :class="{
                'bg-[#30DE80]': item.type === 'registration',
                'bg-[#FFBB00]': item.type === 'withdrawal',
              }"
              class="text-white py-2 px-6 inline-block capitalize rounded-lg"
            >
              {{ item.type }}
            </div>

            <div role="separator" class="my-2"></div>

            <h1 class="text-[#545454] text-lg font-semibold mb-2">
              {{ item.title }}
            </h1>

            <div role="separator" class="my-2"></div>

            <p class="text-[#777777] text-base font-normal">
              {{ item.content }}
            </p>

            <div role="separator" class="my-2"></div>

            <div class="flex gap-2">
              <UtSvg name="clock" dim w="24px" h="24px" />
              <p class="text-[#777777]">
                {{ tools.formatDate(item.createdAt) }}
              </p>
            </div>
          </div>

          <div>
            <button
              class="border border-[#BBBBBB] text-[#BBBBBB] py-3 px-10 rounded-xl"
              @click="() => openUser(item)"
            >
              Review
            </button>
          </div>
        </div>
      </template>
    </div>

    <!-- modal -->
    <UtModal
      v-model:state="modalState"
      m-width="815px"
      content-class="mx-auto mt-[10%]"
      backdrop-color="rgba(0,0,0,.3)"
    >
      <ModalsNewUser
        @close="modalState = false"
        :id="currentReview?.id!"
        :phone="currentReview?.users.phoneNumber!"
        :username="
          currentReview?.users.username ||
          [
            (currentReview?.users.firstName, currentReview?.users.lastName),
          ].join(' ')
        "
        :email="currentReview?.users.emailAddress!"
        :date="currentReview?.users.createdAt!"
        :role="currentReview?.users.role!"
      />
    </UtModal>

    <UtPaginate
      v-model:current-page="pageData.page"
      :limit="pageData.limit"
      :total="pageData.total"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { UserType } from "~/lib/enums";
import type { Core } from "~/lib/interfaces";

const api = useAPI();

type IReviews = {
  type: string;
  id: string;
  title: string;
  content: string;
  createdAt: string;
  users: Core.UserReviewResponse["data"][number]["profile"] & {
    emailAddress: string;
    phoneNumber: string;
    role: UserType;
    username: string;
  };
};

const reviews = ref<IReviews[]>([]);

const currentReview = ref<IReviews>();
const pageData = reactive({
  page: 1,
  limit: 20,
  total: 0,
});

const filter = ref("Last 28 days");
const modalState = ref(false);

definePageMeta({
  name: "Admin Notification",
  middleware: [async () => {}],
});

function openUser(user: IReviews) {
  modalState.value = true;
  currentReview.value = user;
}

const { state, execute } = useRequestState({
  immediately: true,
  action: () =>
    api.fetchUserReviews({ limit: pageData.limit, page: pageData.page }),
  onSuccess: (response) => {
    pageData.total = response.totalUsers;
    pageData.page = response.page;
    pageData.limit = response.limit;

    reviews.value = response.data.map((e) => ({
      id: e?.id,
      title: `New Registration: ${
        [e?.profile?.firstName, e?.profile?.otherName, e?.profile?.lastName]
          .filter(Boolean)
          .join(" ") || e.userName
      }`,
      type: "registration",
      createdAt: e?.profile.createdAt,
      users: {
        ...e?.profile,
        emailAddress: e?.emailAddress,
        phoneNumber: e?.phoneNumber,
        username: e?.userName,
        role: e?.role,
      },
      content: `Hello Admin, We are excited to inform you that a new user has just joined our platform.`,
    }));
  },
});

watch(
  () => pageData.page,
  () => {
    execute();
  },
  { immediate: true }
);
</script>

<style></style>
