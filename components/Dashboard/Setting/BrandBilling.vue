<template>
  <div class="pt-[3.4375rem]">
    <div class="mb-5 text-lg">
      <p>Streamlining Payments and Invoices for Your Business Success</p>
    </div>

    <div
      class="inline-flex cont md:flex-row flex-wrap gap-16 max-w-[72.25rem] justify-between"
    >
      <UtTabMenuItem
        label="Subscription"
        :name="constants.BILLING_SUBSCRIPTION"
        qpath="subTab"
        default
      />
      <UtTabMenuItem
        label="Payment Method"
        :name="constants.BILLING_PAYMENT_METHOD"
        qpath="subTab"
      />
    </div>

    <component :is="tabMap[currentTab]" :isEditable="isEditable" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isEditable?: boolean;
}

const route = useRoute();
const props = withDefaults(defineProps<Props>(), {
  isEditable: false,
});

const currentTab = computed(() => {
  const defaultTab = constants.BILLING_SUBSCRIPTION;
  return (route.query.subTab as keyof typeof tabMap) || defaultTab;
});

const tabMap = {
  [constants.BILLING_SUBSCRIPTION]: resolveComponent(
    "DashboardSettingBillingSubscription"
  ),
  [constants.BILLING_PAYMENT_METHOD]: resolveComponent(
    "DashboardSettingBillingPaymentMethod"
  ),
  [constants.BILLING_TRANSACTIONS]: resolveComponent(
    "DashboardSettingBillingTransactions"
  ),
};
</script>
