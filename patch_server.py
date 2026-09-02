import re

with open("server.ts", "r") as f:
    content = f.read()

bad = """  app.get("/api/system-alerts", (req, res) => {"""

good = """  app.post("/api/cleanup", (req, res) => {
    setTimeout(() => {
      res.json({ success: true, message: 'Cleaned up 1.2GB of temporary files and dangling Docker volumes.' });
    }, 1000);
  });

  app.post("/api/wiki/update", (req, res) => {
    setTimeout(() => {
      res.json({ success: true, message: 'Wiki page updated successfully.' });
    }, 500);
  });

  app.post("/api/rotate-logs", (req, res) => {
    res.json({ success: true, message: 'System logs have been successfully rotated and old archives compressed.' });
  });

  app.get("/api/system-alerts", (req, res) => {"""

content = content.replace(bad, good)

with open("server.ts", "w") as f:
    f.write(content)
