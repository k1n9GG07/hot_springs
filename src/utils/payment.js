/**
 * Генерация токена для запросов к Т-Банк (Tinkoff API)
 * 
 * Алгоритм:
 * 1. Собрать все параметры запроса кроме Token и Receipt
 * 2. Отсортировать по ключу алфавитно
 * 3. Склеить значения в строку
 * 4. Добавить SecretKey в строку
 * 5. SHA-256 хэш от полученной строки
 */

export async function generateToken(params, secretKey) {
  // 1. Копируем параметры и исключаем Token и Receipt
  const filteredParams = { ...params };
  delete filteredParams.Token;
  delete filteredParams.Receipt;
  delete filteredParams.DATA; // DATA также обычно исключается из расчета токена в Tinkoff API

  // 2. Сортируем ключи в алфавитном порядке
  const sortedKeys = Object.keys(filteredParams).sort();

  // 3. Склеиваем значения в строку
  let valuesString = '';
  for (const key of sortedKeys) {
    const value = filteredParams[key];
    // В расчете участвуют только простые значения (не объекты и не массивы)
    if (typeof value !== 'object' && value !== undefined && value !== null) {
      valuesString += value.toString();
    }
  }

  // 4. Добавляем SecretKey
  const finalString = valuesString + secretKey;

  // 5. SHA-256 хэш (используем Web Crypto API для отсутствия внешних зависимостей)
  const encoder = new TextEncoder();
  const data = encoder.encode(finalString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  
  // Конвертируем buffer в hex строку
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}
