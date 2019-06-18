package com.example.recipeOrganizer.controller

import com.example.recipeOrganizer.entity.Ingredient
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "ingredients", path = "ingredients")
interface IngredientRepository: PagingAndSortingRepository<Ingredient, Long> {
    fun findByReceipt(@Param("recipe") receipt : Long): List<Ingredient>
}