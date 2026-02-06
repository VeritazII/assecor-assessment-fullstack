package com.example.assecor;

import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
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
        long count = mongoTemplate.count(new Query(), Person.class);
        if (count == 0) {
        mongoTemplate.save(new Person("Max", "Mustermann", 12345, "Musterstadt", 2));
        mongoTemplate.save(new Person("Sophie", "Sonnenschein", 44444, "Skyline", 5));
        mongoTemplate.save(new Person("Rebecca", "Rage", 51423, "Rüpelingen", 4));
            System.out.println("MongoDB erfolgreich gefüllt!");
        } else {
            System.out.println("MongoDB bereits gefüllt mit " + count + " Einträgen");
        }
    }
}
