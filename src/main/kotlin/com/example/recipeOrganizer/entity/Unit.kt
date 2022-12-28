package com.example.recipeOrganizer.entity

import javax.persistence.*

@Entity
data class Unit (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long? = null,

        val name: String,

        val shortDescription: String
)