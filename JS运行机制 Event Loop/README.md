# JS 运行机制

- setTimeout 与 setInterval 都是异步的，js是单线程的，所有的操作都在这个主线程上操作，Thread pool 里是我们无法控制的子线程，这里所有的子线程会生成各种事件到事件队列里，主线程依次取出执行。setInterval、setTimeout 都是每隔固定时间执行，但是当堵塞的时候，setInterval一直算时间，而setTimeout 则在堵塞完毕之后，再间隔固定的时间后 再执行。
