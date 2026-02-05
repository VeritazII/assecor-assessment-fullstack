package com.example.assecor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RESTController {

    @GetMapping("/persons")
    public String persons(){
        return "Persons";
    }

    @GetMapping("/persons/{id}")
    public String person(@PathVariable String id){
        return id;
    }

    @GetMapping("/persons/color/{color}")
    public String color(@PathVariable String color){
        return color;
    }
}
