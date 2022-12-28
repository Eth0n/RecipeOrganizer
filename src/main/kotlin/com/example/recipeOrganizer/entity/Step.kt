package com.example.recipeOrganizer.entity

import javax.persistence.*

@Entity
data class Step (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long? = null,

        @ManyToOne
        @JoinColumn(name = "recipe_id")
        val recipe: Recipe,

        @OneToMany
        @JoinColumn(name = "ingredient_id")
        val ingredient: List<Ingredient>? = null,

        val name: String,

        val description: String
)