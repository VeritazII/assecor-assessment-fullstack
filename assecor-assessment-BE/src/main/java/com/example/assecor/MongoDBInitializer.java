package com.example.assecor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

@Component
public class MongoDBInitializer implements CommandLineRunner {

    private final MongoTemplate mongoTemplate;

    public MongoDBInitializer(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void run(String... args) throws Exception {
        if (!mongoTemplate.collectionExists("persons")) {
            mongoTemplate.createCollection("persons");
        }

        Person person = new Person("Max", "Mustermann", 12345, "Musterstadt", "blue");
        mongoTemplate.save(person);
    }
}
