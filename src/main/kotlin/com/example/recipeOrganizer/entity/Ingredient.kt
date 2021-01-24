package com.example.recipeOrganizer.entity

import com.example.recipeOrganizer.entity.constant.IngredientType
import javax.persistence.*

@Entity
data class Ingredient (
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long? = null,

        @ManyToOne
        @JoinColumn(name = "recipe_id")
        val recipe: Recipe,

        //Exchange with specific entity to store more values on base ingredient
        val name: String,

        val quantity: Long,

        val type: IngredientType,

        @OneToOne
        val unit: Unit

)