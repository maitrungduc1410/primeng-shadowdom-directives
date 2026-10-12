<script setup lang="ts">
import { withBase } from 'vitepress';

const props = withDefaults(
  defineProps<{
    openLabel?: string;
  }>(),
  {
    openLabel: 'Open demo in a new tab',
  }
);

const src = withBase('/demo/');
</script>

<template>
  <div class="psd-demo">
    <p class="psd-demo__actions">
      <a class="psd-demo__link" :href="src" target="_blank" rel="noopener noreferrer">
        {{ props.openLabel }}
      </a>
    </p>
    <div class="psd-demo__frame">
      <iframe
        class="psd-demo__iframe"
        :src="src"
        title="primeng-shadowdom-directives live demo"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</template>
