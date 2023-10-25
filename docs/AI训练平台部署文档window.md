## 环境准备
### 前置检查
检查操作系统版本
**window版本需要大于1903 ， 否则wsl gpu docker 启动不起来**
![image.png](https://cdn.nlark.com/yuque/0/2023/png/2744406/1697161113856-52379c1e-967e-4ae6-ab68-986746287057.png#averageHue=%23e2d5ce&clientId=u4c44e728-6055-4&from=paste&height=264&id=u84bd3bff&originHeight=528&originWidth=550&originalType=binary&ratio=2&rotation=0&showTitle=false&size=138324&status=done&style=none&taskId=ub540969e-f25b-4a5c-9b99-52a144a2a0d&title=&width=275)
#### 检查命令
打开CMD
按下 win 键，输入 cmd 后回车，打开「命令提示符」
![image.png](https://cdn.nlark.com/yuque/0/2023/png/2744406/1697597639852-037ae4d5-bed0-442d-a65c-b50dcccd0e40.png#averageHue=%23424242&clientId=u5a65fa59-db5b-4&from=paste&height=83&id=ub1f5c7a6&originHeight=127&originWidth=971&originalType=binary&ratio=2&rotation=0&showTitle=false&size=9691&status=done&style=none&taskId=u41c474a1-feaf-403b-a969-eef22ab4b37&title=&width=634.5)
#### 查看系统版本
在打开的cmd窗口中，输入 winver 后回车，即可在新弹出的窗口中查看系统版本信息
![image.png](https://cdn.nlark.com/yuque/0/2023/png/2744406/1697597614501-e99c8a69-3a2e-4413-ae5d-3afe240d7a97.png#averageHue=%238f8e8e&clientId=u5a65fa59-db5b-4&from=paste&height=331&id=uc5f4dca2&originHeight=504&originWidth=966&originalType=binary&ratio=2&rotation=0&showTitle=false&size=71963&status=done&style=none&taskId=ubff3c266-a713-4471-994e-2cb795e2b9c&title=&width=634)

### WSL2 安装
[参考](https://zhuanlan.zhihu.com/p/386590591)
WSL2.0相比WSL1.0具备完整的Linux内核、托管VM和完全的系统调用兼容性，这里使用WSL2.0 进行容器的管理
#### 启动组件安装
以管理员身份打开 powershell ，执行如下语句
```bash
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
执行完之后重启
![image.png](https://cdn.nlark.com/yuque/0/2023/png/2744406/1696407088200-39868686-91bd-42c1-998e-39ea989b534d.png#averageHue=%23032657&clientId=u46105b10-ddfc-4&from=paste&height=350&id=u0c59a0b1&originHeight=700&originWidth=840&originalType=binary&ratio=2&rotation=0&showTitle=false&size=22791&status=done&style=none&taskId=u7c69fb22-281a-4d8f-b95d-659393fe184&title=&width=420)
#### 下载 WSL2 Linux 内核
```bash
https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi
```
安装内核
#### 设置WSL默认版本
```bash
wsl --set-default-version 2
```
如果提示没有相关命令，可尝试从[https://www.catalog.update.microsoft.com/Search.aspx?q=KB4566116](https://www.catalog.update.microsoft.com/Search.aspx?q=KB4566116)下载windows系统更新包，安装后重启后重试是否成功
![image.png](https://cdn.nlark.com/yuque/0/2023/png/25386445/1696743927182-d3309d03-3d79-4351-b0b4-f09f0417b476.png#averageHue=%238ba87e&clientId=ua156f998-8cbf-4&from=paste&height=721&id=u03c58874&originHeight=721&originWidth=2555&originalType=binary&ratio=1&rotation=0&showTitle=false&size=294167&status=done&style=none&taskId=ubb336e3f-f6b2-4409-a615-4af6e76da5f&title=&width=2555)
#### 在线安装Ubuntu22.04 LTS

1. 打开Microsoft Store
![image.png](https://cdn.nlark.com/yuque/0/2023/png/2744406/1696407175668-259a56a5-e2e8-42e6-9493-cd724a65972a.png#averageHue=%23f2f2f2&clientId=u46105b10-ddfc-4&from=paste&height=319&id=uee621436&originHeight=637&originWidth=786&originalType=binary&ratio=2&rotation=0&showTitle=false&size=106285&status=done&style=none&taskId=u75b24c22-a22d-45ca-a17e-0d147b34845&title=&width=393)
2. 从软件库里面安装 ubuntu 22 ，并且启动ubuntu
#### 离线安装安装Ubuntu22.04 LTS
参考 [链接](https://learn.microsoft.com/en-us/windows/wsl/install-manual)
下载ubuntu 22.04 离线安装包
```json
curl.exe -L -o ubuntu-2204.appx https://aka.ms/wslubuntu2204
```

安装到系统里面
```json
Add-AppxPackage .\ubuntu-2204.appx
```

安装window terminal 可选 
```json
https://learn.microsoft.com/en-us/windows/terminal/install
```
#### 检查wsl 是否安装成功
执行如下语句，正常输出ubuntu 已经启动
```bash
wsl -l -v 
```
如果这一句报错，说明系统版本有问题

### gpu 驱动安装
如果机器已经安装了驱动，这一步可以省略掉
#### 官网下载驱动
从 nvidia 官网上面下载对应的显卡的驱动
[https://www.nvidia.cn/Download/index.aspx?lang=cn](https://www.nvidia.cn/Download/index.aspx?lang=cn)

![截屏2023-10-04 16.15.37.png](https://cdn.nlark.com/yuque/0/2023/png/2744406/1696407436209-6aa2d543-21c2-458f-96ab-7099643519c6.png#averageHue=%23f3f3f3&clientId=u46105b10-ddfc-4&from=drop&id=uf9a986d6&originHeight=644&originWidth=1272&originalType=binary&ratio=2&rotation=0&showTitle=false&size=93491&status=done&style=none&taskId=u9d68511d-3a54-470a-b3eb-9099a90865e&title=)
需要选择对应的显卡
#### 校验是否安装成功
执行 nvidia-smi 命令
```bash
nvidia-smi
```
会有如下输出，代表安装成功
![截屏2023-09-26 16.18.18.png](https://cdn.nlark.com/yuque/0/2023/png/2744406/1695716316517-191c8f74-0b08-42f9-885b-c3375443390f.png#averageHue=%23272424&clientId=ucf7837fe-85de-4&from=drop&id=u0f9d8cab&originHeight=475&originWidth=655&originalType=binary&ratio=2&rotation=0&showTitle=false&size=71672&status=done&style=none&taskId=ua9cb26aa-98fc-4b57-81b5-50e4329f828&title=)

### docker 安装
[参考](https://zhuanlan.zhihu.com/p/646758615)
想要完成 Docker 虚拟化环境的准备，一共分为三步：安装 Docker、配置 WSL2，开始玩。
#### 安装 Docker 应用程序
我们可以从 [Docker 官方网站[2]](https://link.zhihu.com/?target=https%3A//www.docker.com/)，获取到 Docker 应用程序安装包的下载。
![](https://cdn.nlark.com/yuque/0/2023/webp/2744406/1696407602473-6de2403f-0464-45c0-9309-223ec3c23cae.webp#averageHue=%23084691&clientId=u46105b10-ddfc-4&from=paste&id=u4f89ae03&originHeight=697&originWidth=1200&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u2a161305-b756-4f60-9af3-a07e5864269&title=)

下载完毕之后，“一路 Next” 完成安装后，点击安装程序的“重启按钮”等待程序安装完毕。
![](https://cdn.nlark.com/yuque/0/2023/webp/2744406/1696407602508-a4b344e2-e628-495f-929b-b8cdffe37cc5.webp#averageHue=%23edeeeb&clientId=u46105b10-ddfc-4&from=paste&id=u3c356efd&originHeight=851&originWidth=1200&originalType=url&ratio=2&rotation=0&showTitle=false&status=done&style=none&taskId=u632749e0-fcfa-41ec-b88d-7115b37e196&title=)
初步安装完毕，需要重启电脑
等待电脑重启完毕

![image.png](https://cdn.nlark.com/yuque/0/2023/png/25386445/1696745048463-2917d66a-e20a-4a44-b1a0-17bc4e0cc081.png#averageHue=%23f6f9f7&clientId=ud9121596-2492-4&from=paste&height=1284&id=u0847b353&originHeight=1284&originWidth=2286&originalType=binary&ratio=1&rotation=0&showTitle=false&size=610411&status=done&style=none&taskId=u2cb7ea53-3c4b-40e7-b6c4-66d49bbcded&title=&width=2286)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/25386445/1696745081057-8704c8b6-db16-49fa-8928-5cf242672dbe.png#averageHue=%23f6f9f7&clientId=ud9121596-2492-4&from=paste&height=1262&id=u7d7cd31b&originHeight=1262&originWidth=2214&originalType=binary&ratio=1&rotation=0&showTitle=false&size=688731&status=done&style=none&taskId=ub73b4e7c-715e-4fd6-b1c8-d3abcc8727d&title=&width=2214)
#### 校验是否安装成功
启动docker
## 系统部署
假设安装目录为 /opt/product
### 下载离线部署包
需要向运维要最新的部署安装包  [下载链接](https://vision-1302847974.cos.ap-shanghai.myqcloud.com/releases/ml_backend_deployment.tar.gz?q-sign-algorithm=sha1&q-ak=AKIDCqGzUiq9XjKfolFO5arv490Vw7KIpWxb&q-sign-time=1695806453;1695979253&q-key-time=1695806453;1695979253&q-header-list=&q-url-param-list=&q-signature=02eaccd45998744d2969c7ee5ce3b2aabf283b3f)
```bash
# 下载部署脚本
wget "https://vision-1302847974.cos.ap-shanghai.myqcloud.com/releases/ml_backend_deployment.tar.gz?q-sign-algorithm=sha1&q-ak=AKIDCqGzUiq9XjKfolFO5arv490Vw7KIpWxb&q-sign-time=1695806453;1695979253&q-key-time=1695806453;1695979253&q-header-list=&q-url-param-list=&q-signature=02eaccd45998744d2969c7ee5ce3b2aabf283b3f" -O /tmp/ml_backend_deployment.tar.gz

# 解压到目录
mkdir -p /opt/product
tar xf /tmp/ml_backend_deployment.tar.gz -C /opt/product
```
#### 离线包目录结构如下
```bash
setup.sh  // 部署脚本
app.tar.gz  // 镜像文件，需要从部署人员获取
model.tar.gz // 预训练模型文件，需要从部署人员获取
license   //license 文件
tools   //工具
docker-compose.yaml // docker容器管理入口
stop.sh  //停止脚本
start.sh //启动脚本
README.md //说明文档
```
### 下载安装镜像和模型
需要向运维要最新的部署安装包
假设model 的地址为 model_url
假设镜像 的地址为 image_url
执行如下命令，包安装包下载到本地的，部署脚本目录
```bash
#进入到 部署根目录
cd /opt/product/ml_backend_deployment  

# 下载模型
wget $model_url -O model.tar.gz

# 下载镜像 
wget $image_url -O app.tar.gz
```
### license 生成
需要获取授权文件，根据部署的机器硬件信息生成对应的license 文件
获取系统信息
```bash
python tools/get_hardware_info.py
```
把打印出来的系统信息，发送给我们，我们会根据设备信息生成license.lic文件，放到./license/目录下 例子输出
```
hardware_info: {"cpu_id": "F1 06 04 00 FF FB EB BF,F1 06 04 00 FF FB EB BF", "serial_number": "Default string", "uuid": "03000200-0400-0500-0006-000700080009"}
```
### 执行系统部署
这个过程会比较久
```bash
bash -x setup.sh
```
### 执行系统初始化脚本
注意，这个脚本只需要在系统第一次部署的时候执行，后续更新不需要执行
```bash
cd tools && bash -x init.sh
```
### 启动服务
```bash
bash -x start.sh
```
### 停止服务
```bash
bash -x stop.sh
```
### 日志查看
```bash
docker compose logs -f ml_backend
```

## 冒烟测试
### 验证训练接口
进入到容器里面，跑个冒烟的训练测试
```bash
# 进入到容器
docker compose exec ml_backend bash

# 执行训练测试


```

### 验证gpu是否挂载ok
进入到容器里， 执行 nvidia-smi
```bash
# 进入到容器里面
docker compose exec ml_backend bash

# 执行 smi
nvidia-smi
```
能显示gpu的资源信息就是正常的
![截屏2023-09-27 11.02.34.png](https://cdn.nlark.com/yuque/0/2023/png/2744406/1695783772785-734326c4-1611-441b-8059-6319eefe39df.png#averageHue=%232f3337&clientId=ube361ce3-1f00-4&from=drop&id=ua955f4a1&originHeight=790&originWidth=1704&originalType=binary&ratio=2&rotation=0&showTitle=false&size=154129&status=done&style=none&taskId=u10e1b4f0-96bb-44c4-bc92-ed1e32170c1&title=)
