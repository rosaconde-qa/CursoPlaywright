import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('test', async ({page}) => {

  await page.goto('https://www.mercadolibre.com.mx/') //page.goto para ir/abir una url especifica
  await page.locator('input[id="cb1-edit"]').fill('Iphone') //page.locator para identificar el elemento de la pagina -- .fill para indicar la acción de "llenar" ese elemento encontrado
  await page.keyboard.press('Enter') //page.keybooard.press para indicar que acción hacer con las opciones del teclado
  
  await expect(page.locator ('//ol[contains(@class, "ui-search-layout")]')).toBeVisible() //localizador xpath
 // await page.pause() //pausa ejecución

  const titles = await page.locator('//ol[contains(@class, "ui-search-layout ")]//li//h3').allInnerTexts() //sacar texto del elemenot y guardar en una constante

  //iterrar por cada uno de los resultados, y obtener en todos los textos
  console.log("the total number of result is: ",titles.length)
  for(let title of titles){
    console.log('the title is: ', title)
  }
});


test('test locator', async ({page}) => {

   await page.goto('https://www.mercadolibre.com.mx/')
  // await page.getByRole('link', {name: 'Mis compras', exact: true}).click()
  await page.getByRole('link', {name: 'Ingresa', exact: true}).click() //nombre exacto si se encuentran dos elementos
   await page.pause()

  //await page.getByPlaceholder('foo').click()
  //await page.getByAltText('foo').click()
  
});