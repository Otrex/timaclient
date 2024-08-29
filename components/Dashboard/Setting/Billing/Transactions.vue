<template>
  <div class="mt-5">
    <UtDataTable
      label="Transactions"
      :searchField="{
        placeholder: 'Search completed payment',
      }"
      :thead="thead"
      :tbody="tbody"
      :tclass="{
        thead: 'font-bold text-left align-middle',
        tbody: 'text-left align-middle',
      }"
    >
      <template #filter>
        <select class="rounded-[1.875rem] ml-2 px-6 py-2" v-model="filter">
          <option value="all">All</option>
        </select>
      </template>
      <template #tbody="{ item, row, field }">
        <div v-if="field === 'transactions'">
          <UiTransactionView
            :image="item.image"
            :title="item.brand"
            :sub="item.sub"
          />
        </div>
        <div v-if="field === 'status'">
          <UiStatusBadge :status="item" />
        </div>
        <div v-else-if="field === 'action'">
          <UiTransactionAction :transaction="row" />
        </div>
      </template>
    </UtDataTable>
  </div>
</template>

<script lang="ts" setup>
const filter = ref("all");
const thead = ["Transactions", "Amount", "Date", "Status", "Action"].map(
  (e) => ({
    label: e,
    key: e.toLowerCase().replace(" ", "_"),
  })
);

const tbody = [
  {
    transactions: {
      image: "",
      brand: "Nike lebron shoes",
      sub: "TIMA subscription",
    },
    amount: "$1125.00",
    date: "Oct 24, 2024",
    status: "ACCEPTED",
    id: 1,
  },
];
</script>

<style></style>
