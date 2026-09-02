# Freetz-NG Web Studio

Freetz-NG Web Studio is a highly advanced, modern web interface for orchestrating, configuring, and compiling custom firmware for FRITZ!Box routers using the Freetz-NG build system. 

It completely replaces the legacy terminal-driven menuconfig with a rich, interactive, and intelligent graphical dashboard.

## Features

### 1. Hardware & OS Configuration
- Select target router models (7590, 7530, 7490, 6591, 3390, 7560, 7520, etc.).
- Target specific FRITZ!OS versions.
- Configure IP addresses, execution modes (Direct or Docker).

### 2. Intelligent Package Selection
- **Deep Database:** Browse over 30+ categorized Freetz-NG packages, patches, tools, libraries, and themes.
- **Smart Dependency Resolution:** Automatically pulls in required libraries (e.g., selecting OpenVPN pulls in `libssl` and `liblzo2`).
- **Conflict Prevention:** Prevents you from selecting mutually exclusive packages (e.g., `Dnsmasq` and `dnsd`).
- **Hardware Compatibility Validator:** Ensures packages are supported on your selected router model, disabling or warning about incompatible selections.
- **Payload Search:** Fast text-based filtering to find specific packages or libraries instantly.
- **External Flash (uStor):** Automated support for offloading large images to external USB storage via `Freetzmount`.

### 3. Presets & Templating
- **Predefined Presets:** Load community-standard profiles (e.g., VPN Hub, Ad-Blocker, Minimal Starter, Maxdev Sandbox).
- **Custom Preset Categories:** Group, organize, and sync your own custom configurations securely with the cloud.
- **Build Batch Templating:** Create complex batch compilation jobs. Select a base preset and dynamically matrix it across multiple hardware models, dispatching everything to the queue simultaneously.

### 4. Build Queue & Orchestration
- **Drag-and-Drop Queue:** Easily re-prioritize pending build jobs by dragging items within the queue.
- **Live Telemetry:** Monitor real-time compilation states (Setup -> Compile -> Complete) across parallel runners.
- **Batch History:** Audit your previous batch compilation jobs, tracking total successes and failures across fleets.

### 5. Advanced Execution & Auditing
- **Live Log Streaming:** Watch the compiler output in real time.
- **Syntax Highlighting:** Intelligent Regex-powered highlighting parses standard Freetz-NG Make logs, highlighting errors in red, warnings in amber, success steps in green, and specific paths in cyan.
- **Export Capabilities:** Download your full historical compilation logs as JSON artifacts for offline debugging and compliance.
- **Browser Notifications:** Get alerted immediately when long-running background compilations successfully finish.

## Tech Stack
Built using React, Tailwind CSS, TypeScript, and Lucide Icons. The UI features motion-based route transitions for a native application feel.
