# Some

```javascript
<script>
    (function (doc, win) {
      var user_webset_font = getComputedStyle(doc.documentElement, false)['fontSize']
      var rate = parseFloat(user_webset_font) / 16
      var recalc = function () {
        var docEl = doc.documentElement
        var clientWidth = docEl.clientWidth
        if (!clientWidth) return
        var fontSize = (100 * (clientWidth / 375)) / rate
        if (fontSize > 200)
          fontSize = 200
        fontSize += 'px'
        docEl.style.fontSize = fontSize
      }
      if (!doc.addEventListener) return
      var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
      win.addEventListener(resizeEvt, recalc, false)
      doc.addEventListener('DOMContentLoaded', recalc, false)
    })(document, window)

  </script>
```
