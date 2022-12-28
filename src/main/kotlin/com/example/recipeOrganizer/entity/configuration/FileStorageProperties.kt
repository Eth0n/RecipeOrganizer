package com.example.recipeOrganizer.entity.configuration

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.convert.DataSizeUnit
import org.springframework.context.annotation.Configuration
import org.springframework.util.unit.DataSize
import org.springframework.util.unit.DataUnit

@Configuration
@ConfigurationProperties(prefix = "image")
class FileStorageProperties {

    @DataSizeUnit(DataUnit.MEGABYTES)
    lateinit var uploadFileSizeInMB: DataSize
    @DataSizeUnit(DataUnit.MEGABYTES)
    lateinit var maxRequestSizeInMB: DataSize
    var storageLocationPath: String = "C:/Program Files/Apache Software Foundation/Tomcat 9.0/test"
}