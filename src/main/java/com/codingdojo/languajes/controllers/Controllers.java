package com.codingdojo.languajes.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Controllers {

    @GetMapping("/languages")
    public String renderLanguages(){
        return "languages";
    }

    @GetMapping("/languages/{id}")//No voy a usar el id en el back, voy a hacer peticiones desde el front, solo es para renderizar la view
    public String renderDetails(){
        return "details";
    }

    @GetMapping("/languages/{id}/edit")
    public String renderEdit(){ return "edit"; }
}
