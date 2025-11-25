import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com/');
  await page.getByRole('link', { name: 'México' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).click();
  await page.getByRole('combobox', { name: 'Ingresa lo que quieras' }).fill('iphone');

  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByRole('link', { name: 'Apple iPhone 14 (256 Gb) -' }).click();
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
});