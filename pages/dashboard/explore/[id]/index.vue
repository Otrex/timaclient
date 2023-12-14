<template>
  <div class="p-[1.625rem]">
    <div class="mb-[1.25rem] overflow-hidden h-[29.3125rem] relative">
      <button
        style="--tw-ring-opacity: 0.2"
        :class="[
          'absolute active:ring-4 rounded-md  right-[0.75rem] top-[0.75rem]',
          avgColor < 128 ? 'active:ring-slate-100' : 'active:ring-slate-700',
        ]"
      >
        <UtSvg
          name="bookmark"
          :class="[
            'w-[1.5rem] h-[1.5rem]',
            avgColor > 128 ? 'text-black' : 'text-white',
          ]"
        />
      </button>
      <img
        ref="image"
        class="w-full h-full object-cover"
        :src="data.image"
        alt="campaign banner"
      />
    </div>

    <section>
      <h2 class="mb-[1rem] font-bold">Campaign Information</h2>
      <h3 class="mb-[1rem]">Nike Campaign</h3>
      <p class="mb-[1.4375rem]">
        Lorem ipsum dolor sit amet consectetur. Hendrerit varius tristique
        scelerisque purus. Purus mauris lacus volutpat convallis elementum
        fringilla nam vulputate phasellus. Volutpat pulvinar ac dolor mauris
        mauris consequat mauris nibh. Tincidunt tincidunt sed eget natoque in
        turpis neque auctor ullamcorper. Lorem ipsum dolor sit amet consectetur.
        Hendrerit varius tristique scelerisque purus. Purus mauris lacus
        volutpat convallis elementum fringilla nam vulputate phasellus. Volutpat
        pulvinar ac dolor mauris mauris consequat mauris nibh. Tincidunt
        tincidunt sed eget natoque in turpis neque auctor ullamcorper.
      </p>

      <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
        <p class="nl">Campaign website:</p>
        <p class="nl">Planned Budget:</p>
        <p class="nl">Cost per post:</p>
        <div>
          <p class="nl">Social media platform:</p>
          <div
            class="border inline-flex rounded-md mr-2 items-center justify-center max-w-[3.125rem] p-[0.625rem] border-[--input-border-color]"
          >
            <UtSvg
              name="socials/instagram-lg"
              class="h-[1.3125rem] max-w-[1.9375rem]"
            />
          </div>
          <div
            class="border inline-flex rounded-md items-center justify-center max-w-[3.125rem] p-[0.625rem] border-[--input-border-color]"
          >
            <UtSvg
              name="socials/youtube-lg"
              class="h-[1.3125rem] max-w-[1.9375rem]"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="mb-[1.75rem]">
      <h2 class="mb-[0.75rem] font-bold">Influencer requirement</h2>
      <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
        <p class="nl">Category:</p>
        <p class="nl">Audience size:</p>
        <p class="nl">Audience gender</p>
        <p class="nl">Audience location:</p>
      </div>
    </section>

    <section>
      <h2 class="mb-[0.75rem] font-bold">Creatives</h2>
      <div class="flex flex-col gap-[0.875rem] mb-[2.625rem]">
        <p class="nl">Payment type:</p>
        <p class="nl">Campaign start date:</p>
        <p class="nl">Campaign end date:</p>
        <p class="nl">Content type:</p>
        <p class="nl">Content placement</p>
        <p class="nl">Creative brief</p>
        <p class="nl">Creative tone:</p>
        <p class="nl">Campaign rules:</p>
        <p class="nl">Sample content reference link:</p>
        <p class="nl">Campaign objective awareness</p>
        <p class="nl">Campaign objective acquisition</p>
      </div>
    </section>

    <section class="text-center">
      <UiButtonDefault
        @click="
          navigateTo({
            name: 'Explore - Application',
            params: {
              id: $route.params.id,
            },
          })
        "
        variant="primary"
        class="py-[0.75rem] px-[3.75rem]"
        label="Apply to this campaign"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: "Explore - Campaign",
});

const data = ref({
  image:
    "https://s3-alpha-sig.figma.com/img/89c4/b5e1/886e08005e6e82644da63d47bf31b135?Expires=1703462400&Signature=njQR94mDXHwDlFvuraWFk3XxXWgh1Lzks6QwtRljhlss~DNPRinHcB6WCTL6jqAQ9yCxa9WOk1WD~0h3opvLN4dQDku3s0SUHh0gQl4I3OorY8-XM~bzBJ8mCPpeXdoEoCWcXEEM56rz3oMs0nIuSoI91RNIlIkUvK3DPQ~R8O4AY6KLG1OXhtjzmbOZ8Ecq-k-RaHPT7AYQtiRtkTZsXWtyUBAIXAyHOUu20ec1rrqYjoKdsKVfQ8vXuo2D-ysZ9vZT1tP6smkQ0X5ruGTdXmMGdtcA0h86cCRh5FtGOdUoXIoFljIDSxKiHUE4zod7SNTfZv1jGCNrV7vPxhG3Sw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4",
  category: "Fashion",
  brand: "Nike",
  description: `Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.
Join the movement and showcase your strength with the new Nike Flex collection - designed to empower your every move.`,
  budget: 250000,
  deadline: new Date().toISOString(),
  completion: 90,
});

const colorExtract = useImageColorExtract();
const avgColor = ref(0);
const image = ref<HTMLImageElement>();

onMounted(() => {
  colorExtract.getAverageColor(image.value?.src!).then((value) => {
    avgColor.value = value;
  });
});
</script>

<style></style>
