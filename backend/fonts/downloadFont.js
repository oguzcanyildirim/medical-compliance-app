const https = require('https');
const fs = require('fs');
const path = require('path');

const fonts = [
  {
    name: 'NotoSans-Regular.ttf',
    url: 'https://github.com/openmaptiles/fonts/blob/master/noto-sans/NotoSans-Regular.ttf'
  },
  {
    name: 'NotoSansSC-VF.ttf',
    url: 'https://github.com/googlefonts/noto-cjk/raw/main/Sans/Variable/TTF/Subset/NotoSansSC-VF.ttf'
  }
];

fonts.forEach(({ name, url }) => {
  const dest = path.join(__dirname, name);
  if (fs.existsSync(dest)) {
    console.log(`✅ ${name} zaten mevcut.`);
    return;
  }

  console.log(`📥 ${name} indiriliyor...`);
  const file = fs.createWriteStream(dest);
  https.get(url, (res) => {
    if (res.statusCode !== 200) {
      console.error(`⛔ ${name} indirilemedi: HTTP ${res.statusCode}`);
      return;
    }

    res.pipe(file);
    file.on('finish', () => {
      file.close(() => console.log(`✅ ${name} indirildi.`));
    });
  }).on('error', (err) => {
    fs.unlinkSync(dest);
    console.error(`⛔ ${name} indirme hatası:`, err.message);
  });
});
