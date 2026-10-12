import { readFileSync } from 'node:fs';
import {
  type DefaultTheme,
  type HeadConfig,
  defineConfig,
} from 'vitepress';

const repo = 'https://github.com/maitrungduc1410/primeng-shadowdom-directives';
const base = '/primeng-shadowdom-directives/';
const site = `https://maitrungduc1410.github.io${base}`;
const { version } = JSON.parse(
  readFileSync(
    new URL('../../projects/primeng-shadowdom-directives/package.json', import.meta.url),
    'utf8'
  )
) as { version: string };

type Labels = {
  guide: string;
  demo: string;
  changelog: string;
  groups: [string, string, string];
  pages: Record<(typeof slugs)[number], string>;
};

const slugs = [
  '',
  'how-it-works',
  'installation',
  'quick-start',
  'overlays',
  'styles',
  'supported-components',
  'demo',
  'versions',
  'troubleshooting',
] as const;

const groups: (typeof slugs)[number][][] = [
  ['', 'how-it-works', 'installation', 'quick-start'],
  ['overlays', 'styles', 'supported-components', 'demo'],
  ['versions', 'troubleshooting'],
];

function guideSidebar(prefix: string, l: Labels): DefaultTheme.SidebarItem[] {
  return groups.map((group, i) => ({
    text: l.groups[i],
    items: group.map((slug) => ({
      text: l.pages[slug],
      link: `${prefix}/guide/${slug}`,
    })),
  }));
}

function themeConfig(prefix: string, l: Labels): DefaultTheme.Config {
  return {
    nav: [
      {
        text: l.guide,
        link: `${prefix}/guide/`,
        activeMatch: `^${prefix}/guide/(?!demo)`,
      },
      {
        text: l.demo,
        link: `${prefix}/guide/demo`,
        activeMatch: `^${prefix}/guide/demo`,
      },
      {
        text: `v${version}`,
        items: [
          { text: l.changelog, link: `${repo}/releases` },
          {
            text: 'npm',
            link: 'https://www.npmjs.com/package/primeng-shadowdom-directives',
          },
        ],
      },
    ],
    sidebar: {
      [`${prefix}/guide/`]: guideSidebar(prefix, l),
    },
  };
}

const en: Labels = {
  guide: 'Guide',
  demo: 'Demo',
  changelog: 'Releases',
  groups: ['Introduction', 'Using PSD', 'Reference'],
  pages: {
    '': 'What is it?',
    'how-it-works': 'How it works',
    installation: 'Installation',
    'quick-start': 'Quick start',
    overlays: 'Overlay directives',
    styles: 'Styles in Shadow DOM',
    'supported-components': 'Supported components',
    demo: 'Live demo',
    versions: 'Versions & branches',
    troubleshooting: 'Troubleshooting',
  },
};

const vi: Labels = {
  guide: 'Hướng dẫn',
  demo: 'Demo',
  changelog: 'Bản phát hành',
  groups: ['Giới thiệu', 'Dùng PSD', 'Tham chiếu'],
  pages: {
    '': 'PSD là gì?',
    'how-it-works': 'Cách hoạt động',
    installation: 'Cài đặt',
    'quick-start': 'Bắt đầu nhanh',
    overlays: 'Directive overlay',
    styles: 'CSS trong Shadow DOM',
    'supported-components': 'Component hỗ trợ',
    demo: 'Demo trực tiếp',
    versions: 'Phiên bản & nhánh',
    troubleshooting: 'Khắc phục sự cố',
  },
};

const zh: Labels = {
  guide: '指南',
  demo: 'Demo',
  changelog: '发布记录',
  groups: ['入门', '使用 PSD', '参考'],
  pages: {
    '': '这是什么？',
    'how-it-works': '工作原理',
    installation: '安装',
    'quick-start': '快速开始',
    overlays: '浮层指令',
    styles: 'Shadow DOM 中的样式',
    'supported-components': '支持的组件',
    demo: '在线 Demo',
    versions: '版本与分支',
    troubleshooting: '故障排查',
  },
};

const seoLocales = {
  root: {
    prefix: '',
    lang: 'en-US',
    og: 'en_US',
    imageAlt: 'PrimeNG Shadow DOM Directives: overlays that work inside ShadowRoot',
  },
  vi: {
    prefix: 'vi/',
    lang: 'vi-VN',
    og: 'vi_VN',
    imageAlt: 'PrimeNG Shadow DOM Directives: overlay hoạt động trong ShadowRoot',
  },
  zh: {
    prefix: 'zh/',
    lang: 'zh-CN',
    og: 'zh_CN',
    imageAlt: 'PrimeNG Shadow DOM Directives: 在 ShadowRoot 中正常工作的浮层',
  },
} as const;
type SeoLocale = keyof typeof seoLocales;

function localeOf(page: string): SeoLocale {
  const first = page.split('/')[0];
  return first === 'vi' || first === 'zh' ? first : 'root';
}

function pageUrl(page: string): string {
  return page.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '');
}

