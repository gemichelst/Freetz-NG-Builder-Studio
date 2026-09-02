# FREETZ-NG Builder Studio

![Freetz-NG Logo](https://freetz-ng.github.io/freetz-ng/images/freetz-ng-logo.png)

Welcome to the **FREETZ-NG Builder Studio**! This is the most comprehensive, fully-featured Web UI for configuring, compiling, and deploying custom firmware for AVM FRITZ!Box routers and other compatible devices. 

Freetz-NG is a modification firmware that allows users to add new features, packages, and custom modifications that are not available in the stock firmware. Our studio provides an elegant, modern GUI over the traditional terminal-based build system, making router modification accessible and powerful.

---

## 📑 Table of Contents

1. [Features & Capabilities](#-features--capabilities)
2. [Prerequisites & System Requirements](#-prerequisites--system-requirements)
3. [Installation & Setup (Local Development)](#-installation--setup-local-development)
4. [Deployment (Production)](#-deployment-production)
5. [Architecture & Technologies](#-architecture--technologies)
6. [Detailed Module Documentation](#-detailed-module-documentation)
7. [Freetz-NG Under the Hood](#-freetz-ng-under-the-hood)
8. [About the Developer](#-about-the-developer)

---

## ✨ Features & Capabilities

- **Interactive Dashboard:** Live system health tracking, active build queue monitoring, and docker/environment resource validation.
- **Hardware Profile Configuration:** Instantly select target FRITZ!Box models, set IP ranges, toggle auto-flash behaviors, and setup Build Webhooks for CI/CD integrations.
- **Massive Package Database:** Organized package selection mapping over 150+ tools, patches, themes, host tools, and unstable libraries. Search seamlessly across categories.
- **Live Theme Previewer:** Hover over GUI Themes (Cuma, Legacy, Newfreetz) to instantly see visual palette breakdowns before building them into your firmware.
- **Hardware Compatibility Engine:** Instantly flags incompatibilities (e.g. attempting to build WireGuard on unsupported 3390 kernels) mathematically predicting compilation times and image sizes.
- **Build Queue & Batch Matrix:** Queue multiple firmware builds at once. Drag-and-drop prioritization. Create an entire deployment matrix (e.g. build "VPN Preset" for 7590, 7530, and 7490 simultaneously).
- **Scheduled Builds Engine:** Schedule matrix dispatches to run at specific times (e.g. nightly builds).
- **Build Diff Analyzer:** Compare two different build profiles side-by-side to track exactly what packages were added, removed, or shared.
- **Image Hub & External Sharing:** Download community pre-built `.image` binaries. Filter by OS, packages, or model. Share your own compiled images via external URL linking.
- **Multi-Theme UI:** The Studio itself features multiple design themes: Dark, Light, Simple, and Mobile formats.

---

## 💻 Prerequisites & System Requirements

To run this studio locally on your own machine, you will need the following dependencies:

1. **Node.js**: Minimum version `18.x` (Recommended `20.x` or higher)
2. **NPM**: Minimum version `9.x`
3. **OS**: Debian, Ubuntu, macOS, or Windows Subsystem for Linux (WSL2). *Native Windows is not recommended for actual Freetz compilation.*
4. **Git**: To clone the repository and fetch updates.
5. **Docker** (Optional but highly recommended): For isolated build environments if you choose the "Docker" execution method rather than building directly on the host OS.

---

## 🚀 Installation & Setup (Local Development)

Follow these step-by-step instructions to get the application running on your own machine.

### Step 1: Clone the Repository
Open your terminal and clone the repository to your local file system:
```bash
git clone https://github.com/gemichelst/freetz-ng-studio.git
cd freetz-ng-studio
```

### Step 2: Install Dependencies
The project uses standard NPM dependency management. Install them using:
```bash
npm install
```
*Note: If you encounter Vite or PostCSS dependency issues, running `npm install --legacy-peer-deps` might be necessary depending on your environment.*

### Step 3: Run the Development Server
Start the Vite development server (which handles both the React frontend and the Express API backend simulation if configured):
```bash
npm run dev
```
The terminal will display a local address (usually `http://localhost:3000` or `http://localhost:5173`). Open this URL in your web browser.

---

## 📦 Deployment (Production)

To deploy this application to a production server (like a VPS, AWS, or Heroku):

### Step 1: Build the Application
Compile the TypeScript and React code into static files:
```bash
npm run build
```
This command generates a `dist/` directory containing the optimized application.

### Step 2: Start the Server
Start the production server using the generated bundle:
```bash
npm run start
```
*Note: Make sure your server environment exposes the required ports (typically port `3000`). If using a reverse proxy like Nginx or Apache, route incoming HTTP traffic to this port.*

---

## 🧠 Architecture & Technologies

The **FREETZ-NG Builder Studio** is built upon a modern, high-performance web stack:

- **React 18+**: The core frontend framework.
- **TypeScript**: Ensures type safety, robust code validation, and highly maintainable architecture.
- **Vite**: The lightning-fast build tool and development server.
- **Tailwind CSS v4**: For highly responsive, utility-first styling.
- **Lucide React**: Providing clean, scalable SVG iconography.
- **Recharts**: For rendering payload visualization charts and system health monitoring.
- **Framer Motion (`motion/react`)**: Delivering buttery-smooth step transitions and layout animations.

### File Structure
- `/src/App.tsx`: The primary orchestrator handling routing, state, and UI rendering.
- `/src/data/packages.ts`: The offline database housing every available Freetz-NG package, library, host-tool, and configuration parameter.
- `/src/index.css`: The global stylesheet handling CSS variable injections and dynamic theme switching.
- `/server.ts` (if applicable): The Express.js backend used for API communication and build dispatching.

---

## 🔍 Detailed Module Documentation

### Dashboard
Provides a holistic overview of your build environment. It checks if Docker is reachable, validates network connectivity, and graphs the system resource overhead.

### Hardware Config
Set the parameters of the router you are targeting. This is where you configure the base IP Address, toggle Auto-Flash on completion, and optionally configure Webhook URLs for remote notifications when a build finishes.

### Packages Matrix
The core engine. We imported the comprehensive Markdown lists containing tools, libraries, patches, unstable mods, debug helpers, and web interfaces. Packages are mapped directly to their Freetz counterparts. Dependencies and incompatibilities are dynamically calculated (e.g., trying to install a heavy kernel module on a 3390 will throw a real-time error). 

### Execution & Build Queue
Once configured, you can dispatch the payload into the Build Queue. From the Queue, you can use the **Batch Matrix Generator** to blast a single payload across multiple hardware targets at once, or use the **Scheduled** tab to defer the build to a later time.

### Image Hub
A community-driven repository. Download precompiled images filtered strictly by your active hardware model. You can also upload your `.image` files to Mega or Google Drive and paste the link into the Hub to share it globally.

---

## ⚙️ Freetz-NG Under the Hood

If you want to understand how the actual compilation works behind the scenes, you should read the official documentation:
**[Freetz-NG Official Wiki](https://freetz-ng.github.io/freetz-ng)**

**The Build Process:**
1. **Fetch:** The system downloads the original AVM FRITZ!OS firmware.
2. **Unpack:** The SquashFS filesystem is extracted.
3. **Modify:** Custom binaries (like `dropbear`, `openvpn`, `dnsmasq`) and libraries are injected into the filesystem. The kernel can also be swapped if `Replace Kernel` is selected.
4. **Repack:** The modified filesystem is compressed back into a valid `.image` archive.

---

## 👨‍💻 About the Developer

**gemichelst** - Core Developer & Maintainer

Hi, I'm the developer behind this FREETZ-NG Builder Studio. My goal is to make compiling, configuring, and deploying Freetz-NG firmware as accessible and powerful as possible. By providing a clean, modern GUI over the traditional terminal-based build system, users can manage their router modifications efficiently without needing to be Linux terminal experts.

- **GitHub:** [github.com/gemichelst](https://github.com/gemichelst)
- **Tools Portal:** [tools.doerd.de](https://tools.doerd.de)

*This project is completely open-source. Feel free to contribute, open issues, or submit pull requests!*
