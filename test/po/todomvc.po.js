const TodomvcPO = (page) => ({
    selectors: {
        newTodoInput: '.new-todo',
        todoItems: '.todo-list .view',
    },

    async addTodo(label) {
        await page.click(this.selectors.newTodoInput)
        await page.keyboard.type(label)
        await page.keyboard.up('\n')
    },

    async visibleTodosCount() {
        return page.$$eval(this.selectors.newTodoInput, todoItems => todoItems.length)
    },

    async todoWithLabelIsDisplayed(phrase) {
        return page.$$eval(this.selectors.todoItems, 
          (items, phrase) => Array.from(items).find(node => node.innerText.includes(phrase)), phrase)
    }
})

module.exports = {
    TodomvcPO
}