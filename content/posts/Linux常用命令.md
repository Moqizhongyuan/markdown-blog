---
title: "Linux常用命令"
date: 2025-04-13
tags: ["Linux", "命令行", "服务器", "开发工具"]
---

# Linux 常用命令

Linux 作为开发者必备的操作系统，掌握其常用命令对于提高工作效率至关重要。本文将介绍一系列 Linux 中最常用的命令，包括文件操作、系统管理、权限设置、网络操作和文本处理等方面。

## 基础命令

### 系统导航命令

```bash
# 显示当前目录路径
pwd

# 列出目录内容
ls
ls -l    # 详细信息
ls -a    # 显示隐藏文件
ls -lh   # 以人类可读格式显示文件大小

# 切换目录
cd /path/to/directory
cd ~     # 回到home目录
cd ..    # 返回上一级目录
cd -     # 返回上一个工作目录
```

### 文件操作命令

```bash
# 创建文件和目录
touch filename.txt        # 创建空文件或更新时间戳
mkdir directory_name      # 创建目录
mkdir -p parent/child     # 创建多级目录

# 复制文件和目录
cp file.txt destination/
cp -r source/ destination/  # 递归复制目录

# 移动/重命名文件和目录
mv file.txt new_name.txt     # 重命名
mv file.txt /new/location/   # 移动

# 删除文件和目录
rm file.txt              # 删除文件
rm -f file.txt           # 强制删除无需确认
rm -r directory/         # 递归删除目录
rm -rf directory/        # 强制递归删除目录(谨慎使用)

# 创建链接
ln -s original_file link_name  # 创建软链接
ln original_file link_name     # 创建硬链接
```

## 文件查看和编辑

### 文件内容查看

```bash
# 查看文件内容
cat file.txt             # 显示整个文件内容
less file.txt            # 分页查看，按q退出
head -n 10 file.txt      # 查看前10行
tail -n 20 file.txt      # 查看后20行
tail -f log_file         # 实时监控日志文件更新

# 文件对比
diff file1 file2         # 比较两个文件的差异
```

### 文本编辑器

```bash
# 常用编辑器
nano file.txt            # 简单易用的编辑器
vim file.txt             # 高级文本编辑器
```

## 系统管理

### 进程管理

```bash
# 查看进程
ps                       # 查看当前用户进程
ps aux                   # 查看所有进程
top                      # 动态查看进程状态
htop                     # 增强版进程查看器

# 进程控制
kill PID                 # 终止指定进程
kill -9 PID              # 强制终止进程
killall process_name     # 终止所有指定名称的进程
```

### 系统信息

```bash
# 系统和硬件信息
uname -a                 # 显示系统信息
df -h                    # 显示磁盘使用情况
free -h                  # 显示内存使用情况
lscpu                    # 显示CPU信息
lsblk                    # 列出块设备
uptime                   # 系统运行时间和负载

# 用户信息
whoami                   # 显示当前用户
who                      # 显示当前登录用户
last                     # 显示最近登录用户信息
```

## 文件权限管理

```bash
# 更改文件权限
chmod 755 file.txt      # 使用数字设置权限
chmod u+x file.txt      # 给文件所有者添加执行权限
chmod -R 755 directory  # 递归设置目录权限

# 更改所有者
chown user:group file.txt     # 更改文件所有者和组
chown -R user directory/      # 递归更改目录所有者
```

## 网络命令

```bash
# 网络连接
ping example.com                  # 测试网络连接
curl -L https://example.com       # 获取网页内容
wget https://example.com/file     # 下载文件
ssh user@hostname                 # SSH连接到远程服务器

# 网络状态
ifconfig                          # 显示网络接口信息 (已弃用)
ip addr                           # 显示IP地址信息
netstat -tuln                     # 显示所有监听端口
ss -tuln                          # 显示socket统计信息
nslookup example.com              # DNS查询
traceroute example.com            # 追踪网络路径
```

## 文本处理命令

