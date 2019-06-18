package com.example.recipeOrganizer

import com.example.recipeOrganizer.controller.IngredientRepository
import com.example.recipeOrganizer.controller.RecipeRepository
import com.example.recipeOrganizer.entity.Ingredient
import com.example.recipeOrganizer.entity.Recipe
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class ReceiptOrganizerApplication {
	@Bean
	fun generateDemoData(recipeRepo: RecipeRepository, ingredientRepo: IngredientRepository): CommandLineRunner {
		return CommandLineRunner {
			recipeRepo.save(Recipe(name = "Schniposa", duration = 30))
			recipeRepo.save(Recipe(name = "Salat", duration = 10))
			ingredientRepo.save(Ingredient(name = "Blatt", quantity = 10, quantityType = "st.", recipe = recipeRepo.findByName("Salat").get(0)))
			ingredientRepo.save(Ingredient(name = "Soße", quantity = 10, quantityType = "ml", recipe = recipeRepo.findByName("Salat").get(0)))
		}
	}
}

fun main(args: Array<String>) {
	runApplication<ReceiptOrganizerApplication>(*args)
}
