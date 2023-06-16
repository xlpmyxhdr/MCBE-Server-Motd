package main

import (
	"flag"
	"io/ioutil"
	"strconv"
	"os"
	"fmt"
	"encoding/json"

	"github.com/gin-gonic/gin"
	"github.com/nyancatda/AyaLog"
	"github.com/nyancatda/AyaLog/ModLog/GinLog"
	"github.com/nyancatda/AyaLog/TimedTask"
)

type Config struct {
	ServerName  string `json:"servername"`
	IP          string `json:"ip"`
	Port        string `json:"port"`
	Introduced  string `json:"introduced"`
	QQGrouplink string `json:"qqgrouplink"`
	Email       string `json:"email"`
	ServerPort  string `json:"serverport"`
}

type MotdBEJson struct {
	Status     string `json:"status"`
	Host       string `json:"host"`
	Motd       string `json:"motd"`
	Agreement  int    `json:"agreement"`
	Version    string `json:"version"`
	Online     int    `json:"online"`
	Max        int    `json:"max"`
	Level_name string `json:"level_name"`
	Gamemode   string `json:"gamemode"`
	Delay      int    `json:"delay"`
}

//读取配置文件
func getConfig() Config {
	jsonFile, err := os.Open("config.json")
	if err != nil {
		fmt.Println(err)
	}
	defer jsonFile.Close()
	byteValue, _ := ioutil.ReadAll(jsonFile)
	var config Config
	json.Unmarshal([]byte(byteValue), &config)
	return config
}

func main() {
	Config := getConfig()
	RunPort := flag.String("port", Config.ServerPort, "指定运行端口")
	DeBug := flag.Bool("debug", false, "是否开启调试模式")
	flag.Parse()

	// 设置日志参数
	if !*DeBug {
		AyaLog.LogLevel = AyaLog.INFO
	}

	// 启用日志压缩与清理任务
	go TimedTask.Start()

	// 关闭Gin默认的日志输出
	if !*DeBug {
		gin.DefaultWriter = ioutil.Discard
	}

	// 初始化Gin
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	// 注册日志中间件
	r.Use((GinLog.GinLog()))

	// 注册路由
	SetupRouter(r)

    runPort, _:= strconv.Atoi(*RunPort)
	/*
    if err != nil {
        AyaLog.Error("System", "RunPort conversion error:", err)
        return
    }
	*/

    AyaLog.Info("System", "程序启动完成！正在监听端口："+strconv.Itoa(runPort))
    if err := r.Run(":" + strconv.Itoa(runPort)); err != nil {
        AyaLog.Error("System", err)
    }
}
