/**
 * Demo page script.
 *
 * Runs as a classic script against the `miniXhr` global, which is provided
 * either by the built UMD bundle or, on the dev server, by the module shim
 * injected in `vite.config.mjs`.
 */
const buttons = document.querySelectorAll('.button')

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonTip = button.dataset.tip

    if (!buttonTip) {
      return
    }

    switch (buttonTip) {
      case 'getSuccess':
        miniXhr.get(`/${buttonTip}`)
          .then(console.log)
          .catch(console.error)
        break

      case 'getSuccessAdvance':
        miniXhr.get('/getSuccess', {
          params: {
            a: 1,
            b: 2,
          },
          headers: {
            h1: 1,
            h2: 2,
          },
        })
          .then(console.log)
          .catch(console.error)
        break

      case 'getTimeout':
        miniXhr.get('/getSuccess', {
          timeout: 500,
          ontimeoutCB: () => {
            console.log('timeout')
          },
        })
          .then(console.log)
          .catch(console.error)
        break

      case 'getFail':
        miniXhr.get(`/${buttonTip}`)
          .then(console.log)
          .catch(console.error)
        break

      case 'postSuccess':
        miniXhr.post(`/${buttonTip}`)
          .then(console.log)
          .catch(console.error)
        break

      case 'postSuccessAdvance':
        miniXhr.post('/postSuccess', {
          data: {
            a: 1,
            b: 2,
          },
          headers: {
            h1: 1,
            h2: 2,
          },
        })
          .then(console.log)
          .catch(console.error)
        break

      case 'postTimeout':
        miniXhr.post('/postSuccess', {
          timeout: 500,
          ontimeoutCB: () => {
            console.log('timeout')
          },
        })
          .then(console.log)
          .catch(console.error)
        break

      case 'postFail':
        miniXhr.post(`/${buttonTip}`)
          .then(console.log)
          .catch(console.error)
        break

      case 'jsonpSuccess':
      case 'jsonpFail':
        miniXhr.jsonp(`/${buttonTip}`, {
          params: {
            a: 1,
            b: 2,
          },
        })
          .then(console.log)
          .catch(console.error)
        break

      case 'jsonpTimeout':
        miniXhr.jsonp('/jsonpSuccess', {
          timeout: 500,
        })
          .then(console.log)
          .catch(console.error)
        break
    }
  })
})
