<template>
  <section class="mt-[0.375rem]">
    <div
      style="--clr: rgba(228, 243, 255, 0.5)"
      class="bg-[--clr] p-[1.25rem] mb-[1.5rem]"
    >
      <div class="flex flex-col gap-[1.25rem]">
        <StatsMetrics
          :title="metric.title"
          :socials="metric.socials"
          :data="metric.data"
          justified
        />
      </div>
    </div>

    <div>
      <div class="mb-[1.875rem]">
        <UiInputText
          search
          placeholder="Search Influencers"
          class="mr-[1.75rem] max-w-[26.9375rem] placeholder:text-[color:--clr-grey-500] w-full border-[color:--clr-grey-500]"
        />
        <UiInputSelect
          class="max-w-[8.9375rem] w-full text-center border-[color:--clr-grey-500]"
          :options="tools.generationOptions(['all'])"
        />
      </div>

      <div>
        <table class="w-full x-table no-clr">
          <thead>
            <th class="font-normal text-left">Influencer’s name</th>
            <th class="font-normal">Amount paid</th>
            <th class="font-normal">Balance</th>
            <th class="font-normal">Payment date</th>
            <th class="font-normal">Payment status</th>
            <th class="font-normal">Payment method</th>
            <th></th>
          </thead>
          <tbody>
            <template v-for="(transaction, idx) in transactions" :key="idx">
              <tr>
                <td>
                  <div class="flex gap-[1rem] items-center flex-row">
                    <div>
                      <div
                        class="bg-[#D9D9D9] rounded-full overflow-hidden aspect-square w-[1.875rem]"
                      >
                        <img
                          class="w-full h-full object-cover"
                          :src="transaction.profilePicture"
                          v-if="transaction.profilePicture"
                          :alt="transaction.profilePicture"
                        />
                      </div>
                    </div>
                    <div>{{ transaction.influencerName }}</div>
                  </div>
                </td>
                <td class="align-middle text-center">
                  {{ tools.formatCurrency(transaction.earnings) }}
                </td>
                <td class="align-middle text-center">
                  {{ tools.formatCurrency(transaction.balance) }}
                </td>
                <td class="align-middle text-center">
                  {{ tools.formatDate(transaction.createdAt) }}
                </td>
                <td class="align-middle text-center">
                  <template v-if="transaction.status === 'successful'">
                    <span class="text-[#2DBA62]">Successful</span>
                  </template>
                  <template v-else-if="transaction.status === 'pending'">
                    <span class="text-[#FFCA5B]">Pending</span>
                  </template>
                  <template v-else>
                    <span>--</span>
                  </template>
                </td>
                <td class="align-middle text-center">
                  {{ transaction.paymentMethod }}
                </td>
                <td class="align-middle text-center">
                  <UtPayBalance :data-id="transaction.id" />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const metric = ref({
  title: "PAYMENTS",
  socials: [],
  data: [
    {
      value: tools.formatCurrency(35_000_000),
      label: "Total Budget",
    },

    {
      value: 40,
      label: "Influencers Paid",
    },

    {
      value: tools.formatCurrency(55_000_000),
      label: "Money disbursed",
    },

    {
      value: tools.formatCurrency(10_000_000),
      label: "Outstanding payment",
    },
  ],
});

const transactions = ref([
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "pending",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "pending",
    paymentMethod: "Flutterwave",
  },
  {
    id: Math.random(),
    profilePicture: undefined,
    influencerName: "Enioluwa",
    earnings: 500000,
    balance: 100000,
    createdAt: new Date().toDateString(),
    status: "successful",
    paymentMethod: "Flutterwave",
  },
]);
</script>

<style></style>
