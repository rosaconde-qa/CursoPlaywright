import { expect, Locator, Page } from "@playwright/test"

export class LoginPage{

    private readonly usernameTextbox: Locator
    private readonly passwordTextbox: Locator
    private readonly loginButton: Locator
    private readonly shoppingCartIcon: Locator

    //Constructor, primer funcion cuando se crea objeto
    constructor(page: Page){ 
        this.usernameTextbox = page.getByRole('textbox', {name:'Username'})
        this.passwordTextbox =  page.getByRole('textbox', {name:'Password'})
        this.loginButton = page.getByRole('button', {name:'Login'})
        this.shoppingCartIcon = page.locator('.shopping_cart_link')
    }

async fillUsername(username:string){
    //hardcodeado el usruaio
   //await this.usernameTextbox.fill('standard_user')
    await this.usernameTextbox.fill(username)
}

async fillPassword(password:string){
    //hardcodeado la contraseña
 // await  this.passwordTextbox.fill('secret_sauce')
    await  this.passwordTextbox.fill(password)
}

async clickOnLogin(){
   await this.loginButton.click()
}


//tarea de negocio, hacer login

async loginWithCredentials(username:string, password:string){
    await this.fillUsername(username)
    await this.fillPassword(password)
    await this.clickOnLogin()
}

//Asericiones/validaciones
async checkSuccesfulLogin(){
    await expect (this.shoppingCartIcon).toBeVisible()
}

}