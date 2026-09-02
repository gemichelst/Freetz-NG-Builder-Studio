import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  
  // Storage for presets (in-memory for demo)
  const presets: Record<string, any> = {};

  app.get("/api/presets", (req, res) => {
    res.json(Object.values(presets));
  });

  app.post("/api/presets", (req, res) => {
    const preset = req.body;
    if (!preset.id) {
      preset.id = Date.now().toString();
    }
    presets[preset.id] = preset;
    res.json(preset);
  });

  app.post("/api/generate-script", (req, res) => {
    const config = req.body;
    
    let script = `#!/bin/bash\n\n`;
    script += `# Freetz-NG Builder Script\n`;
    script += `# Generated for ${config.model || 'Unknown Model'} (FritzOS ${config.osVersion || 'Unknown'})\n\n`;
    
    script += `set -e\n\n`;
    
    script += `echo "Setting up Freetz-NG environment..."\n`;
    script += `rm -rf freetz/packages/freetz-ng\n`;
    script += `mkdir -p freetz/packages/freetz-ng\n`;
    script += `umask 0022 freetz/packages/freetz-ng\n\n`;
    
    script += `rm -rf freetz/packages/i-matik\n`;
    script += `mkdir -p freetz/packages/i-matik\n`;
    script += `umask 0022 freetz/packages/i-matik\n\n`;
    
    script += `echo "Cloning Freetz-NG..."\n`;
    script += `git clone https://github.com/Freetz-NG/freetz-ng.git freetz/packages/freetz-ng\n`;
    script += `cd freetz/packages/freetz-ng\n\n`;
    
    script += `echo "Building prerequisites..."\n`;
    script += `make tools/prerequisites install\n`;
    script += `make tools\n\n`;
    
    script += `echo "Configuring build for ${config.model}..."\n`;
    script += `make menuconfig\n\n`;
    
    script += `echo "Compiling firmware..."\n`;
    script += `make\n\n`;
    
    if (config.autoFlash && config.ipAddress) {
      script += `echo "Flashing router at ${config.ipAddress}..."\n`;
      script += `./tools/push_firmware images/*.image ${config.ipAddress}\n`;
    }
    
    script += `echo "Build and setup complete!"\n`;
    
    res.json({ script });
  });

  app.get("/api/build-stream", (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    const logs = [
      "Initializing build environment...",
      "Setting umask and creating directories...",
      "Cloning Freetz-NG repository...",
      "Resolving dependencies...",
      "Building toolchain and prerequisites...",
      "Applying patches for target model...",
      "Compiling selected packages...",
      "Packing kernel and filesystem...",
      "Generating .image and .external files...",
      "Build finished successfully."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        res.write(`data: ${JSON.stringify({ log: logs[i], progress: Math.round(((i+1)/logs.length)*100) })}\n\n`);
        i++;
      } else {
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        clearInterval(interval);
        res.end();
      }
    }, 1000);
    
    req.on('close', () => {
      clearInterval(interval);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
