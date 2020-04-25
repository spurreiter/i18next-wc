;(function () {
  function docHeight () {
    var body = document.body, html = document.documentElement
    return Math.max(body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight)
  }

  function handleMsg () {
    requestAnimationFrame(() => {
      const height = '' + docHeight()
      parent.postMessage(height, location.origin)
    })
  }

  window.addEventListener('load', handleMsg, false)
  new MutationObserver(handleMsg).observe(document.body, {subTree: true, childList: true})
})()
