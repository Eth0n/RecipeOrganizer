package com.example.recipeOrganizer.controller

import com.example.recipeOrganizer.entity.BaseIngredient
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "baseIngredients", path = "baseIngredients")
interface BaseIngredientRepository: PagingAndSortingRepository<BaseIngredient, Long> {
    fun findByName(@Param("name") name : String): List<BaseIngredient>
}