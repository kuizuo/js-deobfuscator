## JS代码混淆还原

让混淆不再成为逆向分析中的绊脚石

## 使用

### 本地测试

安装

```
git clone https://github.com/kuizuo/js-de-obfuscator
cd js-de-obfuscator
pnpm i
```

在 play 目录下存放了一些我个人遇到混淆代码实例分析，每个子目录的结构如:

```
├── xxx                           # 子目录
│   ├── index.js                  # 运行代码
│   ├── code.js                   # 需要反混淆代码
│   ├── code_1.js                 # 记录反混淆过程代码 1
│   ├── code_2.js                 # 记录反混淆过程代码 2
│   ├── pretty.js                 # 可选, 用作美化对比
│   ├── output.js                 # 最终处理完成的结果
```

node index.js 即可反混淆代码

### 网页测试

TODO


## 说明

关于js代码混淆与还原介绍可看我曾经写过的两篇 blog：
[JS代码之混淆](https://kuizuo.cn/blog/js-code-obfuscator) 
[JS代码之还原](https://kuizuo.cn/blog/js-code-deobfuscator) 
