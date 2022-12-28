package com.example.recipeOrganizer.controller

import com.example.recipeOrganizer.entity.Ingredient
import com.example.recipeOrganizer.entity.Recipe
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "ingredients", path = "ingredients")
interface IngredientRepository: PagingAndSortingRepository<Ingredient, Long> {
    fun findByRecipe(@Param("recipe") recipe : Long): List<Ingredient>
}