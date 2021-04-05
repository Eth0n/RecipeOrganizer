package com.example.recipeOrganizer.service

import com.example.recipeOrganizer.entity.Image
import com.example.recipeOrganizer.repository.FileSystemRepository
import com.example.recipeOrganizer.repository.ImageRepository
import org.springframework.core.io.FileSystemResource
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

@Service
class FileLocationService (
    val fileSystemRepository: FileSystemRepository,
    val imageRepository: ImageRepository
        ){

    fun save(content: ByteArray, imageName: String): Long? {
        val location : String = fileSystemRepository.save(content, imageName)

        return imageRepository.save(Image(name = imageName, location = location)).id
    }

    fun find(imageId : Long): FileSystemResource {
        val image: Image = imageRepository.findById(imageId).orElseThrow {ResponseStatusException(HttpStatus.NOT_FOUND) }
        return fileSystemRepository.findInFileSystem(image.location)
    }
}