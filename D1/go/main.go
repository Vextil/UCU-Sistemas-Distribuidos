package main

import (
	"encoding/json"
	"io"
	"net/http"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()

	router.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Pong!"})
	})

	router.GET("/forward", func(c *gin.Context) {
		url := c.Query("url")
		if url == "" {
			c.JSON(http.StatusBadRequest, gin.H{"message": "Missing url parameter"})
			return
		}

		resp, err := http.Get(url)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error executing request"})
			return
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error reading response body"})
			return
		}

		var jsonResult map[string]interface{}
		err = json.Unmarshal(body, &jsonResult)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"message": "Error unmarshalling JSON"})
			return
		}

		c.JSON(http.StatusOK, jsonResult)
	})

	router.Run(":80")
}
