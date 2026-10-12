import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import DemoFrame from './DemoFrame.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoFrame', DemoFrame);
  },
} satisfies Theme;
