<template>
  <div class="container mx-auto w-2/3 px-4">
    <div class="border-2 border-solid p-4 text-left">
      关于混淆与还原介绍：
      <p class="flex gap-2">
        <a class="text-blue-400" target="_blank" href="https://kuizuo.cn/js/JS代码之混淆">JS代码之混淆</a>
        <a class="text-blue-400" target="_blank" href="https://kuizuo.cn/js/JS代码之还原">JS代码之还原</a>
      </p>

      <p>使用说明: 复制粘贴js代码，根据配置项，点击还原即可。</p>

      <div class="border-1 my-1"></div>

      <p>常见问题:</p>
      <h4 class="font-bold my-2">Q：为什么我的代码还原不了</h4>

      <p>
        A：没有绝对还原的程序，也绝对还原不出最原始代码，因此还原只是相对混淆而言，我只是把我所遇到的混淆的还原合并成一个通用的还原程序。如果还原后和还原前的代码没区别，那么多半这个混淆用了本还原程序通用还原之外的混淆手段
      </p>
      <h4 class="font-bold my-2">Q：为什么还原后的代码无法正常运行</h4>
      <p>
        A：这种情况多半是原有的代码对部分片段进行了检测，例如原本代码是压缩过的长度为12，但是格式化后长度变为18，那么就可能导致程序进入到另一流程执行，导致堆栈崩溃。这时候可以尝试将代码压缩后再次运行就可以解决该问题，也有可能是还原导致部分节点替换错误
      </p>
    </div>
  </div>
</template>
