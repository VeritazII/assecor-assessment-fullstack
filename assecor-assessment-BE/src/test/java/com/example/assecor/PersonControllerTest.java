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
                "Andersson, Anders, 32132 Schweden - ☀, 2\n" +
                        "Millenium, Milly, 77777 made up too, 4\n";

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
}