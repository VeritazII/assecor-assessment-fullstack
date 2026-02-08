package com.example.assecor;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(PersonController.class)
class PersonControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private PersonRepository personRepository;

    Person validPerson1 = new Person("Müller", "Hans", 67742, "Lauterecken", 1);
    Person validPerson2 = new Person("Johnson", "Johnny", 88888, "made up", 3);

    @Test
    void shouldReturnAllPersons() throws Exception {
        Mockito.when(personRepository.findAll()).thenReturn(List.of(validPerson1, validPerson2));

        mockMvc.perform(get("/persons"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.size()").value(2))
                .andExpect(jsonPath("$[0].lastname").value("Müller"))
                .andExpect(jsonPath("$[1].city").value("made up"));
    }

    @Test
    void shouldReturnPersonById() throws Exception {
        Mockito.when(personRepository.findById("1"))
                .thenReturn(Optional.of(validPerson2));

        mockMvc.perform(get("/persons/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lastname").value("Johnson"));
    }

    @Test
    void shouldReturnPersonsByColor() throws Exception {
        Mockito.when(personRepository.findByColor(3))
                .thenReturn(List.of(validPerson2));

        mockMvc.perform(get("/persons/color/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Johnny"));
    }

    @Test
    void shouldImportCsvSuccessfully() throws Exception {
        String csv =
                """
                        Andersson, Anders, 32132 Schweden - ☀, 2
                        Millenium, Milly, 77777 made up too, 4
                        """;

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "persons.csv",
                MediaType.TEXT_PLAIN_VALUE,
                csv.getBytes()
        );

        mockMvc.perform(multipart("/persons/import").file(file))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Imported 2 persons")));

        Mockito.verify(personRepository).deleteAll();
        Mockito.verify(personRepository).saveAll(Mockito.anyList());
    }

    @Test
    void shouldIgnoreInvalidCsvLine() throws Exception {
        String csv =
                "Bart, Bertram, \n" +
                        "12313 Wasweißich, 1";

        MockMultipartFile file = new MockMultipartFile(
                "file",
                "persons.csv",
                MediaType.TEXT_PLAIN_VALUE,
                csv.getBytes()
        );

        mockMvc.perform(multipart("/persons/import").file(file))
                .andExpect(status().isOk())
                .andExpect(content().string(containsString("Imported 0 persons")));
    }

    @Test
    void shouldUpdatePersonField() throws Exception {
        Mockito.when(personRepository.findById("1"))
                .thenReturn(Optional.of(validPerson1));
        Mockito.when(personRepository.save(Mockito.any(Person.class)))
                .thenReturn(validPerson1);

        String updateJson = "{\"name\":\"Peter\",\"color\":5}";

        mockMvc.perform(patch("/persons/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Peter"))
                .andExpect(jsonPath("$.color").value(5));

        Mockito.verify(personRepository).save(Mockito.any(Person.class));
    }

    @Test
    void shouldReturnNotFoundWhenUpdatingNonExistentPerson() throws Exception {
        Mockito.when(personRepository.findById("999"))
                .thenReturn(Optional.empty());

        String updateJson = "{\"name\":\"Peter\"}";

        mockMvc.perform(patch("/persons/999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateJson))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldCreateNewPerson() throws Exception {

        Mockito.when(personRepository.save(Mockito.any(Person.class)))
                .thenReturn(validPerson2);

        String personJson = "{\"lastname\":\"Johnson\",\"name\":\"Johnny\",\"zipcode\":88888,\"city\":\"made up\",\"color\":3}";

        mockMvc.perform(post("/persons")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(personJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lastname").value("Johnson"))
                .andExpect(jsonPath("$.name").value("Johnny"))
                .andExpect(jsonPath("$.zipcode").value(88888))
                .andExpect(jsonPath("$.city").value("made up"))
                .andExpect(jsonPath("$.color").value(3));

        Mockito.verify(personRepository).save(Mockito.any(Person.class));
    }
}