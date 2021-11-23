package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateSpotImage(spotId int, image string) {
	var spotImage = entity.SpotImage{}
	spotImage.SpotId = spotId
	spotImage.Image = image

	db := open()
	// select
	db.Create(&spotImage)
	defer db.Close()
}

func GetAllSpotImages(spotId int) []entity.SpotImage {
	var spotImage []entity.SpotImage

	db := open()
	db.Where("spot_id = ?", spotId).Find(&spotImage)
	defer db.Close()

	return spotImage
}