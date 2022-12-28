package com.example.recipeOrganizer.entity

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Lob

@Entity
data class Image (
    @Id
    @GeneratedValue
    val id: Long? = null,

    val name: String,

    val location: String
)
