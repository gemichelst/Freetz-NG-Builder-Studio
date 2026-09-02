import { ReactNode } from 'react';

export type PackageItem = {
  id: string;
  req: string[];
  conf: string[];
  estSize: number;
  estTime: number;
  incompatModels: string[];
  description?: string;
  themeStyle?: { bg: string, header: string, accent: string, text: string };
};

export type PackageCategory = {
  cat: string;
  iconName: string;
  items: PackageItem[];
};

export const PACKAGES_DB: PackageCategory[] = [
  {
    cat: 'Patches',
    iconName: 'Layers',
    items: [
      { id: 'Remove brandings', req: [], conf: [], estSize: 0, estTime: 1, incompatModels: [], description: 'Removes provider specific brandings.' },
      { id: 'Replace kernel', req: [], conf: [], estSize: 1.5, estTime: 8, incompatModels: ['3390', '7520'], description: 'Compiles a custom kernel with additional modules.' },
      { id: 'Freetzmount', req: [], conf: [], estSize: 0.2, estTime: 2, incompatModels: [], description: 'Advanced USB mounting and uStor offloading.' },
      { id: 'Maxdev', req: [], conf: [], estSize: 2.1, estTime: 5, incompatModels: [], description: 'Maximum development environment.' },
      { id: 'privatekeypassword', req: [], conf: [], estSize: 0.1, estTime: 1, incompatModels: [], description: 'Reveals the password for AVM private key file.' },
    ]
  },
  {
    cat: 'Themes',
    iconName: 'Play',
    items: [
      { id: 'Cuma', req: [], conf: [], estSize: 1.1, estTime: 1, incompatModels: [], themeStyle: { bg: '#1c1c1c', header: '#ff8c00', accent: '#ff8c00', text: '#e0e0e0' }, description: 'Dark theme with orange accents.' },
      { id: 'Legacy', req: [], conf: [], estSize: 0.5, estTime: 1, incompatModels: [], themeStyle: { bg: '#e0e0e0', header: '#3b5998', accent: '#3b5998', text: '#333333' }, description: 'Classic Freetz design.' },
      { id: 'Newfreetz', req: [], conf: [], estSize: 1.3, estTime: 1, incompatModels: [], themeStyle: { bg: '#ffffff', header: '#0078d7', accent: '#00a8e8', text: '#222222' }, description: 'Clean white/blue modern theme.' },
      { id: 'Phoenix', req: [], conf: [], estSize: 1.8, estTime: 2, incompatModels: [], themeStyle: { bg: '#0f0f0f', header: '#d32f2f', accent: '#f44336', text: '#ffffff' }, description: 'Aggressive dark mode with red tones.' }
    ]
  },
  {
    cat: 'Web Interfaces',
    iconName: 'Globe',
    items: [
      { id: 'Addhole', req: ['Dnsmasq'], conf: [], estSize: 0.9, estTime: 3, incompatModels: [], description: 'Downloads block lists and adds them to dnsmasq.' },
      { id: 'AVM-firewall', req: [], conf: [], estSize: 0.4, estTime: 1, incompatModels: [], description: 'Configuration front-end for AVM-firewall.' },
      { id: 'AVM-forwarding', req: [], conf: [], estSize: 0.3, estTime: 1, incompatModels: [], description: 'Configuration of forwardings to FB itself.' },
      { id: 'AVM-portfw', req: [], conf: [], estSize: 0.3, estTime: 1, incompatModels: [], description: 'Configuration of port forwardings to the FritzBox itself (internet_forwardrules).' },
      { id: 'AVM-rules', req: [], conf: [], estSize: 0.3, estTime: 1, incompatModels: [], description: 'Configuration of port forwardings to the FritzBox itself (pcplisten).' },
      { id: 'dnsd-cgi', req: ['dnsd'], conf: [], estSize: 0.2, estTime: 1, incompatModels: [], description: 'WebIF for dnsd (busybox applet).' },
      { id: 'Downloader CGI', req: ['Downloader'], conf: [], estSize: 0.2, estTime: 1, incompatModels: [], description: 'Web interface for the Downloader package.' },
      { id: 'Iptables-CGI', req: ['Iptables'], conf: ['Iptables-NG'], estSize: 0.5, estTime: 2, incompatModels: [], description: 'Deprecated Iptables configuration interface.' },
      { id: 'Iptables-NG', req: ['Iptables'], conf: ['Iptables-CGI'], estSize: 0.8, estTime: 2, incompatModels: [], description: 'Advanced iptables/ip6tables management page.' },
      { id: 'NFSD CGI', req: ['NFS-Server'], conf: [], estSize: 0.3, estTime: 1, incompatModels: [], description: 'Configuration frontend to NFS-server.' },
      { id: 'Onlinechanged-CGI', req: [], conf: [], estSize: 0.2, estTime: 1, incompatModels: [], description: 'Execute commands on online-status changes.' },
      { id: 'RRDstats', req: ['RRDtool'], conf: [], estSize: 1.2, estTime: 3, incompatModels: [], description: 'View graphically various stats of your Freetz Box.' },
      { id: 'Syslogd CGI', req: ['Syslogd'], conf: [], estSize: 0.2, estTime: 1, incompatModels: [], description: 'Configuration frontend to syslogd.' },
      { id: 'Transmission CGI', req: ['Transmission'], conf: [], estSize: 0.3, estTime: 1, incompatModels: [], description: 'Configuration interface for transmission-daemon.' },
      { id: 'wol-cgi', req: ['Wake-on-LAN'], conf: [], estSize: 0.2, estTime: 1, incompatModels: [], description: 'Wake-on-LAN (WoL) Web Interface.' }
    ]
  },
  {
    cat: 'Network',
    iconName: 'Wifi',
    items: [
      { id: 'BIND', req: [], conf: [], estSize: 2.5, estTime: 6, incompatModels: [], description: 'Suite of software for interacting with the DNS.' },
      { id: 'BIRD', req: [], conf: [], estSize: 1.2, estTime: 4, incompatModels: [], description: 'The BIRD Internet Routing Daemon.' },
      { id: 'Curl', req: ['libcurl'], conf: [], estSize: 0.8, estTime: 3, incompatModels: [], description: 'Command line tool for transferring files with URL syntax.' },
      { id: 'Dnsmasq', req: [], conf: ['dnsd'], estSize: 0.8, estTime: 2, incompatModels: [], description: 'Combined DHCP, DNS and TFTP server.' },
      { id: 'dnsd', req: [], conf: ['Dnsmasq'], estSize: 0.4, estTime: 1, incompatModels: [], description: 'Busybox DNS server applet.' },
      { id: 'Dropbear', req: [], conf: [], estSize: 0.6, estTime: 2, incompatModels: [], description: 'Small SSH 2 server and client.' },
      { id: 'Downloader', req: [], conf: [], estSize: 0.3, estTime: 1, incompatModels: [], description: 'Download files from HTTP or FTP server during the boot process.' },
      { id: 'HAProxy', req: [], conf: [], estSize: 1.5, estTime: 4, incompatModels: [], description: 'High availability, load balancing, and proxying.' },
      { id: 'IGMPproxy', req: [], conf: [], estSize: 0.4, estTime: 2, incompatModels: [], description: 'Multicast Routing Daemon using IGMP signalling.' },
      { id: 'Inadyn-mt', req: [], conf: [], estSize: 0.3, estTime: 1, incompatModels: [], description: 'Simple Dynamic DNS client.' },
      { id: 'Mosquitto', req: ['libssl', 'libcrypto'], conf: [], estSize: 1.2, estTime: 4, incompatModels: [], description: 'Eclipse Mosquitto MQTT broker.' },
      { id: 'NFS-Server', req: [], conf: [], estSize: 1.6, estTime: 5, incompatModels: [], description: 'Linux NFS server utility package.' },
      { id: 'OpenSSH', req: ['libcrypto'], conf: [], estSize: 2.1, estTime: 5, incompatModels: [], description: 'Premier connectivity tool for remote login.' },
      { id: 'OpenVPN', req: ['libssl', 'liblzo2'], conf: [], estSize: 2.2, estTime: 6, incompatModels: [], description: 'VPN Server and Client.' },
      { id: 'Privoxy', req: [], conf: [], estSize: 1.3, estTime: 4, incompatModels: [], description: 'Web proxy with advanced filtering capabilities.' },
      { id: 'Samba', req: [], conf: [], estSize: 4.5, estTime: 8, incompatModels: [], description: 'SMB/CIFS file and print server.' },
      { id: 'Tor', req: ['libssl', 'libevent'], conf: [], estSize: 3.5, estTime: 7, incompatModels: [], description: 'The Onion Router.' },
      { id: 'Transmission', req: ['libcurl', 'libevent'], conf: [], estSize: 2.8, estTime: 6, incompatModels: [], description: 'Fast, easy, and free BitTorrent client.' },
      { id: 'vsftpd', req: [], conf: [], estSize: 0.5, estTime: 2, incompatModels: [], description: 'A fast and secure FTP server.' },
      { id: 'Wake-on-LAN', req: [], conf: [], estSize: 0.1, estTime: 1, incompatModels: [], description: 'Simple utility to wake up hardware.' },
      { id: 'WireGuard', req: ['Replace kernel', 'wireguard-linux-compat'], conf: [], estSize: 1.5, estTime: 5, incompatModels: ['3390', '7520'], description: 'Fast and modern VPN.' }
    ]
  },
  {
    cat: 'System',
    iconName: 'Settings',
    items: [
      { id: 'Atop', req: [], conf: [], estSize: 0.4, estTime: 2, incompatModels: [], description: 'Interactive monitor to view the load on a Linux system.' },
      { id: 'cronD', req: [], conf: [], estSize: 0.2, estTime: 1, incompatModels: [], description: 'Cron daemon for scheduling tasks.' },
      { id: 'htop', req: ['ncurses'], conf: [], estSize: 0.4, estTime: 1, incompatModels: [], description: 'Interactive process viewer.' },
      { id: 'Inetd', req: [], conf: [], estSize: 0.1, estTime: 1, incompatModels: [], description: 'Internet superserver daemon.' },
      { id: 'mc', req: ['ncurses', 'glib2'], conf: [], estSize: 1.8, estTime: 3, incompatModels: [], description: 'Midnight Commander file manager.' },
      { id: 'nano', req: ['ncurses'], conf: [], estSize: 0.3, estTime: 1, incompatModels: [], description: 'Small and friendly text editor.' },
      { id: 'onlinechanged', req: [], conf: [], estSize: 0.1, estTime: 1, incompatModels: [], description: 'Triggers scripts on connection state changes.' },
      { id: 'Screen', req: ['ncurses'], conf: [], estSize: 0.5, estTime: 2, incompatModels: [], description: 'Terminal multiplexer.' },
      { id: 'SSH authorized-keys', req: [], conf: [], estSize: 0.1, estTime: 1, incompatModels: [], description: 'Frontend for managing authorized keys.' },
      { id: 'Swap', req: [], conf: [], estSize: 0.1, estTime: 1, incompatModels: [], description: 'Enables swap space support.' },
      { id: 'Syslogd', req: [], conf: [], estSize: 0.2, estTime: 1, incompatModels: [], description: 'System logging daemon.' }
    ]
  },
  {
    cat: 'Misc / Tools',
    iconName: 'Terminal',
    items: [
      { id: 'LCD4linux', req: [], conf: [], estSize: 1.4, estTime: 4, incompatModels: ['3390'], description: 'Program that displays information on an external LCD.' },
      { id: 'ImageMagick', req: ['zlib', 'libjpeg', 'libpng'], conf: [], estSize: 5.5, estTime: 9, incompatModels: [], description: 'Tools and libraries to manipulate images.' },
      { id: 'jq', req: [], conf: [], estSize: 0.4, estTime: 2, incompatModels: [], description: 'Command-line JSON processor.' },
      { id: 'rsync', req: [], conf: [], estSize: 0.6, estTime: 2, incompatModels: [], description: 'Fast incremental file transfer.' },
      { id: 'smartmontools', req: [], conf: [], estSize: 0.8, estTime: 2, incompatModels: [], description: 'Monitor storage systems using S.M.A.R.T.' },
      { id: 'socat', req: [], conf: [], estSize: 0.5, estTime: 2, incompatModels: [], description: 'Extended netcat-like utility.' },
      { id: 'tcpdump', req: ['libpcap'], conf: [], estSize: 0.7, estTime: 2, incompatModels: [], description: 'Network monitoring and data acquisition tool.' },
      { id: 'tmux', req: ['ncurses', 'libevent'], conf: [], estSize: 0.8, estTime: 3, incompatModels: [], description: 'Alternative to GNU screen.' },
      { id: 'wget', req: ['libssl'], conf: [], estSize: 0.5, estTime: 2, incompatModels: [], description: 'Utility for retrieving files using HTTP, HTTPS and FTP.' }
    ]
  },
  {
    cat: 'Libraries',
    iconName: 'Archive',
    items: [
      { id: 'glib2', req: [], conf: [], estSize: 2.1, estTime: 4, incompatModels: [], description: 'Library containing useful C routines.' },
      { id: 'libcrypto', req: [], conf: [], estSize: 1.2, estTime: 3, incompatModels: [], description: 'OpenSSL crypto library.' },
      { id: 'libcurl', req: ['libssl'], conf: [], estSize: 0.6, estTime: 2, incompatModels: [], description: 'Client-side URL transfer library.' },
      { id: 'libevent', req: [], conf: [], estSize: 0.5, estTime: 2, incompatModels: [], description: 'Asynchronous event notification library.' },
      { id: 'libjpeg', req: [], conf: [], estSize: 0.4, estTime: 1, incompatModels: [], description: 'Library for handling the JPEG image format.' },
      { id: 'liblzo2', req: [], conf: [], estSize: 0.5, estTime: 1, incompatModels: [], description: 'Portable lossless data compression library.' },
      { id: 'libpcap', req: [], conf: [], estSize: 0.5, estTime: 2, incompatModels: [], description: 'System-independent interface for user-level packet capture.' },
      { id: 'libpng', req: ['zlib'], conf: [], estSize: 0.4, estTime: 1, incompatModels: [], description: 'Official PNG reference library.' },
      { id: 'libssl', req: ['libcrypto'], conf: [], estSize: 1.4, estTime: 3, incompatModels: [], description: 'OpenSSL SSL/TLS library.' },
      { id: 'ncurses', req: [], conf: [], estSize: 0.8, estTime: 2, incompatModels: [], description: 'API for text user interfaces.' },
      { id: 'wireguard-linux-compat', req: [], conf: [], estSize: 0.3, estTime: 2, incompatModels: [], description: 'Kernel module required for Wireguard.' },
      { id: 'zlib', req: [], conf: [], estSize: 0.4, estTime: 1, incompatModels: [], description: 'Lossless data-compression library.' }
    ]
  },
  {
    cat: 'Debug Helpers',
    iconName: 'Activity',
    items: [
      { id: 'binutils-tools', req: [], conf: [], estSize: 1.5, estTime: 3, incompatModels: [], description: 'Collection of tools for analyzing ELF binaries.' },
      { id: 'file', req: [], conf: [], estSize: 0.2, estTime: 1, incompatModels: [], description: 'Determine file type.' },
      { id: 'ldd', req: [], conf: [], estSize: 0.1, estTime: 1, incompatModels: [], description: 'Prints shared libraries required by programs.' },
      { id: 'lsof', req: [], conf: [], estSize: 0.3, estTime: 1, incompatModels: [], description: 'Lists information about files opened by processes.' },
      { id: 'ltrace', req: [], conf: [], estSize: 0.4, estTime: 2, incompatModels: [], description: 'Library call tracer.' },
      { id: 'strace', req: [], conf: [], estSize: 0.6, estTime: 2, incompatModels: [], description: 'Trace system calls and signals.' }
    ]
  },
  {
    cat: 'Host Tools',
    iconName: 'Cpu',
    items: [
      { id: 'autoconf', req: [], conf: [], estSize: 0.5, estTime: 2, incompatModels: [] },
      { id: 'automake', req: [], conf: [], estSize: 0.5, estTime: 2, incompatModels: [] },
      { id: 'busybox', req: [], conf: [], estSize: 1.2, estTime: 3, incompatModels: [] },
      { id: 'cmake', req: [], conf: [], estSize: 3.5, estTime: 8, incompatModels: [] },
      { id: 'make', req: [], conf: [], estSize: 0.5, estTime: 2, incompatModels: [] },
      { id: 'ninja', req: [], conf: [], estSize: 0.8, estTime: 2, incompatModels: [] },
      { id: 'patchelf', req: [], conf: [], estSize: 0.3, estTime: 1, incompatModels: [] },
      { id: 'pkgconf', req: [], conf: [], estSize: 0.2, estTime: 1, incompatModels: [] }
    ]
  },
  {
    cat: 'Unstable',
    iconName: 'AlertTriangle',
    items: [
      { id: 'Asterisk', req: [], conf: [], estSize: 8.5, estTime: 15, incompatModels: [], description: 'Communications applications framework.' },
      { id: 'Collectd', req: [], conf: [], estSize: 1.5, estTime: 3, incompatModels: [], description: 'Collects information about the system.' },
      { id: 'Iptables', req: [], conf: [], estSize: 1.2, estTime: 4, incompatModels: [], description: 'Netfilter/iptables.' },
      { id: 'MySQL', req: [], conf: [], estSize: 12.0, estTime: 20, incompatModels: [], description: 'SQL database server.' },
      { id: 'Python', req: [], conf: [], estSize: 15.5, estTime: 18, incompatModels: [], description: 'Python 2.7.18 - DEPRECATED.' }
    ]
  }
];
