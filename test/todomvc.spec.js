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

  it('should display a todo after it was added', async () => {

    let phrase = "kup czekoladę <3..."
    await po.addTodo(phrase)

    //assert
    let items = await po.visibleTodosCount()
    expect(items).toEqual(1)

    // todoWithLabelIsDisplayed
    let includes = await po.todoWithLabelIsDisplayed(phrase)
    expect(includes).toBeTruthy()
    }, 50000);

    it('should display filetered todos', async () => {
       // act
    const todos = [
      'pozmywać naczynia',
      'wyrzuć śmieci', // [X]
      'odkurzyć',
      'zrobić pranie', // [X]
      'i coś tam jeszcze'
    ]
    for (let todo of todos){
      await po.addTodo(todo)
    }

    // assert
    let items

    await po.setTodoCompleted(1)

    await po.setTodoCompleted(3)

    await po.setFilter('all')
    items = await po.visibleTodosCount()
    expect(items).toEqual(5)

    await po.setFilter('active')
    items = await po.visibleTodosCount()
    expect(items).toEqual(3)

    await po.setFilter('completed')
    items = await po.visibleTodosCount()
    expect(items).toEqual(2)
    
  }, 100000)
});