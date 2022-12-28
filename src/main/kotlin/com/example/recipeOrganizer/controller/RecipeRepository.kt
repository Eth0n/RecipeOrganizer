package com.example.recipeOrganizer.controller

import com.example.recipeOrganizer.entity.Recipe
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "receipts", path = "receipts")
interface RecipeRepository : PagingAndSortingRepository<Recipe, Long> {
    fun findByName(@Param("name") name : String): List<Recipe>
}