# Mudhakkir-App
**Version: 1.0.0-alpha.3**

A respectful, research-oriented desktop application for the deep study of the Holy Qur'an, built with modern technology.

![Mudhakkir-App Screenshot](https://i.imgur.com/gA3q1j3.jpeg)

## About The Project

Mudhakkir-App is not just another digital Mushaf viewer. Its purpose is to provide a powerful, research-oriented platform where the Qur’an can be studied in its authentic high-resolution layout, paired with powerful navigation and, eventually, non-destructive annotation tools.

Unlike typical Qur’an apps that focus on simple reading, this project is designed to:

* **Respect the Mushaf**: The Qur'an text is presented as pristine, high-resolution page scans, ensuring authenticity and preventing digital rendering errors.
* **Enable Deep Study**: With features like a synchronized grid, pan and zoom, and advanced navigation, the application serves as an interactive workspace for students and researchers.
* **Provide a Clean Foundation**: Built from the ground up with a modern tech stack (TypeScript, React, Electron) for a stable, fast, and maintainable experience.

## Core Foundations (Tech Stack)

* **Electron**: Provides the cross-platform desktop runtime for Windows, macOS, and Linux.
* **React**: Drives the user interface, ensuring a responsive and modern experience.
* **TypeScript**: Ensures code quality, stability, and long-term maintainability with static type-checking.
* **Webpack**: Bundles the application and its assets for optimal performance.

## Current Features (v1.0.0-alpha.3)

This version includes a complete foundational viewer and a fully implemented translation and theming system.

* **High-Resolution Mushaf Viewer**
    * Loads and displays all 604 pages of the Madani Mushaf.
* **Interactive Workspace**
    * Smooth, instant pan-and-drag functionality.
    * Seamless, centered zoom via the scroll wheel.
    * A "Reset View" button to perfectly fit the page to the screen.
* **Comprehensive Navigation**
    * Next/Previous page buttons.
    * Editable text input to jump to a specific page.
    * Custom animated dropdowns to jump to any Surah or Juz.
* **Flexible Translation Layer**
    * Loads and displays page-synced English translations.
    * Includes Surah titles within the text for context.
    * Three distinct viewing modes selectable from a dropdown: Book View, Overlay, and a fixed Sidebar.
* **Polished User Interface**
    * Synchronized and toggleable grid overlay.
    * **User-selectable color themes** (Default Dark, Sepia, and Midnight).
    * Smooth cross-fade animations for page transitions.
    * Consistent UI with animated focus effects on all controls.

## Project Structure

The project follows a standard Electron Forge + TypeScript + React layout.

Mudhakkir-App/
├── src/
│   ├── static/
│   │   └── mushaf/         # All 604 Mushaf page scans go here
│   │   └── translations_by_page.json
│   ├── App.css
│   ├── App.tsx           # Main React Component
│   ├── index.css
│   ├── index.html        # Main HTML shell
│   ├── index.ts          # Electron Main Process
│   ├── preload.ts
│   ├── renderer.tsx      # React Entry Point
│   └── types.d.ts
├── forge.config.ts
├── package.json
├── tsconfig.json
└── webpack.*.ts          # Webpack configuration files

## Assets

* **Mushaf Scans**: 604 high-resolution (1171×1180) PNG scans. The file naming has a 4-page offset (e.g., Mushaf Page 1 is `page005.png`).
* **Translation Data**: Uses a pre-processed `translations_by_page.json` file that maps each page to its corresponding English translation text and verse data.

## Roadmap

### Immediate Next Step 🎯

* **Begin the Annotation System (Phase 2)**:
    * Implement the foundational tools for non-destructive annotations.
    * **Goal 1:** Create an "Annotation Mode" toggle (Pan vs. Highlight).
    * **Goal 2:** Build the Highlighting Tool.

### Long-Term Vision 🗺️

* **Annotation System (Continued)**: Add more tools like text notes, drawing, and linking verses.
* **Project Storage**: Implement a system to save and load annotation projects locally.
* **Advanced Tools**: Explore features like concordance search and cross-referencing.