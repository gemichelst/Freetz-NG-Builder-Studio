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

  app.get("/api/docker-status", (req, res) => {
    res.json({
      running: true,
      activeContainers: 1,
      version: "24.0.5",
      memoryUsage: "45%"
    });
  });

  app.get("/api/build-health", (req, res) => {
    res.json([
      { date: 'Mon', success: 4, failed: 1 },
      { date: 'Tue', success: 6, failed: 0 },
      { date: 'Wed', success: 5, failed: 2 },
      { date: 'Thu', success: 8, failed: 1 },
      { date: 'Fri', success: 7, failed: 0 },
      { date: 'Sat', success: 3, failed: 0 },
      { date: 'Sun', success: 9, failed: 1 },
    ]);
  });

  app.get("/api/system-resources", (req, res) => {
    // Return last 10 ticks for live monitoring
    const data = Array.from({ length: 15 }).map((_, i) => ({
      time: `-${15 - i}s`,
      cpu: Math.floor(Math.random() * 30) + 15,
      memory: Math.floor(Math.random() * 10) + 40,
      diskIo: Math.floor(Math.random() * 50) + 5
    }));
    res.json(data);
  });

  app.post("/api/schedule-build", (req, res) => {
    const { scheduleTime, config } = req.body;
    res.json({ success: true, message: `Build scheduled successfully for ${scheduleTime}` });
  });

  app.get("/api/compare-versions", (req, res) => {
    res.json({
      baseVersion: "2.3-stable",
      targetVersion: "2.4-stable",
      added: ["wireguard-tools (1.0.2)", "nano (7.2)", "curl (8.1.0)"],
      removed: ["old-package-deprecated (1.0)"],
      updated: ["openssl (1.1.1 -> 3.0.8)", "dnsmasq (2.85 -> 2.89)"]
    });
  });

  app.get("/api/logs-history", (req, res) => {
    res.json([
      { id: 'b-1001', date: '2023-10-25 14:30', status: 'success', model: '7590', logs: ['Initializing build...', 'Make menuconfig...', 'Build successful.'] },
      { id: 'b-1002', date: '2023-10-26 09:15', status: 'failed', model: '7490', logs: ['Initializing build...', 'Error: Missing dependencies.', 'Build failed.'] },
      { id: 'b-1003', date: '2023-10-27 16:45', status: 'success', model: '6591', logs: ['Starting container...', 'Compiling...', 'Done.'] }
    ]);
  });

  app.post("/api/quick-flash", (req, res) => {
    const { ip, filename } = req.body;
    res.json({ success: true, message: `Flashing ${filename} to ${ip} initiated.` });
  });

  app.get("/api/system-alerts", (req, res) => {
    res.json([
      { id: 1, type: 'warning', message: 'CPU Usage exceeded 80% in the last hour.' },
      { id: 2, type: 'error', message: 'Recent build (b-1002) failed due to missing dependencies.' }
    ]);
  });

  let buildQueue = [
    { id: 'bq-2001', model: '7590', status: 'building', progress: 45, packages: 12 },
    { id: 'bq-2002', model: '3390', status: 'queued', progress: 0, packages: 5 },
    { id: 'bq-2003', model: '7520', status: 'queued', progress: 0, packages: 8 }
  ];

  app.get("/api/build-queue", (req, res) => {
    res.json(buildQueue);
  });

  app.post("/api/batch-process", (req, res) => {
    const { configs } = req.body;
    const newItems = configs.map((c: any, i: number) => ({
      id: `bq-300${i}`, model: c.model, status: 'queued', progress: 0, packages: c.packages?.length || 0
    }));
    buildQueue = [...buildQueue, ...newItems];
    res.json({ success: true, queue: buildQueue });
  });

  app.post("/api/sync-presets", (req, res) => {
    // Simulate cloud sync delay
    setTimeout(() => {
      res.json({ success: true, message: 'Presets successfully synchronized with cloud.' });
    }, 1500);
  });

  app.get("/api/batch-history", (req, res) => {
    res.json([
      { batchId: 'B-8001', date: '2023-11-01 10:00', total: 4, successful: 4, failed: 0, models: ['7590', '7490'] },
      { batchId: 'B-8002', date: '2023-11-02 14:20', total: 5, successful: 3, failed: 2, models: ['6591', '7530'] },
      { batchId: 'B-8003', date: '2023-11-05 08:45', total: 2, successful: 2, failed: 0, models: ['3390', '7520'] }
    ]);
  });

  app.post("/api/reorder-queue", (req, res) => {
    const { queue } = req.body;
    buildQueue = queue;
    res.json({ success: true, queue: buildQueue });
  });

  app.post("/api/generate-script", (req, res) => {
    const config = req.body;
    
    let script = `#!/bin/bash\n\n`;
    script += `# Freetz-NG Builder Script\n`;
    script += `# Generated for ${config.model || 'Unknown Model'} (FritzOS ${config.osVersion || 'Unknown'})\n`;
    script += `# Build Method: ${config.buildMethod || 'direct'}\n\n`;
    
    script += `set -e\n\n`;
    
    script += `echo "Setting up Freetz-NG environment..."\n`;

    if (config.buildMethod === 'docker') {
      script += `echo "Deploying Docker container..."\n`;
      script += `chmod +x freetz/packages/scripts/install-as-docker.sh\n`;
      script += `./freetz/packages/scripts/install-as-docker.sh\n\n`;
      script += `rm -rf freetz/packages/i-matik\n`;
      script += `mkdir -p freetz/packages/i-matik\n`;
      script += `umask 0022 freetz/packages/i-matik\n\n`;
    } else {
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
