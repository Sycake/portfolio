# Portfolio 圖片資料夾

把作品集圖片放在這個資料夾。

## 命名格式

使用小寫、兩位數編號，格式為：

```
portfolio-01.jpg
portfolio-02.jpg
portfolio-03.jpg
...
portfolio-12.jpg
```

- 編號要補零到兩位數（`01`、`02`…`12`），這樣排序才正確。
- 建議尺寸比例為 **16:9**（橫向），例如 1920 × 1080。
- 支援 `.jpg`、`.jpeg`、`.png`、`.webp`。若不是 `.jpg`，請一併修改
  `components/portfolio.tsx` 裡的副檔名。
- 網站會依照編號自動載入。找不到對應檔案時，會顯示佔位文字。

## 要增加或減少作品數量

在 `components/portfolio.tsx` 修改 `PORTFOLIO` 的數量（目前為 12）。
