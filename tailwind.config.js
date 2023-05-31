/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{js,jsx}'];
export const theme = {
  extend: {
    spacing: {
      13: '3.25rem',
      15: '3.75rem',
      17: '4.25rem',
      26: '6.5rem',
      34.5: '8.625rem',
      37.5: '8.75rem',
      '2/7': '28%',
      '9/10': '90%',
    },
    colors: {
      'primary-black': '#51454e',
      'primary-blue': '#51a4ac',
      'secondary-blue': '#91ccd2',
      'primary-orange': '#ec685a',
      'button-blue': '#1a73e8',
      'button-red': '#d41d2d',
      'google-blue': '#4285f4',
      'google-red': '#db4437',
      'google-yellow': '#f4b400',
      twitter: '#1da1f2',
      gray: {
        95: '#f2f2f2',
      },
    },
    fontSize: {
      '2xs': ['0.625rem', '0.875rem'],
    },
    animation: {
      popUp: 'popUp 4000ms cubic-bezier(0.830, 0.090, 0.180, 0.900)',
    },
    keyframes: {
      popUp: {
        '0% 100%': {
          left: '50%',
          transform: 'translate(-50%, -110%)',
        },
        '50%': { left: '50%', transform: 'translate(-50%, 15%)' },
      },
    },
  },
};
export const plugins = [];
