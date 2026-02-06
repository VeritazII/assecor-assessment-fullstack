package com.example.assecor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RESTController {

    @Autowired
    private PersonReposetory personReposetory;

    @GetMapping("/persons")
    public List<Person> persons(){
        System.out.println("REST GetPersons: ");
        return personReposetory.findAll();
    }

    @GetMapping("/persons/{id}")
    public Optional<Person> person(@PathVariable String id){
        System.out.println("REST GetPerson: "+ id);
        return personReposetory.findById(id);
    }

    @GetMapping("/persons/color/{color}")
    public List<Person> color(@PathVariable String color){
        System.out.println("REST GetPersonsColor: "+ color);
        return personReposetory.findByColor(color);
    }
}
