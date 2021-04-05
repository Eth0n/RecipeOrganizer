package com.example.recipeOrganizer.repository

import org.springframework.core.io.FileSystemResource
import org.springframework.stereotype.Repository
import java.lang.RuntimeException
import java.net.URL
import java.nio.file.Files
import java.nio.file.Path
import java.nio.file.Paths
import java.util.*

@Repository
class FileSystemRepository {
    val RESOURCES_DIR: URL = FileSystemRepository::class.java.getResource("")

    fun save(content : ByteArray, imageName : String) : String {
        val newFile: Path = Paths.get((Paths.get(RESOURCES_DIR.toURI()) as Any).toString() + Date().getTime().toString() + "-" + imageName)
        Files.createDirectories(newFile.getParent())
        Files.write(newFile, content)
        return newFile.toAbsolutePath()
            .toString()
    }

    fun findInFileSystem(location: String): FileSystemResource {
        try {
            return FileSystemResource(Paths.get(location))
        } catch (e : Exception) {
            throw RuntimeException(e)
        }
    }
}