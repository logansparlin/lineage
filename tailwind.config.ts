import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true
  },
  darkMode: 'class',
  theme: {
    colors: {
      'current': 'currentColor',
      'transparent': 'transparent',
      'black': 'rgb(0, 0, 0)',
      'white': 'rgb(255, 255, 255)',
    },
    screens: {
      'md': '900px'
    },
    fontFamily: {
      'serif': ['var(--font-arizona-text)', 'serif']
    },
    fontSize: {
      'title-lg': ["var(--title-lg-font-size)", {
        lineHeight: "var(--title-lg-line-height)",
        letterSpacing: "var(--title-lg-letter-spacing)"
      }],
      'title': ["var(--title-font-size)", {
        lineHeight: "var(--title-line-height)",
        letterSpacing: "var(--title-letter-spacing)"
      }],
      'subtitle': ["var(--subtitle-font-size)", {
        lineHeight: "var(--subtitle-line-height)",
        letterSpacing: "var(--subtitle-letter-spacing)"
      }],
      'nav': ["var(--nav-font-size)", {
        lineHeight: "var(--nav-line-height)",
        letterSpacing: "var(--nav-letter-spacing)"
      }],
      'list-title': ["var(--list-title-font-size)", {
        lineHeight: "var(--list-title-line-height)",
        letterSpacing: "var(--list-title-letter-spacing)"
      }],
      'eyebrow': ["var(--eyebrow-font-size)", {
        lineHeight: "var(--eyebrow-line-height)",
        letterSpacing: "var(--eyebrow-letter-spacing)"
      }],
      'footer': ["var(--footer-font-size)", {
        lineHeight: "var(--footer-line-height)",
        letterSpacing: "var(--footer-letter-spacing)"
      }]
    },
    fontWeight: {
      'normal': '400',
      'medium': '500',
      'semibold': '600'
    },
    spacing: {
      ...Object.fromEntries(
        Array.from({ length: 999 }, (_, i) => [i, `${i/16}rem`])
      ),
      'site-x': 'var(--site-x)',
      'site-y': 'var(--site-y)',
    },
    lineHeight: {
      '100': '100%',
      '110': '110%',
      '115': '115%',
      '120': '120%',
      '130': '130%',
      '140': '140%'
    },
    backdropBlur: {
      'nav': '30px'
    },
    extend: {
      transitionDuration: {
        '400': '400ms'
      },
      transitionTimingFunction: {
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)'
      },
      height: {
        'screen': 'calc(var(--vh, 1vh) * 100)'
      },
      minHeight: {
        'screen': 'calc(var(--vh, 1vh) * 100)'
      },
      maxHeight: {
        'screen': 'calc(var(--vh, 1vh) * 100)'
      }
    },
  },
  plugins: [
    function({ addVariant }: any) {
      addVariant('light', 'body.light &');
    },
  ],
} satisfies Config;
