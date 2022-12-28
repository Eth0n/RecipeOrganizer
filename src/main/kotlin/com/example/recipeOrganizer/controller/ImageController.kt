package com.example.recipeOrganizer.controller

import com.example.recipeOrganizer.service.FileLocationService
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.multipart.MultipartFile
import org.springframework.core.io.Resource

import org.springframework.http.MediaType


import org.springframework.web.bind.annotation.PathVariable

import org.springframework.web.bind.annotation.GetMapping




@RestController
class ImageController(
    val fileLocationService: FileLocationService
) {

    @PostMapping("/image")
    fun uploadImage(@RequestParam multipartImage: MultipartFile): Long? {
        return fileLocationService.save(multipartImage.bytes, multipartImage.originalFilename!!)
    }

    @GetMapping(value = ["/image/{imageId}"], produces = [MediaType.IMAGE_JPEG_VALUE])
    fun downloadImage(@PathVariable imageId: Long?): Resource? {
        return fileLocationService.find(imageId!!)
    }
}