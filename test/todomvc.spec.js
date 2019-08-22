const puppeteer = require('puppeteer')
const chalk = require('chalk')
const assert = require('assert')

const { sleep } = require('./utils')
const URL = 'http://todomvc.com/examples/jquery/'

describe('todomvc application', () => {
  let browser, page

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
      // slowMo: 100,
    })
  }, 100000);

  beforeEach(async () => {
    page = await browser.newPage()
    await page.goto(URL, { waitUntil: 'networkidle2' })
  }, 100000)

  afterEach(async () => {
    await page.evaluate(() => {
      localStorage.removeItem('todos-jquery')
    })
    await page.close()
  });
 
  afterAll(async () => { 
    await browser.close()
  })

  for(let i=0; i < 3; i++) {
    it('should display a todo after it was added', async () => {
      // act
      await page.click('.new-todo')
      await page.keyboard.type('kup czekoladę <3')
      await page.keyboard.up('\n')

      //assert
      let items
      items = await page.$$eval('.todo-list .view', todoItems => todoItems.length)
      expect(items).toEqual(1)

      let phrase = "kup czekoladę <3"
      await page.$$eval('.todo-list .view', 
          (items, phrase) => Array.from(items).find(node => node.innerText.includes(phrase)), phrase)
      
    });
  }
});