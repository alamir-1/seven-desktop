const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('path');

const SITE_URL = 'https://alamir-1.github.io/SEVEN-27-3/';

function createWindow() {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    backgroundColor: '#111118',
    title: 'SEVEN',
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // إخفاء القائمة الافتراضية (File/Edit/View...) عشان الشكل يبقى نضيف
  Menu.setApplicationMenu(null);

  win.loadURL(`${SITE_URL}?_t=${Date.now()}`);

  // أي رابط خارجي يتفتح في متصفح الجهاز بدل ما يفتح جوه التطبيق
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // دعم تحميل الملفات (إكسل، PDF، صور) وحفظها في مجلد التنزيلات مباشرة
  win.webContents.session.on('will-download', (event, item) => {
    const fileName = item.getFilename();
    item.setSavePath(path.join(app.getPath('downloads'), fileName));
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
