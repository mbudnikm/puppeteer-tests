const puppeteer = require('puppeteer')

const { sleep } = require('../test/utils')

const URL = 'http://todomvc.com/examples/jquery/';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  })

  const page = await browser.newPage()
  await page.goto(URL, { waitUntil: 'networkidle2' })

  // when it would be dynamic
  await page.waitForSelector('.new-todo') // waitForSelector - some interval

  for (let i=0; i < 3; i++) {
    await page.click('.new-todo')
    await page.keyboard.type(`kup czekoladę <3 ${i + 1}`)
    await page.keyboard.up('\n')
  }

  const idx = 0

  page.evaluate((idx) => {
    document.querySelectorAll('input.toggle')[idx].click()
  }, idx)

  await sleep(3000)

  await browser.close()
})()