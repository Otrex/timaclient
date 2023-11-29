<template>
  <div>
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

        <UiInputOtpInput v-model="t.h" /><br />
        <UiInputOtpInput size="20px" gap="10px" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const t = useAuthStore();
</script>

<style></style>
