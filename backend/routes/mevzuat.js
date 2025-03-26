const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

// POST /api/mevzuat-ekle
router.post("/mevzuat-ekle", (req, res) => {
    const { mevzuatAdi, rules } = req.body;

    if (!mevzuatAdi || !rules || !Array.isArray(rules)) {
        return res.status(400).json({ error: "Geçersiz veri formatı" });
    }

    const filePath = path.join(__dirname, "../data/mevzuatlar", `${mevzuatAdi}.json`);

    const content = JSON.stringify({ rules }, null, 2);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Dosya yazma hatası:", err);
            return res.status(500).json({ error: "Dosya kaydedilemedi" });
        }

        res.json({ success: true, message: "Mevzuat başarıyla kaydedildi." });
    });
});

// GET /api/mevzuatlar
router.get("/mevzuatlar", (req, res) => {
    const dirPath = path.join(__dirname, "../data/mevzuatlar");

    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error("Klasör okunamadı:", err);
            return res.status(500).json({ error: "Mevzuatlar listelenemedi" });
        }

        // .json uzantısını kaldırarak sade ad listesi döndür
        const mevzuatListesi = files
            .filter(file => file.endsWith(".json"))
            .map(file => path.parse(file).name);

        res.json(mevzuatListesi);
    });
});

// GET /api/mevzuatlar/:id
router.get('/mevzuatlar/:id', (req, res) => {
  const mevzuatId = req.params.id;
  const filePath = path.join(__dirname, `../data/mevzuatlar/${mevzuatId}.json`);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Mevzuat bulunamadı' });
  }

  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  res.json(jsonData);
});

module.exports = router;