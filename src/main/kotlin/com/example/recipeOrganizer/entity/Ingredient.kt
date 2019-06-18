package com.example.recipeOrganizer.entity

import javax.persistence.*

@Entity
data class Ingredient (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long? = null,

        @ManyToOne
        @JoinColumn(name = "recipe_id")
        val recipe: Recipe,

        val name: String,

        val quantity: Long,

        val quantityType: String
)