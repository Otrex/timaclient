<template>
  <div class="p-[1.875rem]">
    <div class="flex flex-row mb-[3.4375rem] items-center justify-between">
      <div>
        <h2 class="font-bold">Applicant profile</h2>
      </div>
      <div>
        <NuxtLink :to="`/dashboard/campaign/influencer/${idx}`">
          <UiButtonDefault
            variant="info"
            class="!px-[1rem] !py-[0.375rem]"
            label="View Influencer Page"
          />
        </NuxtLink>
      </div>
    </div>

    <div class="flex items-center mb-[3.75rem] gap-[2.4375rem]">
      <div>
        <div class="rounded-full overflow-hidden w-[7.5625rem] h-[7.5625rem]">
          <img
            src="https://s3-alpha-sig.figma.com/img/c00f/0b20/da471d6cb09bd64153646a234aa984ed?Expires=1704067200&Signature=A-ZYjlb4e~J4o-hYxge3pYsbct1Ys-zQfKZtUsdomtws74kbi7CsM16uKpmO9I-BJghd43IxiJC1WTXGMVI-qvASA9M1MtG06wjevgUCs0ZqOo97W2O7IHwyOumhLDxPJRYtxWbLet64L9ExXZ3bO-ykgq-D-JgPpDWkqmOarNUxt1A2oRKwWn3QDQ1BcvLe-JZ0kAGksxbHNn8uAvZpYSlN~M7kHXhmT7-ERXxh1rr1ViF~-jWmnsScoIX1TjN69PmpJwXLToxPaLIDnlT9JtdX1EsKLjEJR5kZBddo3HFZJJ8qJhhJcGBqKBESZkFiBVJVgnIdmI7D01FXz3-JtQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
            alt="profile picture"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <table>
          <tr>
            <td class="pb-[0.625rem]"><p class="nl">Influencer name:</p></td>
            <td class="pb-[0.625rem]"><p>John Doe</p></td>
          </tr>
          <tr>
            <td class="pb-[0.625rem]"><p class="nl">Email address:</p></td>
            <td class="pb-[0.625rem]"><p>johndoe@gmail.com</p></td>
          </tr>
          <tr>
            <td><p class="nl">Phone number:</p></td>
            <td><p>09024968035</p></td>
          </tr>
        </table>
      </div>
    </div>

    <section
      class="bg-[#F3FAFF] gap-[1.875rem] flex flex-row rounded-[2.0625rem] p-[1.875rem]"
    >
      <div class="w-full">
        <p class="uppercase mb-[1.875rem]">Campaign Information</p>
        <article>
          <div class="flex mb-[3.125rem] md:flex-row gap-[3.125rem]">
            <div>
              <p class="nl">Campaign name:</p>
              <p class="text-[color:--clr-grey-400]">NIke shoe campaign</p>
            </div>

            <div>
              <p class="nl">Campaign budget:</p>
              <p class="text-[color:--clr-grey-400]">3, 000 000</p>
            </div>
          </div>

          <div class="max-w-[24.125rem] md:max-w-full mb-[3.125rem]">
            <p class="nl">Campaign description:</p>
            <p class="text-[color:--clr-grey-400]">
              Experience the future of flavor with our innovative culinary
              creations, redefining taste one bite at a time.
            </p>
          </div>
        </article>

        <p class="uppercase mb-[1.875rem]">Influencer’s Information</p>
        <article class="max-w-[24.125rem] md:max-w-full mb-[3.125rem]">
          <p class="nl">Influencers reason to be selected:</p>
          <p class="text-[color:--clr-grey-400]">
            Experience the future of flavor with our innovative culinary
            creations, redefining taste one bite at a time.
          </p>
        </article>
      </div>

      <div class="w-full">
        <div
          class="bg-[color:--clr-grey-700] mb-[2.5rem] rounded-[1.1875rem] p-[2.25rem]"
        >
          <p class="uppercase text-white mb-[1.875rem]">CONTENT SAMPLES</p>

          <div class="bg-[color:--clr-grey-400] rounded-md overflow-hidden">
            <div
              tabindex="1"
              class="aspect-[250/327] mx-auto h-[23.4375rem] overflow-hidden z-[1] relative video-content-bg flex items-center justify-center"
            >
              <div class="absolute inset-0 z-[-1]">
                <img
                  src="https://s3-alpha-sig.figma.com/img/128e/110a/3e644d9a1277ab2f9c0f9b05ffa9a7d9?Expires=1704067200&Signature=a9H4L822~YsdF~aTRgwIMMiBy2eEdBZwxvuyd2BfM2BVvc7P2l2u80e~GNhfv98VhL1rGNn6zoupI8qwZUkcTNWqOuXiIpebNwzhjvFgtWZgPdu4RlzlxojLyWCu5h0sjhxdqxbcSUXuEq1NEmhocnCpvWYsYowj4Y5mrADkdKlozIr96tmQa03gDS9F3e6OROzAzum9qY5dOxuHL9BaQUutHjqunb9VhO1wa~b3~UU1ikDanmPKr2vAaqqanqTnhU9~Nj8dhy3TYUO-eY-3v9M-CcHCDiWy4v1BoSlqMSsIbWOCvtMfF9QunOgNQ15LnnQ-fA~RDg~DOTzd7vripA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                  alt="video cover"
                  class="w-full h-full"
                />
              </div>
              <UtSvg
                name="play"
                dim
                w="3.75rem"
                h="3.75rem"
                class="text-white"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-5 items-center">
          <UiButtonDefault
            class="py-[0.625rem] px-[2.5rem]"
            variant="inverse-primary"
            label="Decline"
          />
          <UiButtonDefault
            variant="primary"
            class="py-[0.625rem] px-[2.5rem]"
            label="Accept"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Campaign Application",
});

const idx = ref(0);
</script>

<style></style>
