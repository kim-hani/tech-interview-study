// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '김한이의 Tech Interview Study', // 사이트 제목
  tagline: '백엔드 개발자를 향한 여정', // 태그라인
  favicon: 'img/favicon.ico',

  // 미래 플래그 설정
  future: {
    v4: true,
  },

  // GitHub Pages 배포 설정
  url: 'https://kim-hani.github.io',
  baseUrl: '/tech-interview-study/',

  // GitHub 배포 정보
  organizationName: 'kim-hani',
  projectName: 'tech-interview-study',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl:
              'https://github.com/kim-hani/tech-interview-study/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        // 소셜 카드 이미지
        image: 'img/docusaurus-social-card.jpg',
        colorMode: {
          respectPrefersColorScheme: true,
        },
        navbar: {
          title: 'Tech Interview Study',
          logo: {
            alt: 'My Site Logo',
            src: 'img/logo.svg',
          },
          items: [
            {
              type: 'docSidebar',
              sidebarId: 'tutorialSidebar',
              position: 'left',
              label: '스터디 노트',
            },
            {
              href: 'https://github.com/kim-hani/tech-interview-study',
              label: 'GitHub',
              position: 'right',
            },
          ],
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Docs',
              items: [
                {
                  label: '스터디 시작하기',
                  to: '/docs/intro',
                },
              ],
            },
            {
              title: 'More',
              items: [
                {
                  label: 'GitHub',
                  href: 'https://github.com/kim-hani/tech-interview-study',
                },
              ],
            },
          ],
          copyright: `Copyright © ${new Date().getFullYear()} 김한이. Built with Docusaurus.`, // 카피라이트 수정
        },
        prism: {
          theme: prismThemes.github,
          darkTheme: prismThemes.dracula,
        },
      }),
};

export default config;
