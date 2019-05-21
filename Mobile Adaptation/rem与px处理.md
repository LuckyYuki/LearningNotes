# rem与px处理

```javascript
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta name="format-detection" content="telephone=no" />
  <meta name="keywords" content="">
  <meta name="description" content="">
  <link rel="shortcut icon" href="">
  <title>模板</title>
</head>
<body>
  <div id="app"></div>
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
  <!-- built files will be auto injected -->
</body>
</html>
```
