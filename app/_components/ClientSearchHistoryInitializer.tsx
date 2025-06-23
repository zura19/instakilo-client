// // app/_components/ClientUserInitializer.tsx
// "use client";

// import { useEffect, useRef } from "react";
// import { useAppDispatch } from "@/store";
// import { init } from "../_slices/searchHistorySlice"; // adjust path as needed
// // import { userType } from "@/lib/types/userTypes";

// export default function ClientSearchHistoryInitializer() {
//   const dispatch = useAppDispatch();
//   const hasInitialized = useRef(false); // <-- key part

//   useEffect(() => {
//     if (hasInitialized.current) return;
//     hasInitialized.current = true;
//     const searchHistoryFromLocalStorage = localStorage.getItem("searchHistory");
//     if (searchHistoryFromLocalStorage) {
//       try {
//         const user: { id: string; image: string; name: string }[] = JSON.parse(
//           searchHistoryFromLocalStorage
//         );
//         dispatch(init(user)); // dispatch the action());
//       } catch (error) {
//         console.error("Failed to parse user:", error);
//       }
//     }
//   }, [dispatch]);

//   return null; // Nothing rendered
// }
