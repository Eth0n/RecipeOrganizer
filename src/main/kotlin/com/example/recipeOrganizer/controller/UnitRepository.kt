package com.example.recipeOrganizer.controller

import com.example.recipeOrganizer.entity.Unit
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "units", path = "units")
interface UnitRepository : PagingAndSortingRepository<Unit, Long> {
    fun findByShortDescription(@Param("shortDescription") shortDescription : String): List<Unit>
}