package com.example.recipeOrganizer.repository

import com.example.recipeOrganizer.entity.Image
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface ImageRepository: JpaRepository<Image, Long> {
}