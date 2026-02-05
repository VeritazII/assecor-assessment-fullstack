package com.example.assecor;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection  = "persons")
public class Person {

    @Id
    private String id;
    private String name;
    private String lastname;
    private int zipcode;
    private String city;
    private String color;

    public Person(){
    }

    public Person(String name, String lastname, int zipcode, String city, String color){
        this.name = name;
        this.lastname = lastname;
        this.zipcode = zipcode;
        this.city = city;
        this.color = color;
    }

    @Override
    public String toString() {
        return  name + ", " +
                lastname + ", " +
                zipcode + ", " +
                city + ", " +
                color + ",\n";

    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getZipcode() {
        return zipcode;
    }

    public void setZipcode(int zipcode) {
        this.zipcode = zipcode;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }
}
