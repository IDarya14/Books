// import { useEffect } from 'react';

// export const useClickOutside = (ref, callback) => {
//   const handleClick = (e) => {
//     if (ref.current && !ref.current.contains(e.target)) {
//       console.log('useClick');
//       console.log('current', ref.current);
//       callback();
//     }
//   };
//   useEffect(() => {
//     document.addEventListener('click', handleClick);
//     return () => {
//       document.removeEventListener('click', handleClick);
//     };
//   });
// };

import { useEffect } from 'react';

export const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref && ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  });
};
