package com.example.recipeOrganizer.controller

import com.example.recipeOrganizer.entity.Step
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource

@RepositoryRestResource(collectionResourceRel = "steps", path = "steps")
interface StepRepository : PagingAndSortingRepository<Step, Long> {
}