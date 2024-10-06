module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'sans-serif'],
      },
      screens:{
        laptop:'1025px',
        laptop_sm:'950px',
        tablet:'768px',
        tablet_sm:'650px',
        mobile:'425px'
      }     
    },
  },
  plugins: [],
};
