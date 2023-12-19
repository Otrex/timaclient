<template>
  <div class="mt-[0.8125rem]">
    <div class="bg-[#2B2B2B] mb-[1.3125rem] text-white px-[1rem] py-[1.25rem]">
      <p>Nike Campaign</p>

      <p class="nl">
        Lorem ipsum dolor sit amet consectetur. Hendrerit varius tristique
        scelerisque purus. Purus mauris lacus volutpat convallis elementum
        fringilla nam vulputate phasellus. Volutpat pulvinar ac dolor mauris
        mauris consequat mauris nibh. Tincidunt tincidunt sed eget natoque in
        turpis neque auctor ullamcorper.
      </p>
    </div>

    <div class="flex flex-wrap gap-[3.75rem] mb-[1.875rem]">
      <div>
        <p class="sm text-[color:--clr-grey-300]">Social Media Platform</p>
        <div class="inline-flex flex-wrap gap-[0.625rem]">
          <UtSvg name="socials/instagram-lg" dim w="1.3125rem" h="1.3125rem" />
          <UtSvg name="socials/tiktok-lg" dim w="1.3125rem" h="1.3125rem" />
        </div>
      </div>

      <div>
        <p class="sm text-[color:--clr-grey-300]">Date accepted</p>
        <p class="nl">10th march, 2023</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-[3.75rem] mb-[1.875rem]">
      <div>
        <p class="sm text-[color:--clr-grey-300]">Agreed payment</p>
        <p class="nl">{{ tools.formatCurrency(100000, "₦") }}</p>
      </div>

      <div>
        <p class="sm text-[color:--clr-grey-300]">Initial payment</p>
        <p class="nl">{{ tools.formatCurrency(50000, "₦") }}</p>
      </div>

      <div>
        <p class="sm text-[color:--clr-grey-300]">Balance to be paid</p>
        <p class="nl">{{ tools.formatCurrency(50000, "₦") }}</p>
      </div>

      <div>
        <p class="sm text-[color:--clr-grey-300]">Mode of payment</p>
        <p class="nl">Flutterwave</p>
      </div>
    </div>

    <div class="flex flex-wrap gap-[3.75rem] mb-[1.875rem]">
      <div class="inline-flex flex-row gap-[0.625rem] items-center">
        <div>
          <UtSvg name="yellow-eye" dim w="1rem" h="1rem" />
        </div>
        <div>
          <p class="nl">{{ tools.formatNumber(532400) }}</p>
          <p class="sm text-[color:--clr-grey-300]">Reach</p>
        </div>
      </div>

      <div class="inline-flex flex-row gap-[0.625rem] items-center">
        <div>
          <UtSvg name="bad-message" dim w="1rem" h="1rem" />
        </div>
        <div>
          <p class="nl">{{ tools.formatNumber(2000) }}</p>
          <p class="sm text-[color:--clr-grey-300]">Comments</p>
        </div>
      </div>

      <div class="inline-flex flex-row gap-[0.625rem] items-center">
        <div>
          <UtSvg name="like" dim w="1rem" h="1rem" />
        </div>
        <div>
          <p class="nl">{{ tools.formatNumber(20400) }}</p>
          <p class="sm text-[color:--clr-grey-300]">Likes</p>
        </div>
      </div>

      <div class="inline-flex flex-row gap-[0.625rem] items-center">
        <div>
          <UtSvg name="bookmark-solid" dim w="1rem" h="1rem" />
        </div>
        <div>
          <p class="nl">{{ tools.formatNumber(400) }}</p>
          <p class="sm text-[color:--clr-grey-300]">Saved</p>
        </div>
      </div>

      <div class="inline-flex flex-row gap-[0.625rem] items-center">
        <div>
          <UtSvg name="share" dim w="1rem" h="1rem" />
        </div>
        <div>
          <p class="nl">{{ tools.formatNumber(532400) }}</p>
          <p class="sm text-[color:--clr-grey-300]">Share</p>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap gap-[3.75rem] mb-[1.875rem]">
      <div>
        <p class="sm text-[color:--clr-grey-300]">Publication type</p>
        <p class="nl">Video</p>
      </div>
    </div>

    <div class="mb-[1.875rem]">
      <p class="sm text-[color:--clr-grey-300] mb-[0.375rem]">Content posted</p>
      <div class="grid grid-cols-3 gap-[0.75rem]">
        <div
          tabindex="1"
          class="aspect-[250/327] overflow-hidden z-[1] relative video-content-bg flex items-center justify-center"
        >
          <div class="absolute inset-0 z-[-1]">
            <img
              src="https://s3-alpha-sig.figma.com/img/128e/110a/3e644d9a1277ab2f9c0f9b05ffa9a7d9?Expires=1704067200&Signature=a9H4L822~YsdF~aTRgwIMMiBy2eEdBZwxvuyd2BfM2BVvc7P2l2u80e~GNhfv98VhL1rGNn6zoupI8qwZUkcTNWqOuXiIpebNwzhjvFgtWZgPdu4RlzlxojLyWCu5h0sjhxdqxbcSUXuEq1NEmhocnCpvWYsYowj4Y5mrADkdKlozIr96tmQa03gDS9F3e6OROzAzum9qY5dOxuHL9BaQUutHjqunb9VhO1wa~b3~UU1ikDanmPKr2vAaqqanqTnhU9~Nj8dhy3TYUO-eY-3v9M-CcHCDiWy4v1BoSlqMSsIbWOCvtMfF9QunOgNQ15LnnQ-fA~RDg~DOTzd7vripA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="video cover"
              class="w-full h-full"
            />
          </div>
          <UtSvg name="play" dim w="3.75rem" h="3.75rem" class="text-white" />
        </div>

        <div
          tabindex="1"
          class="aspect-[250/327] overflow-hidden z-[1] relative video-content-bg flex items-center justify-center"
        >
          <div class="absolute inset-0 w-full aspect-[250/327] z-[-1]">
            <img
              src="https://s3-alpha-sig.figma.com/img/dc6e/0ce5/024bad9890f34be89b61b0a4eaa4f996?Expires=1704067200&Signature=EHrt5q7UG~qet2QaOKFpP8nmgQd8Px2a37yUy-A1IeFLv~xw8bwKtcaWtXobZODqNxErZ0e2DHlClrcqjue4zHKHmKXm-CmuEDfe9ZyNwWfRBv3kNDUZjaZDvrjwT5dmLqGCrVVDpkKLHRAPuCoJQnP5zbSBVvrLMMT9mfm0F9VgvYQ98lva4pg7h9cGl7sfxUn3DeqOlC5TvgtP15jmKRAmsCKlU6iCO1ixzLDAhdtQZBNnWXzbWCZyKj2opj8hP0hlEwELNc4MTXiRfypg0DkzH5uU1jzsemjRg6djMT-HTYU3VhGwTAgkZiUE7PJDbvh9cQnlfhGd1kXqmvecDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="video cover"
              class="w-full h-full"
            />
          </div>
          <UtSvg name="play" dim w="3.75rem" h="3.75rem" class="text-white" />
        </div>

        <div
          tabindex="1"
          class="aspect-[250/327] overflow-hidden z-[1] relative video-content-bg flex items-center justify-center"
        >
          <div class="absolute inset-0 w-full aspect-[250/327] z-[-1]">
            <img
              src="https://s3-alpha-sig.figma.com/img/dc6e/0ce5/024bad9890f34be89b61b0a4eaa4f996?Expires=1704067200&Signature=EHrt5q7UG~qet2QaOKFpP8nmgQd8Px2a37yUy-A1IeFLv~xw8bwKtcaWtXobZODqNxErZ0e2DHlClrcqjue4zHKHmKXm-CmuEDfe9ZyNwWfRBv3kNDUZjaZDvrjwT5dmLqGCrVVDpkKLHRAPuCoJQnP5zbSBVvrLMMT9mfm0F9VgvYQ98lva4pg7h9cGl7sfxUn3DeqOlC5TvgtP15jmKRAmsCKlU6iCO1ixzLDAhdtQZBNnWXzbWCZyKj2opj8hP0hlEwELNc4MTXiRfypg0DkzH5uU1jzsemjRg6djMT-HTYU3VhGwTAgkZiUE7PJDbvh9cQnlfhGd1kXqmvecDw__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="video cover"
              class="w-full h-full"
            />
          </div>
          <UtSvg name="play" dim w="3.75rem" h="3.75rem" class="text-white" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.video-content-bg {
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.2) 100%
    ),
    url(<path-to-image>), lightgray 50% / cover no-repeat;
}
</style>
