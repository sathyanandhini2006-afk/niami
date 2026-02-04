# 🎯 Milo Project Architecture

This project follows a **Clean Architecture** pattern, separating the **Visual (UI/UX)** from the **Core Logic (The Brain)**. This makes the code professionally organized, easy to test, and highly scalable.

---

## 🎨 THE FACE (UI/UX Layer) - `src/ui/`
*Contains everything the user sees and interacts with.*

*   **`src/ui/assets/`**: Images, SVGs, and static icons.
*   **`src/ui/components/`**: 
    *   **Reusable UI**: Buttons, Inputs, Cards, and Badges.
    *   **Layout**: The Navbar, Footer, and Page wrappers.
    *   **Auth**: Social/Emoji security interface components.
*   **`src/ui/pages/`**: The main screens of the app (Dashboard, Calendar, Analytics).
*   **`src/index.css`**: The global design system, colors, glassmorphism effects, and the 3D Color Splash background.

---

## 🧠 THE BRAIN (Core Logic Layer) - `src/logic/`
*Contains the "intelligence" of the app. It handles data, security, and math.*

*   **`src/logic/context/`**: **THE HEART.** Manages global state (User Auth, Task Management, Toast notifications). This is where the decisions happen.
*   **`src/logic/services/`**: Handles data persistence (LocalStorage API) and external communications.
*   **`src/logic/types/`**: The "Blueprint" of the app. Defines what a Task, User, or Category looks like using TypeScript.
*   **`src/logic/hooks/`**: Custom logic shortcuts used across multiple screens.
*   **`src/logic/utils/`**: Helper functions for date formatting, calculations, and data sorting.

---

## 🚀 How it connects
1.  **UI** calls a **Hook** or **Context** to ask for data.
2.  **Logic** processes the data (math/sorting) and talks to a **Service**.
3.  **Service** saves the data to the browser.
4.  **UI** automatically updates to show the new result to the user.

---

*“Design is not just what it looks like and feels like. Design is how it works.”* – Steve Jobs
