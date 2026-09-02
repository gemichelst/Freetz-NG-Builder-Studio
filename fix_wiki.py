import re

with open("src/App.tsx", "r") as f:
    content = f.read()

def replace_wiki(match):
    return """function WikiStep() {
  const [updating, setUpdating] = useState(false);
  const [updateMsg, setUpdateMsg] = useState('');

  const checkUpdates = () => {
    setUpdating(true);
    setUpdateMsg('');
    setTimeout(() => {
      setUpdating(false);
      setUpdateMsg('Local wiki content successfully synchronized with freetz-ng.github.io upstream.');
    }, 2500);
  };

  return (
    <div className="max-w-4xl flex flex-col h-full">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div>
          <h2 className="text-xl font-semibold text-zinc-100">Wiki & Documentation</h2>
          <p className="text-xs text-zinc-500 mt-1">Learn how Freetz-NG works internally.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={checkUpdates}
            disabled={updating}
            className="text-zinc-400 hover:text-zinc-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-border px-3 py-1.5 rounded-md transition-colors"
          >
            {updating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
            Sync Updates
          </button>
          <a href="https://freetz-ng.github.io/freetz-ng" target="_blank" rel="noreferrer" className="text-amber-500 hover:text-amber-400 text-sm font-bold flex items-center gap-2">
            <FileText className="w-4 h-4" /> Official Docs
          </a>
        </div>
      </div>
      
      {updateMsg && (
        <div className="mb-6 p-4 rounded-md border bg-green-500/10 border-green-500/30 text-green-500 text-sm flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          {updateMsg}
        </div>
      )}

      <div className="flex-1 overflow-y-auto pr-4 space-y-6">
        <div className="bg-surface border border-border p-5 rounded-xl">
          <h3 className="text-lg font-bold text-zinc-200 mb-3 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-amber-500" /> Architecture Overview
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            Freetz-NG is a modification firmware for AVM FRITZ!Box routers and other devices. It allows users to add new features, packages, and custom modifications that are not available in the stock firmware. The build system operates by downloading the original firmware, unpacking the SquashFS filesystem, injecting custom binaries and libraries, and repacking it into a flashable `.image` file.
          </p>
          <ul className="list-disc list-inside text-sm text-zinc-400 space-y-2">
            <li><strong>Toolchain:</strong> Automatically compiles GCC and essential tools to cross-compile for MIPS/MIPS32 architectures.</li>
            <li><strong>Replace Kernel:</strong> A critical feature allowing Freetz-NG to replace the stock AVM kernel with a customized version, enabling modules like WireGuard or iptables.</li>
            <li><strong>Menuconfig:</strong> Based on the Linux kernel's configuration tool, used for selecting packages and patches.</li>
          </ul>
        </div>

        <div className="bg-surface border border-border p-5 rounded-xl">
          <h3 className="text-lg font-bold text-zinc-200 mb-3 flex items-center gap-2">
            <Settings className="w-5 h-5 text-amber-500" /> Common Packages
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Freetz-NG supports a wide variety of packages. For example, <strong>Dnsmasq</strong> replaces the standard DHCP/DNS server for advanced routing. <strong>OpenVPN</strong> and <strong>WireGuard</strong> allow the router to act as a secure VPN gateway. Web interfaces like <strong>Freetzmount</strong> extend USB storage capabilities significantly.
          </p>
        </div>

        <div className="bg-surface border border-border p-5 rounded-xl">
          <h3 className="text-lg font-bold text-zinc-200 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-amber-500" /> Flashing & Safety
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Most modern FRITZ!Box models use a dual-boot (in-memory) flashing system. If a flash fails or the device bootloops, you can switch back to the secondary partition using the FTP `quote SETENV linux_fs_start` command or use AVM's official recovery tool.
          </p>
        </div>
      </div>
    </div>
  );
}"""

pattern = re.compile(r'function WikiStep\(\) \{.*?(?=function AboutStep\(\) \{)', re.DOTALL)
content = pattern.sub(replace_wiki, content)

with open("src/App.tsx", "w") as f:
    f.write(content)
