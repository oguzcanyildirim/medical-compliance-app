const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const PDFDocument = require("pdfkit");

router.post("/denklik-hesapla", (req, res) => {
    const { selectedMevzuat, answers, firmaAdi } = req.body;

    const mevzuatPath = path.join(__dirname, `../data/mevzuatlar/${selectedMevzuat}.json`);
    if (!fs.existsSync(mevzuatPath)) {
        return res.status(400).json({ error: "Mevzuat bulunamadı" });
    }

    const mevzuat = JSON.parse(fs.readFileSync(mevzuatPath, "utf-8"));

    let matchedCount = 0;
    const requiredRules = mevzuat.rules.filter(r => r.required);
    requiredRules.forEach(rule => {
        if (answers[rule.question]) matchedCount++;
    });

    const score = Math.round((matchedCount / requiredRules.length) * 100);

    const doc = new PDFDocument({ margin: 50 });
    const fontLatin = path.join(__dirname, '../fonts/NotoSans-Regular.ttf');
    const fontChinese = path.join(__dirname, '../fonts/NotoSansSC-Regular.ttf');

    doc.registerFont('Latin', fontLatin);
    doc.registerFont('Chinese', fontChinese);

    res.setHeader("Content-disposition", "inline; filename=denklik_raporu.pdf");
    res.setHeader("Content-type", "application/pdf");
    doc.pipe(res);

    // Başlık Kutusu
    doc.rect(50, 50, 500, 30)
        .fillOpacity(0.05)
        .fill('#000')
        .fillOpacity(1)
        .stroke();

    doc.font('Latin')
        .fillColor('#000')
        .fontSize(16)
        .text('Denklik Analiz Raporu', 55, 57);

    // Başlık altı boşluk
    doc.moveDown(2);

    // Firma Bilgileri
    doc.font('Latin').fontSize(12).fillColor('#000');
    doc.text('Firma:', { continued: true, underline: false });
    doc.font('Chinese').text(` ${firmaAdi}`);
    doc.font('Latin').text('Mevzuat:', { continued: true });
    doc.text(` ${selectedMevzuat}`);
    doc.text('Denklik Oranı:', { continued: true });
    doc.text(` %${score}`);

    doc.moveDown(1);

    // İnce ayraç çizgisi
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#999').lineWidth(0.5).stroke();

    doc.moveDown(1.5);

    // Ürün Özellikleri Başlığı
    doc.font('Latin').fontSize(13).fillColor('#000').text("Ürün Özellikleri", { underline: true });

    doc.moveDown(0.5);

    // Cevapları çerçeve içine al
    const startY = doc.y;
    mevzuat.rules.forEach(rule => {
        const cevap = answers[rule.question] ? "Evet" : "Hayır";
        const text = `${rule.question}: ${cevap}`;
        const usesChinese = /[\u4e00-\u9fff]/.test(rule.question);
        doc.font(usesChinese ? 'Chinese' : 'Latin').fontSize(12).text(text);
    });
    const endY = doc.y;

    // Kenar çerçeve (kutulu görünüm)
    doc.rect(45, startY - 5, 510, endY - startY + 10)
        .strokeColor('#ccc')
        .lineWidth(0.5)
        .stroke();

    // Alt bilgi alanı
    doc.moveDown(2);

    // İnce ayraç çizgisi
    doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#ccc').lineWidth(0.5).stroke();

    doc.moveDown(1);

    // Hazırlayan
    doc.font('Latin').fontSize(10).fillColor('#444')
        .text('Hazırlayan: XYZ Tercüme ve Danışmanlık Ltd. Şti.');

    // Tarih (güncel tarih otomatik)
    const today = new Date().toLocaleDateString('tr-TR');
    doc.text(`Tarih: ${today}`);

    // Not
    doc.moveDown(0.5);
    doc.fontSize(9).fillColor('#777')
        .text('Not: Bu rapor bilgilendirme amacıyla hazırlanmıştır. Resmi geçerliliği yoktur.');


    doc.end();
});
module.exports = router;
