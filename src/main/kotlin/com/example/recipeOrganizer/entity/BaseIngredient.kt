package com.example.recipeOrganizer.entity

import javax.persistence.*

@Entity
data class BaseIngredient (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long? = null,

        val name: String,

        val description: String,

        @OneToMany(mappedBy = "baseIngredient")
        val ingredient: List<Ingredient>? = null
)
