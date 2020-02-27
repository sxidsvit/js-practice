//  ----------------- исходные данные для карточек -------------

const fruits = [
  { id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348' },
  { id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg' },
  { id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg' },
]

//  -----------------  загрузка DOMContent ------------------

document.addEventListener('DOMContentLoaded', () => {

  //  -----------------  загрузка карточек ------------------

  function renderCards(cards = []) {
    if (cards.length === 0) {
      return document.createElement('div')
    }

    const wrapCards = document.createElement('div')
    wrapCards.classList.add('row')
    const htmlCardsArray = cards.map(function (card, index) {
      const html =
        `
      <div class="col-4">
        <div class="card animated zoomInDown delay-${index}s">
          <img class="card-img-top" style="height: 300px;" src="${card.img}">
          <div class="card-body">
            <h5 class="card-title">${card.title}</h5>
            <a href="#" class="btn btn-primary" data-product-id=${card.id}>Посмотреть цену</a>
            <a href="#" class="btn btn-danger" data-product-delete=${card.id}>Удалить</a>
          </div>
        </div>
      </div>
    `
      return html
    }).join('')

    wrapCards.insertAdjacentHTML('afterbegin', htmlCardsArray)

    const container = document.getElementsByClassName('container')[0]
    container.insertAdjacentHTML('beforeend', wrapCards.outerHTML)
  }

  renderCards(fruits)


  //  -----------------  отображение цены в модалке ------------------

  const allCards = document.querySelectorAll('.card')

  allCards.forEach((card) => {
    const btn = card.querySelector('[data-product-id]')
    btn.addEventListener('click', showPrice)
  })

  function showPrice(event) {
    event.preventDefault();
    const productId = +event.target.dataset.productId
    const fruit = fruits.filter(fruit => fruit.id === productId)[0]

    const modal = $.modal({
      title: `${fruit.title}`,
      animationClass: 'animated tada delay-1s mt-10',
      closable: true,
      content: `
        <p>Цена: ${fruit.price}.</p>
      `,
      width: '400px',
      footerButtons: [
        {
          text: 'Закрыть', type: 'primary', handler() {
            modal.destroy()
          }
        }
      ]
    })

    modal.open()

  }

  //  -----------------  удаление карточки через модалку ------------------

  allCards.forEach((card) => {
    const btn = card.querySelector('[data-product-delete]')
    btn.addEventListener('click', deleteCard)
  })

  function deleteCard(event) {
    event.preventDefault();
    const target = event.target
    const productId = +event.target.dataset.productDelete
    const fruit = fruits.filter(fruit => fruit.id === productId)[0]

    const modal = $.modal({
      title: `${fruit.title}`,
      animationClass: 'animated heartBeat delay-1s',
      closable: true,
      content: `
    <p>Удалить карточку?</p>
  `,
      width: '400px',
      footerButtons: [
        {
          text: 'Удалить',
          type: 'primary',
          handler() {
            modalConfirm = $.confirm({
              title: 'Внимание!!!',
              content: `Вы действительно хотите удалить карточку <strong>"${fruit.title}"</strong>?`
            }).then(() => {
              const col = target.closest('.col-4')
              col ? col.remove() : console.log('Карточка в DOM не найден...')
              console.log('Primary btn clicked')
            }).then(() => modal.destroy())
              .catch(() => {
                console.log('Отмена удаления карточки')
              })
          }
        },
        {
          text: 'Оставить', type: 'danger', handler() {
            console.log('Danger btn clicked')
            modal.destroy()
          }
        }
      ]
    })

    modal.open()

  }


}) // end DOMContentLoaded

/*
* 1. Динамически на основе массива вывести список карточек +
* 2. Показать цену в модалке (и это должна быть 1 модалка) +
* 3. Модалка для удаления с 2мя кнопками +
* ---------
* 4. На основе $.modal нужно сделать другой плагин $.confirm (Promise)
* */