export default defineConfig({
  title: 'PrimeNG Shadow DOM Directives',
  description:
    'Angular directives that make PrimeNG overlays work inside Shadow DOM (psdMenu, psdPopover, and more).',
  base,
  cleanUrls: true,
  lastUpdated: true,
  ignoreDeadLinks: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
    ['meta', { name: 'theme-color', content: '#DD0031' }],
  ],
  sitemap: {
    hostname: site,
    transformItems: (items) =>
      items.map((item) => {
        const enLink = item.links?.find((l) => l.lang === seoLocales.root.lang);
        return enLink
          ? { ...item, links: [...item.links!, { lang: 'x-default', url: enLink.url }] }
          : item;
      }),
  },
  transformHead({ page, pageData, siteConfig, title, description }) {
    if (page === '404.md' || pageData.isNotFound) {
      return [['meta', { name: 'robots', content: 'noindex' }]];
    }
    const locale = localeOf(page);
    const key = locale === 'root' ? page : page.slice(locale.length + 1);
    const url = site + pageUrl(page);
    const exists = new Set(siteConfig.pages);
    const variants = (Object.keys(seoLocales) as SeoLocale[]).filter((l) =>
      exists.has(seoLocales[l].prefix + key)
    );
    const isHome = pageData.frontmatter.layout === 'home';
    const head: HeadConfig[] = [['link', { rel: 'canonical', href: url }]];
    if (variants.length > 1) {
      for (const l of variants) {
        head.push([
          'link',
          {
            rel: 'alternate',
            hreflang: seoLocales[l].lang,
            href: site + pageUrl(seoLocales[l].prefix + key),
          },
        ]);
      }
      if (variants.includes('root')) {
        head.push([
          'link',
          { rel: 'alternate', hreflang: 'x-default', href: site + pageUrl(key) },
        ]);
      }
    }
    const og: [string, string][] = [
      ['og:type', isHome ? 'website' : 'article'],
      ['og:site_name', 'PrimeNG Shadow DOM Directives'],
      ['og:title', title],
      ['og:description', description],
      ['og:url', url],
      ['og:locale', seoLocales[locale].og],
      ...variants
        .filter((l) => l !== locale)
        .map((l): [string, string] => ['og:locale:alternate', seoLocales[l].og]),
    ];
    for (const [property, content] of og) {
      head.push(['meta', { property, content }]);
    }
    return head;
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      themeConfig: themeConfig('', en),
    },
    vi: {
      label: 'Tiếng Việt',
      lang: 'vi-VN',
      title: 'PrimeNG Shadow DOM Directives',
      description:
        'Directive Angular giúp overlay PrimeNG hoạt động trong Shadow DOM (psdMenu, psdPopover, ...).',
      themeConfig: {
        ...themeConfig('/vi', vi),
        outline: { level: [2, 3], label: 'Trên trang này' },
        docFooter: { prev: 'Trang trước', next: 'Trang sau' },
        lastUpdated: { text: 'Cập nhật lần cuối' },
        editLink: {
          pattern: `${repo}/edit/master/docs/:path`,
          text: 'Sửa trang này trên GitHub',
        },
        returnToTopLabel: 'Về đầu trang',
        sidebarMenuLabel: 'Menu',
        darkModeSwitchLabel: 'Giao diện',
        lightModeSwitchTitle: 'Chuyển sang giao diện sáng',
        darkModeSwitchTitle: 'Chuyển sang giao diện tối',
        langMenuLabel: 'Đổi ngôn ngữ',
        notFound: {
          title: 'KHÔNG TÌM THẤY TRANG',
          quote: 'Trang bạn tìm không tồn tại hoặc đã được chuyển đi.',
          linkText: 'Về trang chủ',
        },
        footer: { message: 'Phát hành theo giấy phép MIT.' },
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'PrimeNG Shadow DOM Directives',
      description:
        '让 PrimeNG 浮层在 Shadow DOM 中正常工作的 Angular 指令（psdMenu、psdPopover 等）。',
      themeConfig: {
        ...themeConfig('/zh', zh),
        outline: { level: [2, 3], label: '页面导航' },
        docFooter: { prev: '上一页', next: '下一页' },
        lastUpdated: { text: '最后更新于' },
        editLink: {
          pattern: `${repo}/edit/master/docs/:path`,
          text: '在 GitHub 上编辑此页',
        },
        returnToTopLabel: '回到顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        langMenuLabel: '切换语言',
        notFound: {
          title: '页面未找到',
          quote: '你访问的页面不存在或已被移动。',
          linkText: '返回首页',
        },
        footer: { message: '基于 MIT 许可证发布。' },
      },
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    socialLinks: [
      { icon: 'github', link: repo },
      { icon: 'npm', link: 'https://www.npmjs.com/package/primeng-shadowdom-directives' },
    ],
    search: {
      provider: 'local',
      options: {
        locales: {
          vi: {
            translations: {
              button: { buttonText: 'Tìm kiếm', buttonAriaLabel: 'Tìm kiếm' },
              modal: {
                displayDetails: 'Hiển thị chi tiết',
                resetButtonTitle: 'Xóa tìm kiếm',
                backButtonTitle: 'Đóng tìm kiếm',
                noResultsText: 'Không có kết quả cho',
                footer: {
                  selectText: 'chọn',
                  navigateText: 'di chuyển',
                  closeText: 'đóng',
                },
              },
            },
          },
          zh: {
            translations: {
              button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
              modal: {
                displayDetails: '显示详情',
                resetButtonTitle: '清除查询',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                },
              },
            },
          },
        },
      },
    },
    editLink: {
      pattern: `${repo}/edit/master/docs/:path`,
      text: 'Edit this page on GitHub',
    },
    outline: { level: [2, 3] },
    footer: { message: 'Released under the MIT License.' },
  },
});
