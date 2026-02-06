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

        } else {
            System.out.println("MongoDB already filled with " + count + " persons");
        }
    }
}
