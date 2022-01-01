package db

import (
	_ "github.com/jinzhu/gorm/dialects/mysql"
	// エンティティ(データベースのテーブルの行に対応)
	entity "stella-finder-server/src/models/entity"
)

func CreateReport(spotId int, title string, body string, coverImage string, createdBy int) entity.Report {
	var report = entity.Report{}
	report.SpotId = spotId
	report.Title = title
	report.Body = body
	report.CoverImage = coverImage
	report.CreatedBy = createdBy

	db := open()
	defer db.Close()
	db.Create(&report)

	return report
}

func FindAllReport(limit int) []entity.Report {
	var reports []entity.Report

	db := open()
	defer db.Close()

	if limit > 0 {
		db.Order("created_at desc").Limit(limit).Find(&reports)
	} else {
		db.Order("created_at desc").Find(&reports)
	}

	return reports
}

func FindReportById(reportId int) entity.Report {
	var report entity.Report

	db := open()
	db.Where("id = ?", reportId).Find(&report)
	defer db.Close()

	return report
}

func FindReportsBySpotId(spotId int, limit int) []entity.Report {
	var reports []entity.Report

	db := open()
	defer db.Close()

	if limit > 0 {
		db.Where("spot_id = ?", spotId).Order("created_at desc").Limit(limit).Find(&reports)
	} else {
		db.Where("spot_id = ?", spotId).Order("created_at desc").Find(&reports)
	}

	return reports
}

func UpdateReport(reportId int, title string, body string, coverImage string) entity.Report {
	var report entity.Report
	report.ID = reportId

	db := open()
	defer db.Close()

	db.Model(&report).Updates(entity.Report{Title: title, Body: body, CoverImage: coverImage})

	return report
}

func DeleteReport(reportId int) {
	var report entity.Report
	report.ID = reportId

	db := open()
	defer db.Close()

	db.Delete(&report)
}