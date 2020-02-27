/*
//  Способы создания пользовательских событий (хуков)
*/

// ----------- с помощью конструктора------

const onOpen = new Event('onOpen')

document.addEventListener('onOpen', (e) => {
  console.log('onOpen.target: ', e.target);
  modal.open()
})

document.dispatchEvent(onOpen)


// ----------- старый синтакссис--------
const event = document.createEvent('Event')
console.log('event: ', event);

event.initEvent('onClose', true, true)

document.addEventListener('onClose', (e) => {
  console.log('e.target: ', e.target);
})

document.dispatchEvent(event)
