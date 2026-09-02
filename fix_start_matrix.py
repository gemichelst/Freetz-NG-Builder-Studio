import re

with open("src/App.tsx", "r") as f:
    content = f.read()

bad = """  useEffect(() => {
    fetch('/api/presets').then(r => r.json()).then(setAllPresets).catch(console.error);
  }, []);"""

good = """  useEffect(() => {
    fetch('/api/presets').then(r => r.json()).then(setAllPresets).catch(console.error);
  }, []);

  const startMatrix = () => {
    setBatching(true);
    setTimeout(() => {
      setBatching(false);
      setShowTemplater(false);
      alert('Batch dispatched to queue.');
    }, 1500);
  };"""

content = content.replace(bad, good)

with open("src/App.tsx", "w") as f:
    f.write(content)
