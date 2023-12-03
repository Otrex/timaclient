<template>
  <div class="dark:bg-black dark:text-white">
    <select
      v-model="colorMode.preference"
      class="border w-24 h-8 dark:bg-gray-900 dark:text-white dark:border-gray-700"
    >
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
    <div>
      <h2>SVG</h2>
      <table>
        <thead>
          <th>Label</th>
          <th>Component</th>
        </thead>
        <tbody>
          <tr>
            <td>With X-COLOR=stroke</td>
            <td>
              <UtSvg name="bag" x-color="stroke" class="text-[green]" />
            </td>
          </tr>
          <tr>
            <td>With X-COLOR=fill</td>
            <td>
              <UtSvg name="bag" x-color="fill" class="text-[#4e2c56]" />
            </td>
          </tr>
          <tr>
            <td class="italic">Without X-COLOR</td>
            <td>
              <UtSvg name="food/bag" class="text-pink" />
            </td>
          </tr>
        </tbody>
      </table>
      {{ t.h }}

      <div>
        <h2>Inputs</h2>
        <p>All inputs are inline-flex or block elem$event</p>

        <UiInputOtp v-model="t.h" /><br />
        <UiInputOtp size="20px" gap="10px" />

        <div>
          <UiInputPhone v-model="t.h" />
          <UiInputUpload placeholder="Select an Image" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const t = useAuthStore();
const colorMode = useColorMode();
</script>

<style></style>
