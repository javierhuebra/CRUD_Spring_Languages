package com.codingdojo.languajes.services;

import com.codingdojo.languajes.models.Language;
import com.codingdojo.languajes.repositories.LanguageRepository;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class LanguageService {
    private final LanguageRepository languageRepository;

    public LanguageService(LanguageRepository languageRepository){
        this.languageRepository = languageRepository;
    }

    //Devolver todos los libros
    public List<Language> allLanguages(){
        return languageRepository.findAll();
    }

    //Crear language
    public Language createLanguage(Language b){
        return languageRepository.save(b);
    }

    //Buscar lenguaje y retornarlo si esta, sino retorna null
    public Language findLanguage(Long id){
        Optional<Language> optionalLanguage = languageRepository.findById(id);
        if(optionalLanguage.isPresent()){
            return optionalLanguage.get();
        }else{
            return null;
        }
    }

    //Update a un lenguaje si lo encuentra
    public Language updateLanguage(Long id, Language language){
        Optional <Language> optionalLanguage = languageRepository.findById(id);

        if(optionalLanguage.isPresent()){
            Language languageExistente = optionalLanguage.get();
            languageExistente.setName(language.getName());
            languageExistente.setCreator(language.getCreator());
            languageExistente.setCurrentVersion(language.getCurrentVersion());

            return languageRepository.save(languageExistente);
        }else{
            throw new NoSuchElementException("Lenguaje no encontrado para id: "+id);
        }
    }

    //Eliminar
    public void deleteLanguage(Long id){
        if(languageRepository.existsById(id)){
            languageRepository.deleteById(id);
        }else{
            throw new NoSuchElementException("No se encontro el elemento a eliminar");
        }
    }
}