```bash
# 文本搜索
grep "pattern" file.txt           # 在文件中搜索
grep -r "pattern" directory/      # 递归搜索目录
grep -i "pattern" file.txt        # 不区分大小写搜索
grep -n "pattern" file.txt        # 显示匹配行号

# 文本处理
sed 's/old/new/g' file.txt        # 文本替换
awk '{print $1}' file.txt         # 提取第一列
sort file.txt                     # 排序文件内容
uniq file.txt                     # 去除重复行
cut -d',' -f1 file.csv            # 提取CSV第一列
```

## 压缩和解压

```bash
# tar 归档
tar -cvf archive.tar files/       # 创建tar归档
tar -xvf archive.tar              # 解压tar归档

# 压缩文件
gzip file.txt                     # 压缩文件为.gz
gunzip file.txt.gz                # 解压.gz文件

# tar+gzip组合 (最常用)
tar -czvf archive.tar.gz files/   # 创建压缩归档
tar -xzvf archive.tar.gz          # 解压压缩归档

# zip格式
zip -r archive.zip directory/     # 创建zip归档
unzip archive.zip                 # 解压zip归档
```

## 环境变量和 Shell

```bash
# 环境变量
echo $PATH                      # 显示PATH环境变量
export VAR="value"              # 设置环境变量
env                             # 显示所有环境变量

# Shell历史
history                         # 显示命令历史
history | grep command          # 搜索命令历史
!!                              # 执行上一条命令
!n                              # 执行历史记录中第n条命令
```

## 实用技巧

### 管道和重定向

```bash
# 管道操作 - 组合命令
ls -la | grep "\.txt"            # 列出所有txt文件
ps aux | grep nginx               # 查找nginx进程
cat file.txt | sort | uniq        # 排序并去重

# 重定向操作
command > file.txt                # 将输出重定向到文件(覆盖)
command >> file.txt               # 追加输出到文件
command 2> errors.txt             # 重定向错误信息
command > file.txt 2>&1           # 重定向标准输出和错误
```

### 任务控制

```bash
# 后台运行
command &                        # 后台运行命令
nohup command &                  # 后台运行且不受终端关闭影响

# 任务控制
jobs                             # 列出后台任务
fg %1                            # 将任务1切换到前台
bg %1                            # 将任务1放到后台运行
kill %1                          # 终止任务1
```

### 计划任务

```bash
# crontab 使用
crontab -l                       # 列出当前用户的计划任务
crontab -e                       # 编辑计划任务

# 典型的crontab条目
# 分 时 日 月 周 命令
# 0 2 * * * /path/to/script.sh   # 每天凌晨2点执行
```

## 高级命令

### 查找文件

```bash
# find 命令
find /path -name "filename"         # 按名称查找
find /path -type f -size +10M       # 查找大于10MB的文件
find /path -mtime -7                # 查找7天内修改的文件
find /path -name "*.log" -delete    # 查找并删除所有.log文件
```

### 磁盘管理

```bash
# 磁盘使用
du -sh directory/                   # 显示目录大小
du -h --max-depth=1 /               # 显示根目录下各子目录大小
ncdu                                # 交互式磁盘使用分析

# 磁盘操作
fdisk -l                            # 列出磁盘分区
mount /dev/sdb1 /mnt/usb            # 挂载USB设备
umount /mnt/usb                     # 卸载设备
```

## 远程操作

```bash
# SSH操作
ssh-keygen -t rsa                  # 生成SSH密钥
ssh-copy-id user@hostname          # 复制SSH密钥到服务器
scp file.txt user@hostname:/path/  # 复制文件到远程服务器
rsync -avz source/ user@host:/dest/ # 同步目录到远程服务器
```

## 总结

掌握这些 Linux 命令将大大提高你在 Linux 系统上的工作效率。作为开发者，建议把这些命令作为日常工具箱的一部分，随着实践不断深化理解。对于初学者来说，不必一次记住所有命令，可以从基础命令开始，逐步扩展到更复杂的操作。

记住，`man command`和`command --help`是你最好的朋友，它们可以帮助你了解任何命令的详细用法。
