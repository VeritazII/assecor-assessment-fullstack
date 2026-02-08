package com.example.assecor;

public class DummyData {
    public static Person getDummyPerson(String id){
        return switch (id) {
            case "x01" -> new Person("x01", "Nico", "Nuschelmeyer", 98765, "Nimmermehr", 6);
            case "x03" -> new Person("x03", "Helga", "Holla", 53465, "Himmel", 3);
            case "x22" -> new Person("x22", "Kevin", "Kummer", 98760, "Kammern", 7);
            default -> new Person();
        };
    }
}
