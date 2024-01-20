<template>
  <transition name="fade-in-out" mode="out-in">
    <div
      :class="[
        'fixed top-0 backdrop-color flex left-0 w-full h-screen z-[70000000]',
      ]"
      :style="backdropColor"
      v-show="backdropState"
      @click.stop="backdropClose"
    >
      <transition name="fade-in-top" appear mode="out-in">
        <div
          v-show="contentState"
          :class="[
            contentState && 'fade-in-from-top',
            'max-w w-full m-auto',
            props.contentClass,
          ]"
        >
          <div @click.stop="() => {}">
            <slot></slot>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps({
  preventBackdropClose: Boolean,
  backdropColor: String,
  contentClass: String,
  state: {
    type: Boolean,
    default: false,
  },
  mWidth: {
    type: String,
    default: "60rem",
  },
  x: {
    type: String,
    default: "center",
  },
  y: {
    type: String,
    default: "center",
  },
});

const contentState = ref(false);
const backdropState = ref(false);
const position = computed(() => {
  return `items-${props.x} justify-${props.y}`;
});

const backdropColor = computed(() => {
  return `background: ${props.backdropColor};`;
});

function backdropClose() {
  if (props.preventBackdropClose) return;
  emit("update:state", false);
}

onMounted(() => {
  contentState.value = props.state;
  backdropState.value = props.state;
});

watch(
  () => props.state,
  (state) => {
    if (state) {
      backdropState.value = state;
      setTimeout(() => {
        contentState.value = state;
      }, 400);
    } else {
      emit("close:state");
      contentState.value = state;
      setTimeout(() => {
        backdropState.value = state;
      }, 200);
    }
  }
);

const emit = defineEmits(["update:state", "close:state"]);
</script>
<style scoped>
.max-w {
  max-width: v-bind("props.mWidth");
}
@keyframes fade-out-to-top {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100%);
  }
}

.fade-out-to-top {
  animation: fade-out-to-top 0.35s;
}

@keyframes fade-in-from-top {
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-from-top {
  animation: fade-in-from-top 0.35s ease-in;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-in-top-enter-active,
.fade-in-top-leave-active {
  transition: opacity 0.35s, transform 0.35s;
}

.fade-in-top-enter,
.fade-in-top-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}

.fade-in-top-leave {
  opacity: 1;
  transform: translateY(0);
}

.fade-in-from-top-enter-active {
  transition: opacity 0.35s, transform 0.35s;
}

.fade-in-from-top-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-in-out-enter-active,
.fade-in-out-leave-active {
  transition: opacity 0.35s;
}

.fade-in-out-enter,
.fade-in-out-leave-to {
  opacity: 0;
}

.fade-in-out-leave-active {
  position: absolute;
}

.fade-in-out-leave {
  opacity: 1;
}

.backdrop-color {
  background: rgba(200, 200, 200, 0.2);
}

.center {
  top: 50%;
  left: 50%;
  background: #000;
}

.x-center {
  left: 50%;
}
</style>
