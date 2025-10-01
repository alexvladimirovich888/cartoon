// Генератор фавикона в стиле ностальгии 2000-х
function generateFavicon() {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');

    // Фон
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, 32, 32);

    // Градиент для виниловой пластинки
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 12);
    gradient.addColorStop(0, '#ff0000');
    gradient.addColorStop(1, '#ff6600');

    // Виниловая пластинка
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(16, 16, 12, 0, 2 * Math.PI);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Центр пластинки
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.arc(16, 16, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Маленький центр
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(16, 16, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Музыкальные ноты
    ctx.fillStyle = '#ffff00';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.5;

    // Нота 1
    ctx.beginPath();
    ctx.ellipse(8, 8, 1.5, 1, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(9, 6, 0.8, 6);

    // Нота 2
    ctx.beginPath();
    ctx.ellipse(24, 10, 1.5, 1, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(25, 8, 0.8, 8);

    // Нота 3
    ctx.beginPath();
    ctx.ellipse(6, 24, 1.5, 1, 0, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
    ctx.fillRect(7, 22, 0.8, 6);

    // Волновые линии
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(4, 20);
    ctx.quadraticCurveTo(8, 18, 12, 20);
    ctx.quadraticCurveTo(16, 22, 20, 20);
    ctx.quadraticCurveTo(24, 18, 28, 20);
    ctx.stroke();

    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(4, 22);
    ctx.quadraticCurveTo(8, 20, 12, 22);
    ctx.quadraticCurveTo(16, 24, 20, 22);
    ctx.quadraticCurveTo(24, 20, 28, 22);
    ctx.stroke();

    // Эффект глитча
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(6, 4, 20, 1);
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(8, 26, 16, 1);

    // Угловые акценты
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(4, 4, 1, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#00ffff';
    ctx.beginPath();
    ctx.arc(28, 4, 1, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#ff00ff';
    ctx.beginPath();
    ctx.arc(4, 28, 1, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(28, 28, 1, 0, 2 * Math.PI);
    ctx.fill();

    return canvas.toDataURL('image/png');
}

// Экспорт для использования
if (typeof module !== 'undefined' && module.exports) {
    module.exports = generateFavicon;
} 