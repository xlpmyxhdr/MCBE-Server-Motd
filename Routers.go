/*
 * @Author: NyanCatda
 * @Date: 2022-06-20 13:12:12
 * @LastEditTime: 2022-09-21 12:16:52
 * @LastEditors: NyanCatda
 * @Description: 路由注册
 * @FilePath: \MCBE-Server-Motd\Routers.go
 */
package main

import (
	"io/ioutil"
	"net/http"
	"path"
	"time"
	"os"
	"fmt"
	"encoding/json"

	"github.com/BlackBEDevelopment/MCBE-Server-Motd/MotdBEAPI"
	"github.com/BlackBEDevelopment/MCBE-Server-Motd/StatusImg"
	cache "github.com/chenyahui/gin-cache"
	"github.com/chenyahui/gin-cache/persist"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/nyancatda/AyaLog"
)



//请求MotdPE API
//https://wiki.blackbe.xyz/api/motd.html
func getMotdBE(ip string, port string, serverport string) MotdBEJson {
	//Config := getConfig()
	url := "http://127.0.0.1:" + serverport + "/api/java?host=" + ip + ":" + port
	client := http.Client{Timeout: 10 * time.Second} //设置10秒超时
	res, err := client.Get(url)
	if err != nil {
		fmt.Fprintf(os.Stderr, "fetch: %v\n", err)
	}
	body, err := ioutil.ReadAll(res.Body)
	res.Body.Close()
	if err != nil {
		fmt.Fprintf(os.Stderr, "fetch: reading %s: %v\n", url, err)
	}
	var config MotdBEJson
	json.Unmarshal([]byte(body), &config)
	return config
}


/**
 * @description: 路由注册
 * @param {*gin.Engine} r gin引擎
 * @return {*gin.Engine} gin引擎
 */
func SetupRouter(r *gin.Engine) *gin.Engine {
	// 500错误处理
	r.Use(ServerError)

	// 注册静态资源
	r.Static("/static", "fronend/dist/static")
	r.StaticFile("/favicon.ico", "fronend/dist/static/favicon.ico")
	r.LoadHTMLGlob("fronend/dist/static/assets/template/**/*")

	// 注册前端页面
	FrontendRouter(r)

	// 注册跨域请求头
	CorsConfig := cors.DefaultConfig()
	CorsConfig.AllowOrigins = []string{"*"}
	CorsConfig.AllowHeaders = []string{"*"}
	r.Use(cors.New(CorsConfig))

	// 基岩版查询API
	r.GET("/api", func(c *gin.Context) {
		Host := c.Query("host")

		data, err := MotdBEAPI.MotdBE(Host)
		if err != nil {
			AyaLog.DeBug("Request", err)
		}
		c.JSON(http.StatusOK, data)
	})

	// Java版查询API
	// 不要问为什么MotdBE可以请求Java
	r.GET("/api/java", func(c *gin.Context) {
		Host := c.Query("host")

		data, err := MotdBEAPI.MotdJava(Host)
		if err != nil {
			AyaLog.DeBug("Request", err)
		}
		c.JSON(http.StatusOK, data)
	})

	//初始化缓存
	memoryStore := persist.NewMemoryStore(1 * time.Minute)

	// 基岩版服务器状态图片
	r.GET("/status_img", cache.CacheByRequestURI(memoryStore, 10*time.Second), func(c *gin.Context) {
		Host := c.Query("host")

		Img, err := StatusImg.ServerStatusImg(Host)
		if err != nil {
			AyaLog.Error("Request", err)
			c.String(http.StatusInternalServerError, "Server Error")
			return
		}
		c.String(http.StatusOK, Img.String())
	})

	// Java版服务器状态图片
	r.GET("/status_img/java", cache.CacheByRequestURI(memoryStore, 10*time.Second), func(c *gin.Context) {
		Host := c.Query("host")

		Img, err := StatusImg.ServerStatusImgJava(Host)
		if err != nil {
			AyaLog.Error("Request", err)
			c.String(http.StatusInternalServerError, "Server Error")
			return
		}
		c.String(http.StatusOK, Img.String())
	})

	r.GET("/", func(c *gin.Context) {
		Config := getConfig()
		ServerInfo := getMotdBE(Config.IP, Config.Port, Config.ServerPort)

		var Status string
		var Status_bool bool
		if ServerInfo.Status == "online" {
			Status = "在线"
			Status_bool = true
		} else {
			Status = "离线"
			Status_bool = false
		}

		c.HTML(http.StatusOK, "index/index.html", gin.H{
			"servername":  Config.ServerName,
			"ip":          Config.IP,
			"port":        Config.Port,
			"introduced":  Config.Introduced,
			"qqgrouplink": Config.QQGrouplink,
			"email":       Config.Email,
			"status":      Status,
			"status_bool": Status_bool,
			"online":      ServerInfo.Online,
			"max":         ServerInfo.Max,
			"delay":       ServerInfo.Delay,
			"version":     ServerInfo.Version})
	})

	return r
}

/**
 * @description: 500错误处理
 * @param {*gin.Context} c
 * @return {*}
 */
func ServerError(c *gin.Context) {
	defer func() {
		if r := recover(); r != nil {
			// 打印错误堆栈信息
			AyaLog.Error("Request", r.(error))

			// 500返回
			c.String(http.StatusInternalServerError, "Server Error")
			c.Abort()
			return
		}
	}()
	c.Next()
}

/**
 * @description: 前端文件路由注册
 * @param {*gin.Engine} r 路由引擎
 * @return {*gin.Engine} 路由引擎
 */
func FrontendRouter(r *gin.Engine) *gin.Engine {
	// 遍历目录下的所有HTML文件
	HTMLFiles, err := ioutil.ReadDir("fronend/dist/static")
	if err != nil {
		AyaLog.Error("System", err)
	}
	// 注册index.html
	r.StaticFile("/gf", "fronend/dist/static/index.html")
	// 循环注册其他HTML文件
	for _, File := range HTMLFiles {
		// 判断是否为HTML文件
		FileName := File.Name()
		if path.Ext(FileName) == ".html" {
			r.StaticFile(FileName, "fronend/dist/static/"+FileName)
		}
	}

	return r
}



