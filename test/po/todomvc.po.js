const TodomvcPO = (page) => ({
    async addTodo(label) {
        await page.click('.new-todo')
        await page.keyboard.type(label)
        await page.keyboard.up('\n')
    }
})