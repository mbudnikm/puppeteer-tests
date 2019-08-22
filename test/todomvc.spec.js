const puppeteer = require('puppeteer')
const chalk = require('chalk')
const assert = require('assert')
const { TodomvcPO } = require('./po/todomvc.po.js')

const { sleep } = require('./utils')
const URL = 'http://todomvc.com/examples/jquery/'

describe('todomvc application', () => {
  let browser, page, po

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
      // slowMo: 50,
    })
  }, 100000);

  beforeEach(async () => {
    page = await browser.newPage()
    po = TodomvcPO(page)
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
      // addTodo
      // await page.click('.new-todo')
      // await page.keyboard.type('kup czekoladę <3')
      // await page.keyboard.up('\n')
      let phrase = "kup czekoladę <3..."
      await po.addTodo(phrase)

      //assert
      // visibleTodosCoun
      // let items
      // items = await page.$$eval('.todo-list .view', todoItems => todoItems.length)
      let items = await po.visibleTodosCount()
      expect(items).toEqual(1)

      // todoWithLabelIsDisplayed
      // await page.$$eval('.todo-list .view', 
      //    (items, phrase) => Array.from(items).find(node => node.innerText.includes(phrase)), phrase)
      let includes = await po.todoWithLabelIsDisplayed(phrase)
      expect(includes).toBeTruthy()
    }, 50000);
  }
});