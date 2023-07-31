package com.codingdojo.languajes.controllers;

import com.codingdojo.languajes.models.Language;
import com.codingdojo.languajes.services.LanguageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ControllerApi {
    private final LanguageService languageService;

    public ControllerApi(LanguageService languageService){
        this.languageService = languageService;
    }

    //1 - GET para todos los lenguajes
    @GetMapping("/languages")
    public List<Language> index(){
        return languageService.allLanguages();
    }

    //2 - POST para cargar lenguajes
    @PostMapping("/languages")
    public Language create(@RequestBody Language language){
        return  languageService.createLanguage(language);
    }

    //3 - GET para un lenguaje
    @GetMapping("/languages/{id}")
    public Language buscar(@PathVariable("id") Long id){
        return languageService.findLanguage(id);
    }

    //PUT para updatear
    @PutMapping("/languages/{id}")
    public Language editar(@PathVariable("id") Long id, @RequestBody Language langCambio){
        return languageService.updateLanguage(id,langCambio);
    }

    //DELETE para eliminar
    @DeleteMapping("/languages/{id}")
    public String delete(@PathVariable("id") Long id){
        languageService.deleteLanguage(id);
        return  "Lenguaje con id: "+id+" eliminado";
    }
}
