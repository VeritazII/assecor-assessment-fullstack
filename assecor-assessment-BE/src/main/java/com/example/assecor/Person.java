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
    private int color;

    public Person(){
    }

    public Person(String name, String lastname, int zipcode, String city, int color){
        this.name = name;
        this.lastname = lastname;
        this.zipcode = zipcode;
        this.city = city;
        this.color = color;
    }

    public Person(String id, String name, String lastname, int zipcode, String city, int color){
        this.id = id;
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

    public int getColor() {
        return color;
    }

    public void setColor(int color) {
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
