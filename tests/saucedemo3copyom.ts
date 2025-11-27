import{test, expect} from '@playwright/test'
import { assert } from 'console';
import { LoginPage } from './page-objects/LoginPage';

test('POM', async ({page})=>{

await page.goto(process.env.URL='dev')

const loginPage = new LoginPage(page)
//utilizando metodos
/* await loginPage.fillUsername('standard_user')
await loginPage.fillPassword('secret_sauce')
await loginPage.clickOnLogin() */

//utilizando metodo compelto de login
await loginPage.loginWithCredentials('standard_user','secret_sauce')
await loginPage.checkSuccesfulLogin()


//Variable para obtener todos los valores del contenedor
const itemsContainer = await page.locator('#inventory_container .inventory_item').all()

//Variable para obtener un item random del contenedor
const randomeIndex = Math.floor(Math.random() * itemsContainer.length)

//Variable para obtener la información del item random del contenedor
const randomItem = itemsContainer[randomeIndex]

//Variables para obtener el nombre, descripción y precio del item random
const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
const expectedName = await randomItem.locator('.inventory_item_name').innerText()
const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

console.log(`Price: ${expectedPrice} Name: ${expectedName} Description: ${expectedDescription}`)

//Interactuar con el boton de "Add to cart" del item random, por eso no lleva page, ya que es especifico de la variable
await randomItem.getByRole('button', {name:'Add to cart'}).click()

await page.locator('a.shopping_cart_link').click()

//await page.pause()

//esperar que este visible el boton de checkout
expect(page.getByRole('button', {name:'Checkout'})).toBeVisible()

//Variables para obtener nombre, descripción y precio del item en el carrito
const actualName = await page.locator('.inventory_item_name').innerText()
const actualDescription = await page.locator('.inventory_item_desc').innerText()
const actualPrice = await page.locator('.inventory_item_price').innerText()

//Comparar información del item en el carrito con el que se haya seleccionado random 
expect(actualName).toEqual(expectedName)
expect(actualDescription).toEqual(expectedDescription)
expect(actualPrice).toEqual(expectedPrice)

await page.getByRole('button',{name:'Checkout'}).click()


//esperar que este visible el boton de continuar
expect(page.getByRole('button', {name:'Continue'})).toBeVisible()

//Llenar campos de información
await page.getByRole('textbox', {name: 'First Name'}).fill('Goku')
await page.getByRole('textbox', {name: 'Last Name'}).fill('Sayayin')
await page.getByRole('textbox', {name: 'Zip/Postal Code'}).fill('12345')

//Clic en continuar
await page.getByRole('button', {name: 'Continue'}).click()

//Validar elementos de confirmación
const overviewName = await page.locator('.inventory_item_name').innerText()
const overviewDescription = await page.locator('.inventory_item_desc').innerText()
const overviewPrice = await page.locator('.inventory_item_price').innerText()

expect(overviewName).toEqual(actualName)
expect(overviewDescription).toEqual(actualDescription)
expect(overviewPrice).toEqual(actualPrice)



await page.getByRole('button', {name: 'Finish'}).click()


await expect (page.getByRole('heading', {name: 'Thank you for your order!'})).toBeVisible()

//await page.pause()

});





test('Navegate', async ({page})=>{

await page.goto(process.env.URL='dev')
await page.pause()
});