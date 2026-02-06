package com.example.assecor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RESTController {

    @Autowired
    private PersonReposetory personReposetory;

    @GetMapping("/persons")
    public List<Person> persons(){
        List<Person> persons = personReposetory.findAll();
        System.out.println("REST GetPersons: "+persons);
        return persons;
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

    @PostMapping("/persons/import")
    public String importCSV(@RequestParam("file") MultipartFile file) {
        try {
            personReposetory.deleteAll();
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(file.getInputStream())
            );

            String line;
            List<Person> persons = new ArrayList<>();
            int lineNumber = 0;

            while ((line = reader.readLine()) != null) {
                lineNumber++;
                String[] data = line.split(",");

                if (data.length >= 4) {
                    try {
                        String zipAndCity = data[2].trim();

                        // (\\d{5}) = Genau 5 Ziffern
                        // \\s+ = Ein oder mehrere Leerzeichen
                        // (.{3,}) = Min. 3 beliebige Zeichen
                        Pattern pattern = Pattern.compile("^(\\d{5})\\s+(.{3,})$");
                        Matcher matcher = pattern.matcher(zipAndCity);

                        if (!matcher.matches()) {
                            System.err.println("line " + lineNumber + ": invalid zip city (Format: 12345 city) - " + zipAndCity);
                            continue;
                        }

                        int zipCode = Integer.parseInt(matcher.group(1));
                        String city = matcher.group(2).trim();

                        Person person = new Person(
                                data[0].trim(),                     // lastname
                                data[1].trim(),                     // name
                                zipCode,                            // zipcode
                                city,                               // city
                                Integer.parseInt(data[3].trim())    // color
                        );
                        persons.add(person);

                    } catch (NumberFormatException e) {
                        System.err.println("line " + lineNumber + ": pares error - " + line);
                    }
                }
            }

            personReposetory.saveAll(persons);
            reader.close();

            return "Imported " + persons.size() + " persons successfully!";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error importing CSV: " + e.getMessage();
        }
    }
}
