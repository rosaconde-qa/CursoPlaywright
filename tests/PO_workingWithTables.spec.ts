import{test, expect} from '@playwright/test';
import { assert } from 'console';
import { CountryTables } from './page-objects/CountryTables';

test('Tabla', async ({page}) => {
/*
    await page.goto('https://cosmocode.io/automation-practice-webtable/')
    const countryTable = new CountryTables(page)

    const tableContainer = await page.locator("xpath=//table[@id='countries']")

    await countryTable.readAllCountries()
   // const rows = await tableContainer.locator("xpath=.//tr").all() //se convierte en un arreglo

   // const countries: Country[] = []
/*
    console.log(rows.length)

    for(let row of rows){
        let country: Country = {
            name: await row.locator('xpath=.//td[2]').innerText(),
            capital: await row.locator('xpath=.//td[3]').innerText(),
            currency: await row.locator('xpath=.//td[4]').innerText(),
            primaryLaguaje: await row.locator('xpath=.//td[5]').innerText()
        }

        countries.push(country) //añade pais que lee 

    }

  /*  for(let country of countries){
        console.log(country)
    }*/

   // const countyWherePeopleSpeakPortuguese = countries.filter(country => country.primaryLaguaje === 'Portuguese')
  //  console.log('countyWherePeopleSpeakPortuguese', countyWherePeopleSpeakPortuguese)

   /* const row1 = rows.at(1)
    const countryName = await row1?.locator('xpath=.//td[2]').innerText()
    const countryCapital = await row1?.locator('xpath=.//td[3]').innerText()
    const countryCurrency = await row1?.locator('xpath=.//td[4]').innerText()
    console.log(countryName, countryCapital, countryCurrency)*/
})
/*
//Formato para el console log
interface Country{
    name: string
    capital: string
    currency: string
    primaryLaguaje: string
}

/*
elemento container: //table[@id='countries']
.//tr -> filas
.//td -> columna


//table[@id='countries']//tr[2]//td[1] -> Check
//table[@id='countries']//tr[2]//td[2] -> Country
//table[@id='countries']//tr[2]//td[3] -> Capital
//table[@id='countries']//tr[2]//td[4] -> Currency
//table[@id='countries']//tr[2]//td[5] -> Primary Language
*/