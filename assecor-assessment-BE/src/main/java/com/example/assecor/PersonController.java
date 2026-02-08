package com.example.assecor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping("/persons")
    public List<Person> persons(){
        List<Person> persons = personRepository.findAll();
        System.out.println("REST GetPersons: "+persons);
        return persons;
    }

    @GetMapping("/persons/{id}")
    public Optional<Person> person(@PathVariable String id){
        System.out.println("REST GetPerson: "+ id);
        return personRepository.findById(id);
    }

    @GetMapping("/persons/color/{color}")
    public List<Person> color(@PathVariable int color){
        System.out.println("REST GetPersonsColor: "+ color);
        return personRepository.findByColor(color);
    }

    @PostMapping("/persons/import")
    public String importCSV(@RequestParam("file") MultipartFile file) {
        try {
            personRepository.deleteAll();
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

            personRepository.saveAll(persons);
            reader.close();

            return "Imported " + persons.size() + " persons successfully!";

        } catch (Exception e) {
            e.printStackTrace();
            return "Error importing CSV: " + e.getMessage();
        }
    }

    @PatchMapping("/persons/{id}")
    public ResponseEntity<Person> updatePersonField(
            @PathVariable String id,
            @RequestBody Map<String, Object> updates
    ) {
        return personRepository.findById(id)
                .map(person -> {

                    if (updates.containsKey("name")) {
                        person.setName((String) updates.get("name"));
                    }
                    if (updates.containsKey("lastname")) {
                        person.setLastname((String) updates.get("lastname"));
                    }
                    if (updates.containsKey("zipcode")) {
                        person.setZipcode((Integer) updates.get("zipcode"));
                    }
                    if (updates.containsKey("city")) {
                        person.setCity((String) updates.get("city"));
                    }
                    if (updates.containsKey("color")) {
                        person.setColor((Integer) updates.get("color"));
                    }

                    personRepository.save(person);
                    return ResponseEntity.ok(person);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/persons")
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        Person savedPerson = personRepository.save(person);
        return ResponseEntity.ok(savedPerson);
    }
}
