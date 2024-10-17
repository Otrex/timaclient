<template>
  <div>
    <NuxtLayout name="admin">
      <template #main>
        <NuxtPage
          :transition="{
            name: 'page',
            mode: 'out-in',
          }"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
