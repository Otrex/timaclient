<template>
  <UtLoadPresenter
    not-found-message="Influencer data not found"
    loading-message="Fetching Influencer details"
    :data="result === null"
    :state="state"
  >
    <section class="bg-[#F7F7F7] p-[1.25rem] h-full rounded-md">
      <div class="flex flex-row mb-[2.5rem] justify-between">
        <div class="flex flex-row gap-[0.75rem] items-center">
          <div class="flex items-center">
            <div class="w-[4rem] h-[4rem] rounded-full overflow-hidden">
              <UiImg
                :src="result?.profilePicture"
                class="w-full h-full object-cover"
                alt="user profile"
              />
            </div>
          </div>
          <div>
            <h4 class="font-bold">{{ result?.fullName }}</h4>
            <p class="nl mb-[0.75rem]">{{ result?.username }}</p>
            <UiInputStars :length="6" v-model="stars" :disabled="false" />
          </div>
        </div>

        <div class="text-right">
          <div>
            <button
              class="active:ring-2 inline-block hover:bg-slate-50 rounded-md active:ring-slate-100"
            >
              <UtSvg
                name="bookmark-solid"
                class="text-[#999]"
                w="1.3125rem"
                h="1.3125rem"
                dim
              />
            </button>
          </div>
          <!-- <div class="w-[9.375rem]">
            <Doughnut :data="data" class="inline-block" :options="options" />
          </div> -->
        </div>
      </div>

      <div class="bg-[--clr-blue-100] mb-[1.5rem] py-[1.0625rem] text-center">
        Campaigns completed: 86
      </div>

      <div class="mb-[2.1875rem]">
        <p class="nl font-bold">Bio</p>
        <p class="nl">
          Lorem ipsum dolor sit amet consectetur. Hendrerit varius tristique
          scelerisque purus. Purus mauris lacus volutpat convallis elementum
          fringilla nam vulputate phasellus. Volutpat pulvinar ac dolor mauris
          mauris consequat mauris nibh. Tincidunt tincidunt sed eget natoque in
          turpis neque auctor ullamcorper.
        </p>
      </div>

      <div class="mb-[1.5rem]">
        <p class="nl">Languages: <b>English</b></p>
      </div>

      <div>
        <p class="nl">Categories</p>
        <div class="flex flex-wrap gap-3">
          <template v-for="(category, idx) in categories" :key="idx">
            <div
              class="text-[0.875rem] rounded text-white bg-[#696969] px-[0.6875rem] py-[0.125rem]"
            >
              {{ category }}
            </div>
          </template>
        </div>
      </div>
    </section>
  </UtLoadPresenter>
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import type { GetApplication } from "~/lib/interfaces/response";

const props = defineProps<{ publicId: string }>();

const categories = ref(["fish", "obi", "eticulaoi"]);
const stars = ref(0);
const data = ref({
  labels: ["Hot", "Warm", "Cold"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      borderWidth: 0,
      pointStyle: "circle",
    },
  ],
});

const api = useAPI();
const result = ref<GetApplication["data"]>();
const { state } = useRequestState({
  immediately: true,
  action: () => api.getApplicationById(props.publicId),
  onSuccess: (response) => {
    result.value = response.data;
  },
});

const options = ref<any>({
  responsive: true,
  rotation: -90,
  aspectRatio: 1.5,
  circumference: 180,
  plugins: {
    legend: {
      position: "right",
      itemSpacing: 2,
      labels: {
        boxWidth: 10,
        fontSize: 8, // Adjust the box width as needed
        pointStyle: "circle",
      },
    },
  },
});
</script>
<style></style>
