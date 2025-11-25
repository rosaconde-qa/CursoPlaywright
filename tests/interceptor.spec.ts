import{test, expect} from '@playwright/test'
import { assert } from 'console';
import { LoginPage } from './page-objects/LoginPage';

test('Interceptor imagenes', async ({page})=>{

    //Iniciar inspector, capturar request que se hacen
    await page.on('request', req => {
        console.log(req.url())

        //No cargar imagen si es suna
    /*    page.route(
            "https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b09a7d77409d63.jpg",
           (route) => route.abort()
        );

         page.route(
            "https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5f0a35ed5931e.jpg",
           (route) => route.abort()
        );
*/
        //Expresion regular, sin ninguna imagen
           page.route(
            "**/*.{png,jpg,jpeg,svg}",
           (route) => route.abort()
        );

    })

    await page.goto('https://www.saucedemo.com')
    const loginPage = new LoginPage(page)
    await loginPage.loginWithCredentials('standard_user','secret_sauce')
    await loginPage.checkSuccesfulLogin()

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all()


    await page.screenshot({path: 'Screenshots/login_inspector.png', fullPage: true})

});


test('Interceptor modificar servicios', async ({page})=>{
await page.route(
            "https://demoqa.com/BookStore/v1/Books",
           (route) => {
            route.fulfill({
                status: 304,
                headers: {
                    'Content-Type':'application/json'
                },
                body:` 
                {
                    "books": [
                                {
                                     "isbn": "9781449325862",
                                     "title": "El libro modificado git",
                                     "subTitle": "A Working Introduction",
                                     "author": "Richard E. Silverman",
                                     "publish_date": "2020-06-04T08:48:39.000Z",
                                     "publisher": "O'Reilly Media",
                                     "pages": 500,
                                    "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
                                    "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
                                }
                             ]
                } `
            })
           }
        );

    await page.goto('https://demoqa.com/books')
    await page.pause()
    await page.screenshot({path: 'Screenshots/Request_modificado.png', fullPage: true})

});