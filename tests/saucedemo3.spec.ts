import{test, expect} from '@playwright/test'
import { assert } from 'console';

test('Compra', async ({page}, testInfo)=>{

await page.goto('https://www.saucedemo.com')

await page.getByRole('textbox', {name:'Username'}).fill('standard_user')
// await page.screenshot({path: 'Screenshots/login_username.png'})

await testInfo.attach('login',{
    body: await page.screenshot(),
    contentType: 'image/png'
})

await page.getByRole('textbox', {name:'Password'}).fill('secret_sauce')
await page.getByRole('button', {name:'Login'}).click()

//Tomar screenshot, y colocar path donde se guardada, toma la parte visible del anvegador nada mas
//await page.screenshot({path:'Screenshots/login.png' })

//Tomar screenshot, y colocar path donde se guardada, toma la captura de toda la pagina
//await page.screenshot({path:'Screenshots/login.png', fullPage: true })

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

