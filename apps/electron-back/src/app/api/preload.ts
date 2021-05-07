import { SerialPort } from 'serialport';
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  platform: process.platform,
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getSerialPorts: () => ipcRenderer.invoke('get-serial-ports'),
  readData: (portPath, options) => ipcRenderer.invoke('open-connection-and-read-data', portPath, options),
  onPortData: (func) => ipcRenderer.on('port-data-available', (_, data) => func(data)),
});
