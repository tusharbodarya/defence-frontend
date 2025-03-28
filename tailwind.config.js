/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    listStyleType: {
      'lower-alpha': 'lower-alpha',
      'upper-alpha': 'upper-alpha',
      disc: 'disc',
      decimal: 'decimal',
    },
    extend: {
      colors: {
        bluetitle: "#6BD0FF",
        lightblue: "#DFEDFD",
        footerblue: "#11498D",
        textblue: "#1A74E2",
        inputcolor: "#EFF3F8",
        listcolor: "#009744",
        schedulered: "#FF4634",
        tablelightgreen: "#DFF3E8",
        tablegreentext: "#1F7646",
        tablebrown: '#66382D',
        tablelightblue: '#EEF4FF',
        tablelightbrown: "#F9EEEB",
        greentextprice: "#996426",
        numbercolorhome: "#3FA0EF",
        greentext: "#F04F3F",
        iconborder: "#677689",
        subscriptionlightbg: "#DFECFD",
        footeraddressbg: "#5A6676",
        downloadbtnbg: '#F4F8FF',
        greendisplaybigger: "#009C64",
        communicationbg: "#EFF3F8",
        keygovtbg: "#CCE2FF",
        red: "#DB2716",
        bgred: "#FFDFDF",
        pricingborder: '#88A4C6',
        primeinputbg: "#F0F7FF",
        schedulerowbg: "#DCE8F6",
      },
      fontFamily: {
        'poppins': "poppins",
        'EBGaramond': "EB Garamond",
        'Bonheur-Royale': "Bonheur Royale",
      }
    },
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      '3xl': '2400px',
    }
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
  ],
}

