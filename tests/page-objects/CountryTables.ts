import { expect, Locator, Page } from "@playwright/test"

export class CountryTables{

    private readonly tableContainer: Locator
    private readonly rows: Locator
    private readonly row: Locator

    //Constructor, primer funcion cuando se crea objeto
    constructor(page: Page){ 
        this.tableContainer = page.locator("xpath=//table[@id='countries']")
        this.rows = this.tableContainer.locator("xpath=.//tr")
        this.row = this.rows.locator('xpath=.//td[2]')
       
    }

    
    async readAllCountries(){
        this.rows.all()
    }


}




