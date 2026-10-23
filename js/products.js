/**
 * Лабораторна робота №3 — Варіант 1
 * Завдання 1: Масиви та функції (Товари)
 */

console.log("Товари (Каталог):");

// 1. Створення 10 записів товарів
let products = [
  { sku: "TW-101", id: 1, title: "Пальто вовняне 'Осінь'", country: "Україна", price1_old: 2800, price2_old: 2500, price3_active: 2200, stock: 15 },
  { sku: "TW-102", id: 2, title: "Кросівки 'Run Fast'", country: "В'єтнам", price1_old: 1500, price2_old: 1800, price3_active: 2100, stock: 8 },
  { sku: "TW-103", id: 3, title: "Сукня літня 'Квітка'", country: "Туреччина", price1_old: 1200, price2_old: 1100, price3_active: 950, stock: 20 },
  { sku: "TW-104", id: 4, title: "Рюкзак 'Urban'", country: "Польща", price1_old: 1000, price2_old: 1000, price3_active: 1000, stock: 5 },
  { sku: "TW-105", id: 5, title: "Куртка зимова 'Nordic'", country: "Україна", price1_old: 4500, price2_old: 4200, price3_active: 3900, stock: 12 },
  { sku: "TW-106", id: 6, title: "Футболка 'Basic White'", country: "Туреччина", price1_old: 300, price2_old: 400, price3_active: 500, stock: 50 },
  { sku: "TW-107", id: 7, title: "Джинси 'Classic Fit'", country: "Польща", price1_old: 1600, price2_old: 1500, price3_active: 1400, stock: 18 },
  { sku: "TW-108", id: 8, title: "Шарф 'Cozy'", country: "Україна", price1_old: 450, price2_old: 400, price3_active: 350, stock: 30 },
  { sku: "TW-109", id: 9, title: "Худі 'Streetwear'", country: "В'єтнам", price1_old: 1300, price2_old: 1400, price3_active: 1600, stock: 7 },
  { sku: "TW-110", id: 10, title: "Ремінь шкіряний", country: "Польща", price1_old: 700, price2_old: 650, price3_active: 600, stock: 25 }
];

// 1.1 Впорядкування за країною походження та середня вартість для цієї країни
function sortAndAverageByCountry(items, targetCountry) {
  const sorted = items.slice().sort((a, b) => a.country.localeCompare(b.country, "uk"));
  const countryItems = sorted.filter(item => item.country === targetCountry);
  const total = countryItems.reduce((acc, item) => acc + item.price3_active, 0);
  const avgPrice = countryItems.length > 0 ? (total / countryItems.length).toFixed(2) : 0;

  return { sorted, avgPrice };
}

// 1.2 Пошук товару з мінімальною «вартість2_недіюча» та вивід внутрішнього id
function findMinPrice2Id(items) {
  if (items.length === 0) return null;
  let minItem = items[0];
  for (let i = 1; i < items.length; i++) {
    if (items[i].price2_old < minItem.price2_old) {
      minItem = items[i];
    }
  }
  return { id: minItem.id, minPrice2: minItem.price2_old, title: minItem.title };
}

// 1.3 Додавання нового запису (перевірка повноти даних)
function addProduct(items, newProduct) {
  const requiredKeys = ["sku", "id", "title", "country", "price1_old", "price2_old", "price3_active", "stock"];
  const isComplete = requiredKeys.every(key => newProduct[key] !== undefined && newProduct[key] !== null && newProduct[key] !== "");

  if (isComplete) {
    items.unshift(newProduct);
    console.log("Дані повні: товар додано НА ПОЧАТОК списку.");
  } else {
    items.push(newProduct);
    console.log("Дані неповні: товар додано В КІНЕЦЬ списку.");
  }
}

// 1.4 Динаміка зміни ціни на кожен товар
function getPriceDynamics(items) {
  return items.map(item => {
    const p1 = item.price1_old;
    const p2 = item.price2_old;
    const p3 = item.price3_active;

    let status = "";
    if (p1 > p2 && p2 > p3) {
      status = "стабільно дешевшає";
    } else if (p1 < p2 && p2 < p3) {
      status = "стабільно дорожчає";
    } else {
      status = "не стабільні зміни";
    }

    return { id: item.id, title: item.title, prices: [p1, p2, p3], status: status };
  });
}

// Автоматичний запуск
const countryAnalysis = sortAndAverageByCountry(products, "Україна");
const minPrice2 = findMinPrice2Id(products);

console.log("1.1 Товари, впорядковані за країною:", countryAnalysis.sorted);
console.log(`Середня діюча вартість (Україна): ${countryAnalysis.avgPrice} грн`);

console.log(`1.2 Мінімальна вартість2_недіюча (${minPrice2.minPrice2} грн) у товару ID: ${minPrice2.id} (${minPrice2.title})`);

console.log("1.3 Перевірка додавання товарів:");
addProduct(products, { sku: "TW-111", id: 11, title: "Шкарпетки", country: "Україна", price1_old: 100, price2_old: 90, price3_active: 80, stock: 100 });
addProduct(products, { sku: "TW-112", id: 12, title: "Кепка", country: "Польща", price1_old: 300 });

console.log("1.4 Динаміка цін товарів:", getPriceDynamics(products));