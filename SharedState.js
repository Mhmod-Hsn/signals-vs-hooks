import { computed, signal } from "@preact/signals";


// 1. Define global state outside of the component lifecycle
export const count = signal(0);

// 2. Define a reactive, derived value that auto-updates when 'count' changes
export const doubleCount = computed(() => count.value * 2);
