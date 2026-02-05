package com.example.assecor;

import com.mongodb.client.MongoClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {

		ApplicationContext context = SpringApplication.run(Application.class, args);
		MongoTemplate mongoTemplate = context.getBean(MongoTemplate.class);
		Query query = Query.query(Criteria.where("name").is("Max"));
		Person person = mongoTemplate.findOne(query, Person.class);
		System.out.println("Gefundene Person: " + person);
	}

}
