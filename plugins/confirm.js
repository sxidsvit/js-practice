$.confirm = function (options) {
  return new Promise((resolve, reject) => {
    const modal = $.modal({
      width: '400px',
      closable: false,
      title: options.title,
      content: options.content,
      onClose() {
        modal.destroy()
      },
      footerButtons: [
        {
          text: 'Отмена',
          type: 'primary',
          handler() {
            modal.close()
            reject()
          }
        },
        {
          text: 'Удалить',
          type: 'danger',
          handler() {
            modal.close()
            resolve()
          }
        }
      ]
    })
    setTimeout(() => modal.open(), 100)
  })
}