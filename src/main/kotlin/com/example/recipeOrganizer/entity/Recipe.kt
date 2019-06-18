package com.example.recipeOrganizer.entity

import javax.persistence.*

@Entity
data class Recipe (
        @Id
       @GeneratedValue(strategy = GenerationType.AUTO)
       val id: Long? = null,

        @OneToMany(mappedBy = "recipe")
       val ingredient: List<Ingredient>? = null,

       val name: String,

       val duration: Int

)