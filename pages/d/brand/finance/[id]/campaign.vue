<template>
  <div class="p-[1.25rem] px-8">
    <div class="flex flex-row mb-10 items-center gap-3">
      <div
        class="w-[3rem] h-[3rem] bg-gray-200 rounded-full overflow-hidden"
      ></div>
      <div class="text-sm">
        <h2 class="text-2xl font-semibold">
          Nike lebron shoe
          <DStatusView status="ongoing" size="sm" class="ml-2 font-normal" />
        </h2>
        <p class="text-[0.875rem]">TIMA subscription</p>
      </div>
    </div>

    <section>
      <div class="max-w-[500px]">
        <UiInputText placeholder="Search" class="mb-5" type="search" />
      </div>

      <div>
        <table class="w-full">
          <thead class="text-left">
            <th class="py-3">Influencer Name</th>
            <th>Posts/Deliverables</th>
            <th>Amount Spent</th>
            <th>Total</th>
          </thead>
          <tbody class="text-sm">
            <tr>
              <td>
                <div class="inline-flex flex-row items-center gap-3">
                  <div
                    class="w-[2.4rem] h-[2.4rem] bg-gray-100 rounded-lg overflow-hidden"
                  >
                    <UtSvg name="socials/tiktok" />
                  </div>
                  <div>Barry le</div>
                </div>
              </td>

              <td>
                <p class="text-sm">Instagram post: 5</p>
                <p class="text-sm">Tiktok post: 5</p>
              </td>

              <td>
                <p class="text-sm">Instagram post: $250</p>
                <p class="text-sm">Tiktok post: $500</p>
              </td>

              <td>
                <p class="text-sm">$750</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "BrandFinanceCampaign",
});
</script>

<style></style>
