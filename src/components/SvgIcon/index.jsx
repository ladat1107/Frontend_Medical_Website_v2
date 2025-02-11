import React from 'react';

// Tạo một object chứa tất cả các SVG icon
const icons = {
  facebook: (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" aria-label="Icon FaceBook" xmlns="http://www.w3.org/2000/svg"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path></svg>
  ),
  tiktok: (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" aria-label="Icon TikTok" xmlns="http://www.w3.org/2000/svg"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="#E4405F" >
      <path d="M24 7c4.7 0 5.2 0 7 .1 1.8.1 3 .4 4 1a8 8 0 0 1 2.9 2.9c.6 1 .9 2.2 1 4 .1 1.7.1 2.3.1 7s0 5.2-.1 7c-.1 1.8-.4 3-1 4a8 8 0 0 1-2.9 2.9c-1 .6-2.2.9-4 1-1.7.1-2.3.1-7 .1s-5.2 0-7-.1c-1.8-.1-3-.4-4-1a8 8 0 0 1-2.9-2.9c-.6-1-.9-2.2-1-4-.1-1.7-.1-2.3-.1-7s0-5.2.1-7c.1-1.8.4-3 1-4A8 8 0 0 1 10 8c1-.6 2.2-.9 4-1 1.7-.1 2.3-.1 7-.1M24 4c-4.8 0-5.4 0-7.3.1a11 11 0 0 0-4.3.8 11 11 0 0 0-4 2.6 11 11 0 0 0-2.6 4 11 11 0 0 0-.8 4.3C5 21 5 21.6 5 24s0 3 .1 4.8c.1 2 .3 3.5.8 4.3a11 11 0 0 0 2.6 4 11 11 0 0 0 4 2.6c1 .5 2.4.7 4.3.8H24c2.6 0 3 0 4.8-.1 2-.1 3.5-.3 4.3-.8a11 11 0 0 0 4-2.6 11 11 0 0 0 2.6-4c.5-1 .7-2.4.8-4.3.1-1.8.1-2.2.1-4.8s0-3-.1-4.8c-.1-2-.3-3.5-.8-4.3a11 11 0 0 0-2.6-4 11 11 0 0 0-4-2.6 11 11 0 0 0-4.3-.8C29.4 4 28.8 4 24 4z" />
      <path d="M24 12a12 12 0 1 0 0 24 12 12 0 1 0 0-24zm0 19.5A7.5 7.5 0 1 1 24 17a7.5 7.5 0 1 1 0 15z" />
      <circle cx="36" cy="12" r="2.5" />
    </svg>
  ),
  youtube: (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 576 512" aria-label="Icon Youtube" height="16" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path></svg>
  ),

  account: (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" aria-label="Icon User" height="15" width="15" xmlns="http://www.w3.org/2000/svg"><path d="M256 288c79.5 0 144-64.5 144-144S335.5 0 256 0 112 64.5 112 144s64.5 144 144 144zm128 32h-55.1c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16H128C57.3 320 0 377.3 0 448v16c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48v-16c0-70.7-57.3-128-128-128z"></path></svg>)
  //add more
};

// Component SVG Icon
function SvgIcon({ name, width = 20, height = 20, fill = "#000" }) {
  const icon = icons[name];

  if (!icon) return null;

  // Clone element và thêm các thuộc tính width, height, fill
  return React.cloneElement(icon, { width, height, fill });
}

export default SvgIcon;
