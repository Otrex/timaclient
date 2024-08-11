<template>
  <div>
    <NuxtLayout name="dashboard">
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
