# Chrome 调试相关

## 有哪些内存问题？

- 内存泄露

> 页面的性能随着时间的延长越来越差，这可能是内存泄漏的症状。内存泄漏是指，页面中的错误导致页面随着时间的延长使用的内存越来越多。

- 内存膨胀

> 页面的性能一直很糟糕，这可能是内存膨胀的症状。内存膨胀是指，页面为达到最佳速度而使用的内存比本应使用的内存多。

- 频繁垃圾回收

> 页面出现延迟或者经常暂停，这可能是频繁垃圾回收的症状。垃圾回收是指浏览器收回内存，浏览器决定何时进行垃圾回收。回收期间，所有脚本执行都将暂停。因此，如果浏览器经常进行垃圾回收，脚本执行就会被频繁暂停。

## 如何查找内存问题？

- 使用Chrome任务管理器实时监视内存使用。

> 任务管理器是一个实时监视器，可以告诉您页面当前正在使用的内存量。打开chrome->右上角选择更多工具->任务管理器->内存占用空间，查看内存是否在增长？右键点击任务管理器的表格标题并启用JavaScript memory，会发现表格多了一列。

>Memory列表示原生内存，DOM节点存储在原生内存中。如果此值正在增大，则说明正在创建DOM节点。

>JavaScript Memory列表示JS堆。实时数字表示您的页面上的可到达对象正在使用的内存量。如果此数字在增大，要么是正在创建新对象，要么是现有对象正在增长。
