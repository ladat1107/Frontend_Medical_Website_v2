/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/layout/Receptionist/pages/Messenger/**/*.{js,jsx,ts,tsx}",
    "./src/layout/Admin/pages/MedicineManage/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-tw': '#00B5F1',
        'secondary-tw': '#3dac78',
        'background-tw': '#f4f4f4',
        'mainText-tw': '#00B5F1',
        'secondaryText-tw': '#003553',
        'bgAdmin': '#f3f4f6',
        'bgTableHead': '#dceff8',
        'textHeadTable': '#007BFF',
        'hoverTable': '#edf3fc',
      },
      borderRadius: {
        'bg-admin': '10px',
        'table-admin': '8px',
      },
      boxShadow: {
        'table-admin': '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}

