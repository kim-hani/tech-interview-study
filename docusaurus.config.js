import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '김한이의 Tech Interview Study',
  tagline: '백엔드 개발자를 향한 여정',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://kim-hani.github.io',
  baseUrl: '/tech-interview-study/',

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
          editUrl: 'https://github.com/kim-hani/tech-interview-study/tree/main/',
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);

            function countDocsAndRename(items) {
              let count = 0;
              for (const item of items) {
                if (item.type === 'category') {
                  const childCount = countDocsAndRename(item.items);
                  item.label = `${item.label} (${childCount})`; 
                  count += childCount;
                } else if (item.type === 'doc' || item.type === 'link') {
                  count += 1;
                }
              }
              return count;
            }

            countDocsAndRename(sidebarItems);
            return sidebarItems;
          },
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
        copyright: `Copyright © ${new Date().getFullYear()} 김한이. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
