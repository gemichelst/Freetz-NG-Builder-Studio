# Freetz-NG Builder Studio

A comprehensive, full-stack web application designed for generating scripts, managing sources, and building files for Freetz-NG within virtualized Debian or Ubuntu environments. 

## Features

- **Hardware Auto-Detection**: Automatically identifies connected Fritz!Box models on your local network (LAN) and selects the appropriate build targets.
- **Dependency Resolution & Auto-Download**: Resolves and automatically downloads all required toolchains, Freetz-NG packages, and system dependencies prior to the build phase.
- **Freetz-NG Image Hub**: A centralized repository system organized by router model. Browse, download, and flash pre-built Freetz-NG images directly to your device without recompiling.
- **Categorized Package Selection**: Intuitive interface to select packages (Security, Network, System, Media).
- **Advanced Configuration Presets**: Save and load global community configuration presets to quickly reconstruct complex Freetz-NG builds.
- **Transparent Build Simulator**: Real-time logging console via Server-Sent Events (SSE) providing step-by-step insight into the compilation process, accompanied by a dynamic progress bar.
- **Script Generation**: Dynamically outputs a fully configured bash script payload capable of initializing the Freetz-NG environment, resolving dependencies, running `make`, and remotely flashing the firmware.

## High-Density Design Theme

The Freetz-NG Builder Studio employs a professional, high-density interface:
- **Dark, High-Contrast Palette**: Built around deep slate and void colors (`#0d0f12`, `#161a20`) for reduced eye strain during long terminal sessions.
- **Emerald & Amber Accents**: Actionable elements and terminal logs use high-visibility emerald-500, while warnings use amber.
- **Utility Typography**: Monospaced font tracking for system readouts, IP configurations, and console logs.

## Getting Started

### Prerequisites

- Node.js (v18+)
- A Debian or Ubuntu virtual machine / host (for actual Freetz-NG compilation).

### Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application in development mode:
   ```bash
   npm run dev
   ```
4. To build for production:
   ```bash
   npm run build
   npm start
   ```

## Workflow

1. **Hardware Config**: Select your target Fritz!Box model, define the target IP address, and optionally toggle automatic flashing. Or choose to load a community preset.
2. **Package Selection**: Toggle necessary network, system, and media packages.
3. **Execution**: Generate the deployment script or start the Freetz-NG build process. Monitor the real-time build stages directly from your browser.
4. **Image Hub (Prebuilt Images)**: Navigate to the Image Hub to browse community-verified prebuilt Freetz-NG images tailored for specific FritzOS versions.

---

*This project integrates the standard Freetz-NG scripts into a modernized web platform.*
